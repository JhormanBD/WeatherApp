import React, {Component} from 'react';
import convert from 'convert-units';
import Location from './Location';
import WeatherData from './WeatherData';
import './styles.css';
import {
    //CLOUD,
    CLOUDY,
    SUN,
    //RAIN,
    //SNOW,
    //WINDY,
} from '../../constants/weathers';

const location = "Buenos Aires,ar";
const api_key = "aa9e9503805e2d52bc3999992c869096";
const url_base_weather = "http://api.openweathermap.org/data/2.5/weather";

const api_weather = `${url_base_weather}?q=${location}&appid=${api_key}`;

const data = {
    temperature: 35,
    weatherState: CLOUDY,
    humidity: 50,
    wind: '20 m/s',
}

class WeatherLocation extends Component {

    constructor() {
        super();
        this.state = {
            city: "San josé de cúcuta",
            data: data,
        };
    }

    getTemp = kelvin => {
        return Number(convert(kelvin).from("K").to("C").toFixed(0));
    }
    getWeatherState = weather_data => {
        return SUN;
    }

    getData = weather_data => {
        const {humidity, temp} = weather_data.main;
        const {speed} = weather_data.wind;
        const weatherState = this.getWeatherState(weather_data);
        const temperature = this.getTemp(temp);

        const data = {
            humidity,
            temperature,
            weatherState,
            wind: `${speed} m/s`,
        }

        return data;
    }

    handleUpdateClick = () => {
        fetch(api_weather).then(resolve => {
            return resolve.json();
        }).then(data => {
            const newWeather = this.getData(data);
            console.log(newWeather);
            debugger;
            this.setState({
                data: newWeather
            });
        });
    }

    render() {
        const {city, data} = this.state;
        return (
            <div className="weatherLocationCont">
                <Location city={city}></Location>
                <WeatherData data={data}></WeatherData>
                <button onClick={this.handleUpdateClick}>Actualizar</button>
            </div>
        );
    }

};
export default WeatherLocation;