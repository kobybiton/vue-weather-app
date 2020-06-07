import Vue from "vue";
import Vuex from "vuex";

import dataService from "@/services/apiDataService.js";
import moment from 'moment';
import axios from "axios"; // apiDataService.js fetch data from API. We will have a look at it in the next step.

Vue.use(Vuex); // tell Vue to action with Vuex

export default new Vuex.Store({
    state: { // define here data that you wish to store
        location: {},
        currentWeather: {},
        dailyForecast: {},
        cachedData: [],
        isReceivedData: false,
        toggleFavorites: false,
        buttonText: 'Add To Favorites'
    },
    mutations: { // change state from here
        UPDATE_WEATHER(state, location) {
            dataService
                .getWeather(location) // call the function from apiDataService.js that returns the data from API
                .then(axios.spread((...responses) => {
                    if(responses.length > 0) {
                        // update states from apiDataService response
                        state.isReceivedData = true;
                        state.cachedData.push(responses);
                        state.location = responses[0].data[0];
                        state.location.favorite = false;
                        state.buttonText = 'Add To Favorites';
                        state.toggleFavorites = false;
                        responses[1].data.forEach(temp => state.currentWeather = temp.Temperature.Imperial);
                        responses[2].data.DailyForecasts.forEach(day => day.Date = moment(day.Date).format('dddd'));
                        state.dailyForecast = responses[2].data.DailyForecasts;
                    } else {
                        state.isReceivedData = false;
                    }
                }))
                .catch(error => { // if there was an error
                    console.log("There was an error:", error); // log it
                });
        }
    },
    actions: { // call mutations that change the state here
        updateWeather(context, location = 'Tel Aviv') {
            context.commit("UPDATE_WEATHER", location);
        }
    }
});