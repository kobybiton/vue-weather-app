import axios from "axios";
import { AUTO_COMPLETE_LOCATION, CURRENT_CONDITION, DAILY_FRECASTS } from "@/constants"; // URL with queries and API key
const AUTO_COMPLETE_LOCATION_REQUEST = axios.get(`${AUTO_COMPLETE_LOCATION}&q=tel aviv`);
const CURRENT_CONDITION_REQUEST = axios.get(`${CURRENT_CONDITION}&locationkey=215854`);
const DAILY_FRECASTS_REQUEST = axios.get(`${DAILY_FRECASTS}&locationkey=215854`);

const apiClient = axios.all([AUTO_COMPLETE_LOCATION_REQUEST, CURRENT_CONDITION_REQUEST, DAILY_FRECASTS_REQUEST]);

export default {
    getWeather() { // function that is used in store.js 👆
        return apiClient;
    }
};
