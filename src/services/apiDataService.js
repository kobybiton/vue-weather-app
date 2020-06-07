import axios from "axios";
import { AUTO_COMPLETE_LOCATION, CURRENT_CONDITION, DAILY_FORECASTS } from "@/constants"; // URL with queries and API key

export default {

    getWeather(location) { // function that is used in store.js 👆
        // ajax request for location key
        const AUTO_COMPLETE_LOCATION_REQUEST = axios.get(`${AUTO_COMPLETE_LOCATION}&q=${location}`);
        return AUTO_COMPLETE_LOCATION_REQUEST.then(location => {
            if (location.data.length > 0) {
                const LOCATION_KEY = location.data[0].Key;
                // ajax request by location key
                const CURRENT_CONDITION_REQUEST = axios.get(`${CURRENT_CONDITION}&locationkey=${LOCATION_KEY}`);
                const DAILY_FORECASTS_REQUEST = axios.get(`${DAILY_FORECASTS}&locationkey=${LOCATION_KEY}`);
                return axios.all([AUTO_COMPLETE_LOCATION_REQUEST, CURRENT_CONDITION_REQUEST, DAILY_FORECASTS_REQUEST]);
            } else {
                return undefined;
            }
        });
    }
};


