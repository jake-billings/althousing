import GoogleMapsLoader from 'google-maps';
import {getJSON, getCoDataEngineData} from '../helpers/dataHelpers';
import {defaultZoom, denverLatitude, denverLongitude} from '../constants/graphConstants';
import tinycolor from 'tinycolor2';
import {
    Metro_Denver_Federally_Subsidized_Affordable_Housing_2014_id
} from '../constants/datasetConstants';
import {mapStyle} from '../constants/mapStyles';

GoogleMapsLoader.VERSION = '3.23';
GoogleMapsLoader.LIBRARIES = ['visualization'];

const limitRadius = 10000;
const numberOfBlocksToGet = 10000;
const geoJSONUrl = 'https://data.colorado.gov/resource/49x6-nvb5.geojson' +
    `?$where=within_circle(the_geom,${denverLatitude},${denverLongitude},${limitRadius})&$limit=${numberOfBlocksToGet}`;

const blocksPromise = getJSON(geoJSONUrl);
const dataPromise = getCoDataEngineData(Metro_Denver_Federally_Subsidized_Affordable_Housing_2014_id);

let resolveLayers;
export let layers = new Promise((resolve, reject) => {
    resolveLayers = resolve;
});

function initMap(mapEl) {
    return new Promise((resolve, reject) => {
        GoogleMapsLoader.load((google) => {
            const map = window.map = new google.maps.Map(mapEl, {
                center: {lat: denverLatitude, lng: denverLongitude},
                zoom: defaultZoom,
                styles: mapStyle
            });

            resolve({google, map});
        });
    });
}

function addDataToMap({google, map, data}) {
    const markers = [];

    data.forEach(point => {
        const loc = {
            lng: parseFloat(point['affhousing_metro_fedsubsidized_2014.x'], 10),
            lat: parseFloat(point['affhousing_metro_fedsubsidized_2014.y'], 10)
        };
    });
}

function getDataForGeoId(geoId, dataSet, dataSetKey) {
    return dataSet.find(datum => datum[dataSetKey] === geoId);
}

export function getColorFromNumber(number) {
    const hueScale = 200;

    return tinycolor({
        h: number * 100 / hueScale,
        s: 100,
        v: 100
    }).toHexString();
}

function addGeoJsonToMap({google, map, geoJson, data}) {
    const filteredFeatures = geoJson.features.filter(feature => {
        return getDataForGeoId(feature.properties.geoidblock, data, 'affhousing_metro_fedsubsidized_2014.geoid10');
    });
    geoJson.features = filteredFeatures;

    map.data.addGeoJson(geoJson);

    map.data.setStyle(feature => {
        const featureData = getDataForGeoId(feature.H.geoidblock, data, 'affhousing_metro_fedsubsidized_2014.geoid10');
        const affordableUnits = featureData && featureData['affhousing_metro_fedsubsidized_2014.restunit'];
        const color = getColorFromNumber(affordableUnits);

        return {
            fillColor: color,
            strokeWeight: 1
        };
    });
}

function setupLayers({google, map, geoJson, data, setState}) {
    let newData = data.map(item => {
        return new google.maps.LatLng(parseFloat(item['affhousing_metro_fedsubsidized_2014.y']),
            parseFloat(item['affhousing_metro_fedsubsidized_2014.x']));
    });

    layers = [{
        name: 'Affordable Housing (Heatmap)',
        isVisible: (layer) => {
            return layer.layer.getMap();
        },
        setVisible: (layer, visible) => {
            layer.layer.setMap(visible ? map : null)
        },
        layer: new google.maps.visualization.HeatmapLayer({
            radius: 20,
            data: newData
        })
    }];
    setState({
        layers
    });

    resolveLayers(layers);
}

export default function makeMap(setState) {
    const mapEl = document.getElementById('map');

    Promise.all([
        initMap(mapEl),
        dataPromise
    ]).then(([{google, map}, data]) => {
        addDataToMap({google, map, data});

        blocksPromise.then(geoJson => {
            addGeoJsonToMap({google, map, geoJson, data});
        });

        setupLayers({google,map,data, setState});
    });
}
