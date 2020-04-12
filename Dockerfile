FROM node:12-alpine as builder
WORKDIR /app
COPY . ./
RUN npm install
CMD npm run build

FROM nginx:alpine
COPY etc/app.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
