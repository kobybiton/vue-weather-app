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
    import WaveSpin from 'vue-loading-spinner/src/components/Wave';

    export default {

        name: "SearchCity",
        data: function () {
            return {
                inputSearch: '',
                currentLocation: '',
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

                    // validate english letters
                    if(!enLettersOnly.test($this.inputSearch)) {
                        this.$alert('only english letters are allowed!');
                        $this.loader = false;
                        return;
                    }

                    $this.$store.state.cachedData.forEach(value => {
                        if (value[0].data[0].LocalizedName.includes($this.inputSearch)) {
                            $this.currentLocation = value[0].data[0].LocalizedName;
                        }
                    });

                    // get cached data or dispatch updateWeather
                    if(!$this.currentLocation.includes($this.inputSearch)) {

                        this.$store.dispatch("updateWeather", $this.inputSearch);
                        // check if city exist
                        setTimeout(() => {
                            if($this.$store.state.isReceivedData === false) {
                                this.$alert('please enter a correct city!')
                            }
                        }, 1000);

                        setTimeout(() => {
                            $this.loader = false;
                        }, 1000);

                    } else {
                        setTimeout(() => {
                            $this.loader = false;
                            getCachedData();
                        }, 1000);

                    }
                } else {
                    this.$alert('search field is empty!');
                }

                function getCachedData() {
                    $this.$store.state.cachedData.forEach(value => {
                        if ($this.currentLocation === value[0].data[0].LocalizedName) {
                            $this.$store.state.location = value[0].data[0];
                            value[1].data.forEach(temp => $this.$store.state.currentWeather = temp.Temperature.Imperial);
                            $this.$store.state.dailyForecast = value[2].data.DailyForecasts;
                        }
                    });
                    updateFavorites();
                }

                function updateFavorites() {
                        if($this.$store.state.location.favorite === true) {
                            $this.$store.state.toggleFavorites = true;
                            $this.$store.state.buttonText = 'Remove From Favorites';
                        } else {
                            $this.$store.state.toggleFavorites = false;
                            $this.$store.state.buttonText =  'Add To Favorites';
                        }
                }
                $this.inputSearch = '';
            }
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