<template>

    <div class="container">
        <div class="row form">
            <form class="form-inline my-2 my-lg-0">
                <input class="form-control mr-sm-2" v-on:keydown.enter.prevent="searchCity" v-model="inputSearch" type="search" placeholder="Search" aria-label="Search">
                <button class="btn btn-outline-success my-2 my-sm-0" @click.prevent="searchCity" type="button">Search</button>
            </form>
        </div>
        <div class="row current-city">
            <div class="col-md-2 col-md-offset-2">
                <div class="city">{{ defaultLocation.LocalizedName }}</div>
                <div class="temp">{{ defaultCurrentWeather.Value }}&deg; <small>{{ defaultCurrentWeather.Unit }}</small></div>
            </div>
        </div>
        <div class="row daily-weather">
            <div class="col-md-2 col-md-offset-2" v-bind:key="index" v-for="(day, index) in defaultDailyForecast">
                <div class="weather">
                    <div class="current">
                        <div class="info">
                            <div>&nbsp;</div>
                            <div class="city">{{ day.Date }}</div>
                            <div class="temp">{{ day.Temperature.Maximum.Value }} &deg; <small>{{ day.Temperature.Maximum.Unit }}</small></div>
                            <div>&nbsp;</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
    import axios from "axios";
    import moment from 'moment';
    import { AUTO_COMPLETE_LOCATION, CURRENT_CONDITION,  DAILY_FRECASTS} from "@/constants";

    export default {
        data: function () {
            return {
                inputSearch: '',
                response: []
            }
        },
        computed: {
            defaultLocation() {
                return this.$store.state.defaultLocation // gets weather state from Vuex store
            },
            defaultCurrentWeather() {
                return this.$store.state.defaultCurrentWeather // gets weather state from Vuex store
            },
            defaultDailyForecast() {
                return this.$store.state.defaultDailyForecast // gets weather state from Vuex store
            }
        },
        created() {
            this.$store.dispatch("updateWeather"); // dispatch "updateWeather" when component is created
        },
        updated() {
            this.response = this.$store.state.defaultResponse
        },
        methods: {
            searchCity() {

                const AUTO_COMPLETE_LOCATION_REQUEST = axios.get(`${AUTO_COMPLETE_LOCATION}&q=${this.inputSearch}`);
                AUTO_COMPLETE_LOCATION_REQUEST.then(location => {
                    const LOCATION_KEY = location.data[0].Key
                    const CURRENT_CONDITION_REQUEST = axios.get(`${CURRENT_CONDITION}&locationkey=${LOCATION_KEY}`);
                    const DAILY_FRECASTS_REQUEST = axios.get(`${DAILY_FRECASTS}&locationkey=${LOCATION_KEY}`);
                    axios.all([AUTO_COMPLETE_LOCATION_REQUEST, CURRENT_CONDITION_REQUEST, DAILY_FRECASTS_REQUEST])
                        .then(responses => {

                            if(this.response[0][0].data[0].LocalizedName !== responses[0].data[0].LocalizedName) {
                                console.log(this.response[0][0].data[0].LocalizedName)
                                console.log(responses[0].data[0].LocalizedName)
                                this.response.push(responses)
                            }
                            console.log(this.response)
                            this.$store.state.defaultLocation = this.response[0][0].data[0];
                            console.log(this.$store.state.defaultLocation, 'defaultLocation store')
                            this.response[0][1].data.forEach(temp => this.$store.state.defaultCurrentWeather = temp.Temperature.Imperial);
                            this.response[0][2].data.DailyForecasts.forEach(day => day.Date = moment(day.Date).format('dddd'));
                            this.$store.state.defaultDailyForecast = responses[2].data.DailyForecasts;
                        });
                });
            }
        }
    }
</script>

<style>

    .daily-weather{
        border: 1px solid #ccc;
        padding: 50px;
    }

    .row.current-city{
        justify-content: left;
    }

    .weather{
        display: flex;
        flex-flow: column wrap;
        box-shadow: 0px 1px 10px 0px #cfcfcf;
        overflow: hidden;
    }

    .weather .current{
        display: flex;
        flex-flow: row wrap;
        background-image: url("/Content/images/shared/misc/london-view.png");
        background-repeat: repeat-x;
        color: white;
        padding: 20px;
        text-shadow: 1px 1px #F68D2E;
    }

    .weather .current .info{
        display: flex;
        flex-flow: column wrap;
        justify-content: space-around;
        flex-grow: 2;
    }

    .weather .current .info .city{
        font-size: 26px;
    }

    .weather .current .info .temp{
        font-size: 56px;
    }

    .weather .current .info .wind{
        font-size: 24px;
    }

    .weather .current .icon{
        text-align: center;
        font-size: 64px;
        flex-grow: 1;
    }

    .weather .future{
        display: flex;
        flex-flow: row nowrap;
    }

    .weather .future .day{
        flex-grow: 1;
        text-align: center;
        cursor: pointer;
    }

    .weather .future .day:hover{
        color: #fff;
        background-color: #F68D2E;
    }

    .weather .future .day h3{
        text-transform: uppercase;
    }

    .weather .future .day p{
        font-size: 28px;
    }

    .row{
        justify-content: center;
    }

    .row.form{
        margin-bottom: 100px;
    }

</style>
