FROM node:8-alpine

EXPOSE 3000

ARG NODE_ENV
ENV NODE_ENV $NODE_ENV

WORKDIR /app
COPY package.json /app
RUN npm i
COPY . /app
CMD ["yarn", "docker:start"]
