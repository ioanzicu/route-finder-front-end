# Reference: https://docs.docker.com/engine/reference/builder/#:~:text=A%20Dockerfile%20is%20a%20text,can%20use%20in%20a%20Dockerfile%20.

# pull official base image
FROM node:12.19.0-alpine

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install app dependencies
COPY package.json yarn.lock ./ 

RUN yarn

# add app
COPY . ./
RUN yarn build



EXPOSE 3000

# start app
CMD ["yarn", "start"]