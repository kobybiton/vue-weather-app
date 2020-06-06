import axios from "axios";
import { AUTO_COMPLETE_LOCATION, CURRENT_CONDITION, DAILY_FORECASTS } from "@/constants"; // URL with queries and API key
const AUTO_COMPLETE_LOCATION_REQUEST = axios.get(`${AUTO_COMPLETE_LOCATION}&q=tel aviv`);
const CURRENT_CONDITION_REQUEST = axios.get(`${CURRENT_CONDITION}&locationkey=215854`);
const DAILY_FORECASTS_REQUEST = axios.get(`${DAILY_FORECASTS}&locationkey=215854`);

const apiClient = axios.all([AUTO_COMPLETE_LOCATION_REQUEST, CURRENT_CONDITION_REQUEST, DAILY_FORECASTS_REQUEST]);
//const DEFAULT_CITY = 'tel-aviv';

export default {
    getWeather() { // function that is used in store.js 👆
        return apiClient;
    }
};

/*
const cachedData = {
    'tel-aviv': 215854
}

getLocation = (location = DEFAULT_CITY) => {
    if(!cachedData[location]) {
        response = await axios.get
        cachedData[location] = response.locationkey
    }
    return cahcedData[location]
}

getWeather(location) => {
    await getLocation(location)

    return getWeather()
}*/
