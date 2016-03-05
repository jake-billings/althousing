import React from 'react';
import _ from 'lodash';
import $ from 'jquery';
import d3 from 'd3';

import style from './graph.css';

export default
class Graph extends React.Component {
  componentDidMount() {
    const viz = d3.selectAll("#viz")
    $.ajax({
       url:"http://codataengine.org/api/dataset/1033.jsonp?start=0&limit=25&key=49a19ed77c416266d2370caeb7f280d9.33105",
       dataType: 'jsonp',
       success(data) {

           //viz.append('rect');
           const filteredData = _.map(data, d => d['county_metro_healthvarious_2009.bmi_all']);
           const x = d3.scale.linear().domain([0, d3.max(filteredData)]).range([0, 100])

           d3.select("#viz")
             .selectAll("div")
             .data(filteredData)
             .enter().append("div")
             .style("width", (d) => x(d) + 'px')
             .style('background-color', () => 'steelblue')
             .style('margin', () => '5px')
             .text( d => d);
           //$('#yo').html(filteredData);
       },
       error() {
       }
    });
    // const svg =  document.querySelector("#viz");

    // fetch('http://codataengine.org/api/dataset/1033.jsonp?start=0&limit=25&key=49a19ed77c416266d2370caeb7f280d9.33105&callback=callback')
    //   .then(res => res.json())
    //   .then(data => {
    //     const filteredData = _.map(data, d => d.county_metro_healthvarious_2009.bmi_all);
    //     document.getElementsById('yo').innerHTML(filteredData);
    //   })
  }

  render() {
    return (
      <div id="yo">
        <div id="viz"></div>
      </div>
    );
  }
}
