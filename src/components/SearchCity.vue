<template>
    <form class="form-inline my-2 my-lg-0">
        <input class="form-control mr-sm-2" v-on:keydown.enter.prevent="searchCity" v-model="inputSearch" type="search" placeholder="Search" aria-label="Search">
        <button class="btn btn-outline-success my-2 my-sm-0" @click.prevent="searchCity" type="button">Search</button>
    </form>
</template>

<script>
    import axios from "axios";
    import moment from 'moment';
    import { AUTO_COMPLETE_LOCATION, CURRENT_CONDITION,  DAILY_FRECASTS} from "@/constants";

    export default {

        name: "SearchCity",
        data: function () {
            return {
                inputSearch: '',
                cuurentLocation: '',
                response: []
            }
        },
        methods: {
            searchCity() {

                let $this = this;
                if($this.inputSearch.length > 0) {

                    $this.inputSearch = $this.inputSearch.replace(/(^\w{1})|(\s{1}\w{1})/g, match => match.toUpperCase());
                    let enLettersOnly = /^[a-zA-Z]+$/;
                    if(!enLettersOnly.test($this.inputSearch)) {
                        alert('only english letters are allowed!');
                        return;
                    }
                    $this.response.forEach(value => {
                        if ($this.inputSearch === value[0].data[0].LocalizedName) {
                            $this.cuurentLocation = value[0].data[0].LocalizedName;
                        }
                    });

                    if ($this.cuurentLocation !== $this.inputSearch) {
                        this.$store.state.toggleFavorites = false;
                        this.$store.state.buttonText = 'Add To Favorites';
                        const AUTO_COMPLETE_LOCATION_REQUEST = axios.get(`${AUTO_COMPLETE_LOCATION}&q=${$this.inputSearch}`);
                        AUTO_COMPLETE_LOCATION_REQUEST.then(location => {
                            if (location.data.length > 0) {
                                const LOCATION_KEY = location.data[0].Key
                                const CURRENT_CONDITION_REQUEST = axios.get(`${CURRENT_CONDITION}&locationkey=${LOCATION_KEY}`);
                                const DAILY_FRECASTS_REQUEST = axios.get(`${DAILY_FRECASTS}&locationkey=${LOCATION_KEY}`);
                                axios.all([AUTO_COMPLETE_LOCATION_REQUEST, CURRENT_CONDITION_REQUEST, DAILY_FRECASTS_REQUEST])
                                    .then(responses => {
                                        $this.response.push(responses)
                                        $this.$store.state.defaultLocation = responses[0].data[0];
                                        responses[1].data.forEach(temp => $this.$store.state.defaultCurrentWeather = temp.Temperature.Imperial);
                                        responses[2].data.DailyForecasts.forEach(day => day.Date = moment(day.Date).format('dddd'));
                                        $this.$store.state.defaultDailyForecast = responses[2].data.DailyForecasts;
                                    });
                            } else {
                                alert('please enter a correct city!')
                            }
                        })
                    } else {
                        getLocalData();
                        this.$store.state.toggleFavorites = true;
                        this.$store.state.buttonText = 'Remove From Favorites'
                    }
                } else {
                    alert('search field is empty!');
                }

                function getLocalData() {
                    $this.response.forEach(value => {
                        if ($this.cuurentLocation === value[0].data[0].LocalizedName) {
                            $this.$store.state.defaultLocation = value[0].data[0];
                            value[1].data.forEach(temp => $this.$store.state.defaultCurrentWeather = temp.Temperature.Imperial);
                            $this.$store.state.defaultDailyForecast = value[2].data.DailyForecasts;
                        }
                    });
                }
/*                this.$store.state.defaultResponse.forEach(value =>{
                    console.log(value, 'value')
                    if(value[0].data[0].favorite === false) {
                        this.$store.state.buttonText = 'Add To Favorites';
                    } else {
                        this.$store.state.buttonText = 'Remove From Favorites'
                    }
                });*/
            }
        },
        updated() {
            this.response = this.$store.state.defaultResponse
        },
    }
</script>

<style scoped>

</style>