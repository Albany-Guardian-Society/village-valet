# build environment
FROM node:12-alpine
WORKDIR /usr/src/app
ENV GENERATE_SOURCEMAP false
COPY package.json ./
RUN npm install
COPY . .
EXPOSE 3000
RUN npm run build
RUN npm start
