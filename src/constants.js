const API_KEY = "08Y36T4lM0bA2z0eMADVMAHAkt23vzHz";
const AUTO_COMPLETE_LOCATION = `http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${API_KEY}`;
const DAILY_FORECASTS = `http://dataservice.accuweather.com/forecasts/v1/daily/5day/search?apikey=${API_KEY}`;
const CURRENT_CONDITION = `http://dataservice.accuweather.com/currentconditions/v1/search?apikey=${API_KEY}`;

export { AUTO_COMPLETE_LOCATION, DAILY_FORECASTS, CURRENT_CONDITION }; // export constant to be able to use them in components