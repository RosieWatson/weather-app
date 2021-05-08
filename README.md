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
