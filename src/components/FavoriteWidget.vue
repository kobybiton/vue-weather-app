<template>

    <div class="container-fluid">
        <h1>My Favorites</h1>
        <div class="row daily-weather" v-if="this.favorites.length > 0">
            <div class="col-xl-2 col-lg-3 col-md-4 col-sm-6" v-bind:key="index" v-for="(value, index) in this.favorites">
                <div class="weather">
                    <div class="current">
                        <div class="info">
                            <div>&nbsp;</div>
                            <div class="weatherIcon">
                                <img v-bind:src="`https://apidev.accuweather.com/developers/Media/Default/WeatherIcons/${value[1].data[0].WeatherIcon < 10? `0${value[1].data[0].WeatherIcon}`:value[1].data[0].WeatherIcon}-s.png`" alt="">
                            </div>
                            <router-link to="/" class="nav__link">
                                <div class="city" @click="showInHomePage(value)">{{ value[0].data[0].LocalizedName }}</div>
                            </router-link>
                            <div class="temp">{{ value[1].data[0].Temperature.Imperial.Value }} &deg; <small>{{ value[1].data[0].Temperature.Imperial.Unit }}</small></div>
                            <div>{{ value[1].data[0].WeatherText }}</div>
                            <div>&nbsp;</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="message" v-else>
            <h5>Your favorites page is empty, Use the "Add To Favorites" button in home page</h5>
        </div>
    </div>

</template>

<script>
    export default {
        data: function () {
            return {
                favorites: []
            }
        },
        created() {
            // get favorites from cachedData
            this.$store.state.cachedData.forEach(value =>{
                 if(value[0].data[0].favorite === true) {
                     this.favorites.push(value)
                 }
            });
        },
        methods: {
            showInHomePage(data) {
                // update state to get current location weather in home page
                this.favorites.forEach(value =>{
                    if(value[0].data[0].LocalizedName === data[0].data[0].LocalizedName) {
                        this.$store.state.location = data[0].data[0];
                        data[1].data.forEach(temp => this.$store.state.currentWeather = temp.Temperature.Imperial);
                        this.$store.state.dailyForecast = data[2].data.DailyForecasts;
                    }
                });
                this.$store.state.buttonText = 'Remove From Favorites';
                this.$store.state.location.favorite = true;
                this.$store.state.toggleFavorites = true;
            }
        }
    }
</script>

<style>

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

    h1 {
        text-align: center;
        color: lightskyblue;
    }

    .message h5{
        text-align: center;
        color: lavender;
    }

</style>
