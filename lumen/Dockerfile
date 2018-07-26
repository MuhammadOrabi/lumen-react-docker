FROM orabi/php

RUN apk update \
    && apk upgrade \
    && apk add --no-cache bash \
    && adduser -D -H -u 1000 -s /bin/bash 


COPY . /var/www/

WORKDIR /var/www/

RUN composer update

EXPOSE 80

CMD nginx
