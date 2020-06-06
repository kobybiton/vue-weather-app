<template>

    <div class="container-fluid">
        <div class="row form">
            <search-city />
        </div>
        <div class="row current-city">
            <div class="col-xl-2 col-lg-3 col-md-4 col-sm-6">
                <div class="city">{{ defaultLocation.LocalizedName }}</div>
                <div class="temp">{{ defaultCurrentWeather.Value }}&deg; <small>{{ defaultCurrentWeather.Unit }}</small></div>
            </div>
            <add-to-favorites />
        </div>
        <div class="row daily-weather">
            <div class="col-xl-2 col-lg-3 col-md-4 col-sm-6" v-bind:key="index" v-for="(day, index) in defaultDailyForecast">
                <article class="widget">
                    <div class="weatherIcon">
                        <img v-bind:src="`https://apidev.accuweather.com/developers/Media/Default/WeatherIcons/${day.Day.Icon < 10? `0${day.Day.Icon}`:day.Day.Icon}-s.png`" alt="">
                    </div>
                    <div class="weatherInfo">
                        <div class="temperature"><span>{{ day.Temperature.Maximum.Value }} &deg;{{ day.Temperature.Maximum.Unit }}</span></div>
                        <div class="description">
                            <div class="weatherCondition">{{ day.Day.IconPhrase }}</div>
                        </div>
                    </div>
                    <div class="date">{{ day.Date }}</div>
                </article>
            </div>
        </div>
    </div>

</template>

<script>
    import SearchCity from "./SearchCity";
    import AddToFavorites from "./AddToFavorites";

    export default {
        components: {
            AddToFavorites,
            SearchCity
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
            if(this.$store.state.defaultResponse.length === 0) {
                this.$store.dispatch("updateWeather"); // dispatch "updateWeather" when component is created
            }
        },
    }
</script>

<style lang="scss">

    @import url(https://fonts.googleapis.com/css?family=Poiret+One);
    @import url(https://cdnjs.cloudflare.com/ajax/libs/weather-icons/2.0.9/css/weather-icons.min.css);

    $border-radius: 20px;

    body {
        background-color: #A64253;
        font-family: Poiret One;
    }

    .widget {

        .weatherIcon{
            border-top-left-radius: 20px;
            border-top-right-radius: 20px;
            font-family: weathericons;
            font-size: 70px;
            margin: 20px auto 0;
            text-align: center;
            background: #FAFAFA;

            i{
                padding-top: 30px;
            }
        }

        .weatherInfo{
            background: lightblue;
            align-items: center;
            color: white;
            height: 150px;

            .temperature{
                flex: 0 0 40%;
                width: 100%;
                font-size: 40px;
                display: flex;
                justify-content: space-around;
            }

            .description{

                .weatherCondition{
                    text-transform: uppercase;
                    font-size: 22px;
                    font-weight: 100;
                    text-align: center;
                }

                .place{
                    font-size: 15px;
                }
            }
        }

        .date{
            flex: 0 0 30%;
            height: 40%;
            background: lightskyblue;
            border-bottom-right-radius: 20px;
            display: flex;
            justify-content: space-around;
            align-items: center;
            color: white;
            font-size: 25px;
            font-weight: 800;
        }
    }

    p{
        position: fixed;
        bottom: 0%;
        right: 2%;
        a{
            text-decoration: none;
            color: #E4D6A7;
            font-size: 10px;
        }
    }

    .daily-weather{
        padding: 50px;
    }

    .row.current-city{
        justify-content: space-around;
        align-items: center;

        button {
            height: 50px;
        }
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

    .city{
        font-size: 35px;
        color: #fff;
    }

    .temp{
        font-size: 56px;
        color: aqua;
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
        margin-bottom: 20px;
    }

</style>
