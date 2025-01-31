FROM php:8.2.4-fpm

WORKDIR /poll_backend

ARG PUID=1000
ENV PUID ${PUID}
ARG PGID=1000
ENV PGID ${PGID}

USER root
RUN groupadd -g $PGID laradock && \
    useradd -u $PUID -g laradock -m laradock

COPY --chown=laradock:laradock . .



## install/enable extensions
RUN apt-get update -y && apt-get install -y \
    build-essential \
    git \
    cron \
    nano \
    libzip-dev \
    libpq-dev \
    unzip \
    libfreetype6-dev \
    libjpeg62-turbo-dev \
    libpng-dev \
    curl \
    rsyslog
#RUN docker-php-ext-configure gd --with-gd --with-freetype-dir=/usr/include/ --with-jpeg-dir=/usr/include/ --with-png-dir=/usr/include/
#RUN docker-php-ext-install gd
RUN docker-php-ext-configure gd --with-freetype --with-jpeg
RUN docker-php-ext-install gd

RUN docker-php-ext-install bcmath
RUN docker-php-ext-install zip
RUN docker-php-ext-install pdo pdo_pgsql pgsql

RUN docker-php-ext-configure pcntl --enable-pcntl \
  && docker-php-ext-install \
    pcntl


## Composer install
# RUN mkdir vendor
RUN chown -R laradock:laradock vendor
COPY --from=composer:latest /usr/bin/composer /usr/local/bin/composer
USER laradock
RUN composer install



## Supervisor for laravel queue
#USER root
#RUN apt-get install -y supervisor
#COPY ./docker/laravel-worker.conf /etc/supervisor/conf.d

## add php configs
#COPY ./docker/laravel.ini /usr/local/etc/php/conf.d
#COPY ./docker/www.conf /usr/local/etc/php-fpm.d


#USER root
#
#ADD ./docker/entrypoint.sh /sbin
#
#CMD ["entrypoint.sh"]
