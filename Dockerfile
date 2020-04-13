FROM node:12-alpine as builder
WORKDIR /builder
RUN npm install
COPY . .
CMD npm run build

FROM nginx:alpine
COPY /etc/app.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /builder/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
