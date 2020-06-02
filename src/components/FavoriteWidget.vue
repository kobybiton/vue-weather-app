<template>
<!--   <div>
    <div v-if="this.$store.state.dataIsRecived" class="weather-widget"> 
      <p class="weather-widget__city">{{ weather.city_name }}</p>
      <h2 class="weather-widget__temp">{{ weather.temp }}<span>°C</span></h2>
      <p class="weather-widget__status">{{ weather.weather.description }}</p>
    </div>
    <div v-else class="weather-widget"> 
      <img src="spinner.svg" alt="">
    </div>
  </div> -->

<div class="container">
    <div class="row">
        <div class="col-md-2 col-md-offset-2">
            <div class="weather">
                <div class="current">
                    <div class="info">
                        <div>&nbsp;</div>
                        <div class="city"><small><small>CITY:</small></small> {{ weather.LocalizedName }}</div>
                        <div class="temp">67&deg; <small>C</small></div>
                        <div class="wind">{{ weather.WeatherText }}</div>
                        <div>&nbsp;</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-md-2 col-md-offset-2">
            <div class="weather">
                <div class="current">
                    <div class="info">
                        <div>&nbsp;</div>
                        <div class="city"><small><small>CITY:</small></small> {{ weather.LocalizedName }}</div>
                        <div class="temp">67&deg; <small>C</small></div>
                        <div class="wind">{{ weather.WeatherText }}</div>
                        <div>&nbsp;</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-md-2 col-md-offset-2">
            <div class="weather">
                <div class="current">
                    <div class="info">
                        <div>&nbsp;</div>
                        <div class="city"><small><small>CITY:</small></small> {{ weather.LocalizedName }}</div>
                        <div class="temp">67&deg; <small>C</small></div>
                        <div class="wind">{{ weather.WeatherText }}</div>
                        <div>&nbsp;</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-md-2 col-md-offset-2">
            <div class="weather">
                <div class="current">
                    <div class="info">
                        <div>&nbsp;</div>
                        <div class="city"><small><small>CITY:</small></small> {{ weather.LocalizedName }}</div>
                        <div class="temp">67&deg; <small>C</small></div>
                        <div class="wind">{{ weather.WeatherText }}</div>
                        <div>&nbsp;</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-md-2 col-md-offset-2">
            <div class="weather">
                <div class="current">
                    <div class="info">
                        <div>&nbsp;</div>
                        <div class="city"><small><small>CITY:</small></small> {{ weather.LocalizedName }}</div>
                        <div class="temp">67&deg; <small>C</small></div>
                        <div class="wind">{{ weather.WeatherText }}</div>
                        <div>&nbsp;</div>
                    </div>
                </div>
            </div>
        </div>                                
    </div>
</div>

</template>

<script>
  export default {
    computed: {
      weather() {
        return this.$store.state.weather // gets weather state from Vuex store
      }
    },
    created() {
      this.$store.dispatch("updateWeather"); // dispatch "updateWeather" when component is created
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

</style>
