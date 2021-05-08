# Weather App

A react app that serves a 3-day forecast using an open API (note API once chosen)

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
- Using Redux and persistent local storage to keep the history of the users search even after refresh or leaving the site. This could also be used to stored some of the previous searches to remove the need to re-request the data.
- Use more of the data points.
