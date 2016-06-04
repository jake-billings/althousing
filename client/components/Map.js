import React from 'react';
import makeMap, {getColorFromNumber} from '../vizualizations/map';
import _ from 'lodash';

export default class Main extends React.Component {
    componentDidMount() {
        makeMap();
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
                        <div className='box'>
                            <label className="checkbox">
                                <input type="checkbox" />
                                <span></span>
                            </label>
                            <span className="checkbox-name">Affordable Housing</span>
                        </div>
                        <div className='box'>
                            <label className="checkbox">
                                <input type="checkbox" />
                                <span></span>
                            </label>
                            <span className="checkbox-name">Safe neighborhoods</span>
                        </div>
                        <div className='box'>
                            <label className="checkbox">
                                <input type="checkbox" />
                                <span></span>
                            </label>
                            <span className="checkbox-name">Quality schools</span>
                        </div>
                        <div className='box'>
                            <label className="checkbox">
                                <input type="checkbox" />
                                <span></span>
                            </label>
                            <span className="checkbox-name">Public transit</span>
                        </div>
                        <div className='box'>
                            <label className="checkbox">
                                <input type="checkbox" />
                                <span></span>
                            </label>
                            <span className="checkbox-name">Grocery (Deserts)</span>
                        </div>
                        <div className='box'>
                            <label className="checkbox">
                                <input type="checkbox" />
                                <span></span>
                            </label>
                            <span className="checkbox-name">Areas for urban gardening</span>
                        </div>
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
