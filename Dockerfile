FROM nginx:1.27-alpine

WORKDIR /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY index.html styles.css script.js favicon.ico ./
COPY ["code dark.json", "./"]
COPY assets ./assets
COPY certs ./certs

RUN mkdir -p /etc/nginx/certs \
  && cp certs/cert.pem /etc/nginx/certs/cert.pem \
  && cp certs/cert.key /etc/nginx/certs/cert.key

EXPOSE 80 443
