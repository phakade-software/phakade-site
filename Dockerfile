FROM nginx:1.27-alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY index.html styles.css script.js favicon.ico ./
COPY ["code dark.json", "./"]
COPY assets ./assets

EXPOSE 80
