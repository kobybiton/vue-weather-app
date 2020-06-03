const API_KEY = "55QZZs0gAEA4p4uZArg7r2O6BekrLdY1";
const AUTO_COMPLETE_LOCATION = `http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${API_KEY}`;
const DAILY_FRECASTS = `http://dataservice.accuweather.com/forecasts/v1/daily/5day/search?apikey=${API_KEY}`;
const CURRENT_CONDITION = `http://dataservice.accuweather.com/currentconditions/v1/search?apikey=${API_KEY}`;

export { AUTO_COMPLETE_LOCATION, DAILY_FRECASTS, CURRENT_CONDITION }; // export constant to be able to use them in components