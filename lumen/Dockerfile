FROM phpearth/php:7.3-nginx

RUN apk add --no-cache git composer phpunit

COPY . /app

RUN rm /etc/nginx/conf.d/default.conf 

COPY ./nginx/default.conf /etc/nginx/conf.d

WORKDIR /app

RUN composer install

EXPOSE 80

CMD ["/sbin/runit-wrapper"]