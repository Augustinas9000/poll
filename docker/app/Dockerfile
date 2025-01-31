FROM phusion/baseimage:master

RUN DEBIAN_FRONTEND=noninteractive

ADD root /
RUN chmod +x /start.sh

ENTRYPOINT ["/start.sh"]

ARG PUID=1000
ARG PGID=1000
RUN groupadd -g $PGID laradock && \
    useradd -u $PUID -g laradock -m laradock

USER laradock

COPY poll_backend /var/www/laravel
COPY poll_frontend/dist /var/www/laravel/public
COPY poll_adminpanel/dist /var/www/laravel/poll_adminpanel

USER root

RUN chown -R laradock:laradock /var/www/laravel

ENV KEEP_ALIVE=1
