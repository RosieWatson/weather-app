# Weather App

A react app that serves a 3-day forecast using an open [weather API](https://openweathermap.org/)

## How to run

### Using Docker

```
docker build -t rosiewatson/weather-app .
docker run -p 3000:3000 -it rosiewatson/weather-app
```

[Note that the docker image isn't optimised for production use]

### Without Docker

```
npm start
```

## Extra thoughts

If I was to spend more time on this project some extra things I would think about:
- Due to time constraints I didn't add in a fuzzy search. However, if I had for this task I would have added a hardcoded list of cities and then as the user typed into the search bar I would have checked against this list and displayed the options underneath in a dropdown list. The most optimal way would be using an API (such as one from Google) that would allow me to check against a live list of cities.
- Using Redux and persistent local storage to keep the history of the users search even after refresh or leaving the site. This could also be used to stored some of the previous searches to remove the need to re-request the data.
- Use more of the data points.
