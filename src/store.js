import Vue from "vue";
import Vuex from "vuex";

import service from "@/services/dataService.js";
import moment from 'moment';
import axios from "axios"; // dataService.js fetch data from API. We will have a look at it in the next step.

Vue.use(Vuex); // tell Vue to action with Vuex

export default new Vuex.Store({
    state: { // define here data that you wish to store
        defaultLocation: {},
        defaultCurrentWeather: {},
        defaultDailyForecast: {},
        defaultResponse: [],
        toggleFavorites: false,
        buttonText: 'Add To Favorites'
    },
    mutations: { // change state from here
        UPDATE_WEATHER(state) {
            service
                .getWeather() // call the function from dataService.js that returns the data from API
                .then(axios.spread((...responses) => { // if the response was get
                    if(state.defaultResponse.length === 0) {
                        state.defaultResponse.push(responses);
                    }
                    state.defaultLocation = responses[0].data[0]; // set defaultWeather obj in state to real weather obj
                    state.defaultLocation.favorite = false;
                    responses[1].data.forEach(temp => state.defaultCurrentWeather = temp.Temperature.Imperial);
                    responses[2].data.DailyForecasts.forEach(day => day.Date = moment(day.Date).format('dddd'));
                    state.defaultDailyForecast = responses[2].data.DailyForecasts;
                }))
                .catch(error => { // if there was an error
                    console.log("There was an error:", error); // log it
                    state.dataIsRecived = false; // and mark that data wasn't recived
                });
        }
    },
    actions: { // call mutations that change the state here
        updateWeather(context) {
            context.commit("UPDATE_WEATHER");
        }
    }
});