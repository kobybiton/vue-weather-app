<template>

    <div class="container">
        <div class="row form">
            <search-city />
        </div>
        <div class="row current-city">
            <div class="col-md-2 col-md-offset-2">
                <div class="city">{{ defaultLocation.LocalizedName }}</div>
                <div class="temp">{{ defaultCurrentWeather.Value }}&deg; <small>{{ defaultCurrentWeather.Unit }}</small></div>
            </div>
        </div>
        <add-to-favorites />
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
