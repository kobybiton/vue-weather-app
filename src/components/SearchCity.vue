<template>
    <div class="search-box">
        <form class="form-inline my-2 my-lg-0">
            <input class="form-control mr-sm-2" v-on:keydown.enter.prevent="searchCity" v-model="inputSearch" type="search" placeholder="Search" aria-label="Search">
            <div class="loader">
                <wave-spin v-bind:v-model="loader" v-show="loader"></wave-spin>
            </div>
            <button class="btn btn-primary my-2 my-sm-0" @click.prevent="searchCity" type="button">Search</button>
        </form>
    </div>
</template>

<script>
    import axios from "axios";
    import moment from 'moment';
    import WaveSpin from 'vue-loading-spinner/src/components/Wave';
    import { AUTO_COMPLETE_LOCATION, CURRENT_CONDITION,  DAILY_FORECASTS} from "@/constants";

    export default {

        name: "SearchCity",
        data: function () {
            return {
                inputSearch: '',
                currentLocation: '',
                cachedData:[],
                loader: false
            }
        },
        components: {
            WaveSpin
        },
        methods: {
            searchCity() {

                let $this = this;
                if($this.inputSearch.length > 0) {
                    $this.loader = true;
                    $this.inputSearch = $this.inputSearch.replace(/(^\w{1})|(\s{1}\w{1})/g, match => match.toUpperCase());
                    const enLettersOnly = /^[a-z A-Z]+$/;
                    if(!enLettersOnly.test($this.inputSearch)) {
                        this.$alert('only english letters are allowed!');
                        return;
                    }
                    $this.cachedData.forEach(value => {
                        if ($this.inputSearch === value[0].data[0].LocalizedName) {
                            $this.currentLocation = value[0].data[0].LocalizedName;
                        }
                    });

                    // get local data or ajax to api
                    if($this.currentLocation !== $this.inputSearch) {
                        const AUTO_COMPLETE_LOCATION_REQUEST = axios.get(`${AUTO_COMPLETE_LOCATION}&q=${$this.inputSearch}`);
                        AUTO_COMPLETE_LOCATION_REQUEST.then(location => {
                            if (location.data.length > 0) {
                                const LOCATION_KEY = location.data[0].Key
                                const CURRENT_CONDITION_REQUEST = axios.get(`${CURRENT_CONDITION}&locationkey=${LOCATION_KEY}`);
                                const DAILY_FORECASTS_REQUEST = axios.get(`${DAILY_FORECASTS}&locationkey=${LOCATION_KEY}`);
                                axios.all([AUTO_COMPLETE_LOCATION_REQUEST, CURRENT_CONDITION_REQUEST, DAILY_FORECASTS_REQUEST])
                                    .then(responses => {
                                        $this.loader = false;
                                        $this.cachedData.push(responses)
                                        $this.$store.state.defaultLocation = responses[0].data[0];
                                        $this.$store.state.defaultLocation.favorite = false;
                                        responses[1].data.forEach(temp => $this.$store.state.defaultCurrentWeather = temp.Temperature.Imperial);
                                        responses[2].data.DailyForecasts.forEach(day => day.Date = moment(day.Date).format('dddd'));
                                        $this.$store.state.defaultDailyForecast = responses[2].data.DailyForecasts;
                                        updateFavorites();
                                    });
                            } else {
                                this.$alert('please enter a correct city!')
                            }
                        })
                    } else {
                        setTimeout(() => {
                            $this.loader = false;
                            getLocalData();
                        }, 500);

                    }
                } else {
                    this.$alert('search field is empty!');
                }

                function getLocalData() {
                    $this.cachedData.forEach(value => {
                        if ($this.currentLocation === value[0].data[0].LocalizedName) {
                            $this.$store.state.defaultLocation = value[0].data[0];
                            value[1].data.forEach(temp => $this.$store.state.defaultCurrentWeather = temp.Temperature.Imperial);
                            $this.$store.state.defaultDailyForecast = value[2].data.DailyForecasts;
                        }
                    });
                    updateFavorites();
                }

                function updateFavorites() {
                        if($this.$store.state.defaultLocation.favorite === true) {
                            $this.$store.state.toggleFavorites = true;
                            $this.$store.state.buttonText = 'Remove From Favorites';
                        } else {
                            $this.$store.state.toggleFavorites = false;
                            $this.$store.state.buttonText =  'Add To Favorites';
                        }
                }
            }
        },
        created() {
            this.cachedData = this.$store.state.defaultResponse
        },
    }
</script>

<style>
    .spinner {
        position: absolute;
        top: -5px;
        right: 90px;
    }

    .spinner > div[data-v-21bfcd7c]{
        background-color: lightskyblue;
    }

    .form-inline {
        position: relative;
    }

    @media screen and (max-width: 575px) {
        .spinner {
            right: 10px;
        }
    }
</style>