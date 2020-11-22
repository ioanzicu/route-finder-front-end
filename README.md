# Route Finder with Create React App

The Route Finder is the Front End part for the Back End part written in Golang.
The project help users to get information about the source and destination(s) points in form of latitude and longitude and recevice data about duration and distance between those.
The route resolution by geographical coordinates is done implemented in the Back End side by consuming the **[Open Source Routing Machine](http://project-osrm.org/)** API.
User can also search for coordinates by the name location. This part is fully implemented in the Front End side by consuming the **[HERE Geocoding & Search](https://developer.here.com/products/geocoding-and-search)** API.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### Prerequisites:

- [NodeJS](https://nodejs.org/en/)
- [Yarn](https://yarnpkg.com/)
- [Docker Desktop](https://www.docker.com/products/docker-desktop) (if you want to run the application in a docker container)

## Install dependencies:

Navigate into the project folder

```bash
cd client
```

To install the dependencies run:

```bash
yarn
```

## Start the app

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

## Run the Application in the Docker Container

Navigate into the project folder

```bash
cd client
```

- **Build the docker image**

```bash
docker build -t route-finder-front-end .
```

Instead of `route-finder-front-end`, you can use your custom name for the docker image.

**Note!!!** For Linux environment it can be require to use `sudo`.

- **Run the docker container**

```bash
docker run -p -it [host port]:[exposed container port] route-finder-front-end
```

Example:

```bash
docker run -it -p 3000:3000 route-finder-front-end
```

`it` - flag for interactive processes (like a shell)

To run the container in the detached mode use `-d` flag

```bash
docker run -d -it -p 3000:3000 route-finder-front-end
```

- **Stop the container**

```bash
docker ps
```

Find the image `CONTAINER ID` (looks like `6fe5657a5654`).

```bash
docker stop [CONTAINER ID]
```

- **Remove the image**

```bash
docker rm [CONTAINER ID]
```

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
