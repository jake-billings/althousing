import React from 'react';
import makeMap, { getColorFromNumber, layers } from '../vizualizations/map';
import _ from 'lodash';

export default class Main extends React.Component {
    componentDidMount() {
        makeMap(this.setState.bind(this));
    }

    state = {layers: []};

    toggleLayer(layer) {
        layer.setVisible(layer, !layer.isVisible(layer));
    }

    render() {
        const rangeMin = 0;
        const rangeMax = 500;
        const numberOfColors = 6;

        const colors = _.range(numberOfColors).map(i => {
            const percent = 100 / (numberOfColors - 1) * i;
            const value = rangeMin + (rangeMax - rangeMin) / (numberOfColors - 1) * i;
            const color = getColorFromNumber(value);
            return `${color} ${percent}%`;
        });

        const legendStyle = {
            background: `linear-gradient(to right, ${colors.join(', ')})`
        };

        return (
            <div>
                <div id="map" className="map"/>
                <div className="side">
                    <h2>AltHousing</h2>
                    <div className='options'>
                        <h3>What do you want to see?</h3>
                        {this.state.layers.map((layer) => {
                            return (
                                <div className='box'>
                                    <label className="checkbox">
                                        <input type="checkbox" onClick={this.toggleLayer.bind(this, layer)}/>
                                        <span></span>
                                    </label>
                                    <span className="checkbox-name">{layer.name}</span>
                                </div>
                            )
                        })}
                    </div>
                </div>
                {/* <div id="legend">
                    <h4>
                        Legend
                    </h4>
                    {rangeMin}
                    <span id="legendColorBar" style={legendStyle}/> {rangeMax}
                    <div className="unit">
                        Affordable Units
                    </div>
                </div> */}
            </div>
        );
    }
}
