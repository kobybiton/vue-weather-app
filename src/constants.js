const API_KEY = "GU9VzyUn82gkZWqcpBppP97D1gyWWjjY";
const AUTO_COMPLETE_LOCATION = `https://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${API_KEY}`;
const DAILY_FORECASTS = `https://dataservice.accuweather.com/forecasts/v1/daily/5day/search?apikey=${API_KEY}`;
const CURRENT_CONDITION = `https://dataservice.accuweather.com/currentconditions/v1/search?apikey=${API_KEY}`;

export { AUTO_COMPLETE_LOCATION, DAILY_FORECASTS, CURRENT_CONDITION }; // export constant to be able to use them in apiDataService