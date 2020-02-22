import React, { Component } from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';

class Weather extends Component {
  state = {
    weather: []
  }

  fetchWeather = () => {
    var options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
  };
    function success(pos) {
      var crd = pos.coords;
      var lat = crd.latitude;
      var lon = crd.longitude;
    var APIKey = "166a433c57516f51dfab1f7edaed8413";
    axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${APIKey}`)
      .then((response) => {
        const { weather } = response.data;
        this.setState({ weather: [...this.state.weather, ...weather] })
        console.log(JSON.stringify(this.state.weather))
      })
      .catch(() => alert('Error fetching new weather'));
  };
  function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }
  navigator.geolocation.getCurrentPosition(success, error, options);
}

  render() {
    return(
      <div className='weather'>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Coords</TableCell>
              <TableCell align="right">Temp</TableCell>
              <TableCell align="right">Wind</TableCell>
              <TableCell align="right">Humidity</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {weather.map(({coords, temp, wind, humidity}))}
              <TableCell>{coords}</TableCell>
              <TableCell align="right">{temp}</TableCell>
              <TableCell align="right">{wind}</TableCell>
              <TableCell align="right">{humidity}</TableCell>
          </TableBody>
        </Table>
      </div>
    )
  }

}

export default Weather;