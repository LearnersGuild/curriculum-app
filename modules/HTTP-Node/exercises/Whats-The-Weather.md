# Whats The Weather?

**Objective**: Use Node.js's `http` module to make HTTP requests to `Open Weather Map`, and parse the response object to fetch the current weather of a city.

## Exercise

Write a Node.js script called `weather.js` that takes a `city` as the first argument, and prints the current temperature in that city.

Here is a sample API call which returns the weather for San Francisco
http://api.openweathermap.org/data/2.5/weather?q=San+Francisco&mode=json&appid=498fa131dbb425c13df97463ab9d22dd

Example usage
```
$ node weather.js "San Franciso"
Temperature in Farenheit: 85.244
```

Requirements:
- [ ] Use Node.js's `http` module to make a request to http://api.openweathermap.com


Hints:
- You should create an account at https://openweathermap.org/, and get the API key from there, or use this API key - `498fa131dbb425c13df97463ab9d22dd`. Note: if you use the API key provided there are chances that it won't work given they limit the rate of usage to around 60 requests per minute.
- Read the API documentation here - https://openweathermap.org/current
- The weather returned by the JSON API is in the Kelvin scale, so you will have to convert the temperature into Farenheit. See the formula listed here - http://www.rapidtables.com/convert/temperature/how-kelvin-to-fahrenheit.htm
