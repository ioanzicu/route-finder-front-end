# Dockerfile References: https://docs.docker.com/engine/reference/builder/

# pull official base image
FROM node:12.19.0-alpine

# set working directory
WORKDIR /srv/app/route-finder-client

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

LABEL maintainer="Ioan Zîcu <ioan.zicu94@gmail.com>"

# install app dependencies
COPY package.json /srv/app/route-finder-client 
COPY yarn.lock /srv/app/route-finder-client

RUN yarn

# add app
COPY . /srv/app/route-finder-client
RUN yarn build

EXPOSE 3000

# start app
CMD ["yarn", "start"]