import React from 'react';
import _ from 'lodash';
import $ from 'jquery';

export default
class Graph extends React.Component {
  componentDidMount() {
    $.ajax({
       url:"http://codataengine.org/api/dataset/1033.jsonp?start=0&limit=25&key=49a19ed77c416266d2370caeb7f280d9.33105",
       dataType: 'jsonp',
       success(data) {
           console.log(data);

           const filteredData = _.map(data, d => d['county_metro_healthvarious_2009.bmi_all']);
           $('#yo').html(filteredData);
       },
       error() {
       }
    });
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

      </div>
    );
  }
}
