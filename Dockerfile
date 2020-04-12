FROM node:12-alpine as builder
WORKDIR /usr/src/app
COPY . ./
RUN npm install
CMD npm run build

FROM nginx:alpine
COPY etc/app.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /usr/src/app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
