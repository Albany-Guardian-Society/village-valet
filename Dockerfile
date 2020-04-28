# build environment
FROM node:13.12.0-alpine
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
RUN npm ci --silent
RUN npm install react-scripts@3.2.1 -g --silent
COPY . ./
RUN npm run build
RUN npm run start
