import React, { Component } from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';

const { isEmpty } = require('lodash');

class DisplayUser extends Component {
    render() {
        const allUsers = this.props.users;
        const users = !isEmpty(allUsers) ? allUsers : [];

        return (
            <div className="users">
                {!isEmpty(users) ? <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell align="right">Company</TableCell>
                            <TableCell align="right">Position</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map(({ name, position, company }, key) => (
                            <TableRow key={key}>
                                <TableCell component="th" scope="row"> {name ? name : 'No Name Found'} </TableCell>
                                <TableCell align="right">{company ? company : 'No Company Found'}</TableCell>
                                <TableCell align="right">{position ? position : 'No Position Found'}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table> : null}
            </div>
        );
    }
}

export default DisplayUser;



import React from "react";
import jquery from 'jquery';
import moment from 'moment';
import './Weather.css'
var $ = jquery;

function weather() {
    var options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
    };
      function success(pos) {
        var crd = pos.coords;
        var lat = crd.latitude;
        var lon = crd.longitude
        var qLocType_2 = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=`
        // console.log('Your current position is:');
        // console.log(`Latitude : ${crd.latitude}`);
        // console.log(`Longitude: ${crd.longitude}`);
        // console.log(`More or less ${crd.accuracy} meters.`);
        // console.log(qLocType_2)
        //======
        var APIKey = "166a433c57516f51dfab1f7edaed8413";
        //var qLocType_1 = "q=Richmond,Virginia&units=imperial&appid="
        var queryURL = qLocType_2+APIKey;
        $.ajax({
          url: queryURL,
          method: "GET"
        })
          .then(function(response) {
            $(".city").html(response.name + " Weather Details:");
            $(".wind").text("Wind Speed: " + response.wind.speed);
            $(".humidity").text("Humidity: " + response.main.humidity);
            $(".temp").text("Temperature (F) " + response.main.temp);
            $(".time").text(moment().format("LLLL") );
          });
        //======
      }
      function error(err) {
        console.warn(`ERROR(${err.code}): ${err.message}`);
      }
      navigator.geolocation.getCurrentPosition(success, error, options);
}
function startTime() {
    $(".time").text( moment().format("LLLL") )
    setTimeout(()=> startTime() , 500);
}

function Weather() {
    weather()
    startTime()
        return (
            <div className="weatherContainer container-fluid">
                <div className="row">
                    <div className="city col-md-12"/>
                    <div className="time col-md-12"/>
                    <div className="wind col-md-12"/>
                    <div className="humidity col-md-12"/>
                    <div className="temp col-md-12"/>
                </div>
            </div>
        )
}

export default Weather 
