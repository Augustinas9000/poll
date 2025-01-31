FROM node:18.15.0

RUN mkdir /poll_adminpanel
RUN chown -R node:node /poll_adminpanel

WORKDIR /poll_adminpanel


ARG NODE_ENV_ARG
ENV NODE_ENV=$NODE_ENV_ARG

RUN echo $NODE_ENV

# copy everything
COPY --chown=node:node . .


RUN mkdir node_modules
RUN mkdir .angular
RUN mkdir dist
RUN chown -R node:node node_modules
RUN chown -R node:node dist
RUN chown -R node:node .angular

RUN npm install -g @angular/cli@17.1.0



USER node
RUN whoami
RUN ls -lah
RUN npm install


RUN npm run build:${NODE_ENV}


RUN ls -lah dist


