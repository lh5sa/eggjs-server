FROM node:lts-alpine

ENV NODE_ENV="production"
RUN npm config set registry "https://registry.npm.taobao.org/"

ADD . ./usr/www/server
WORKDIR /usr/www/server
RUN npm install

EXPOSE 7001

CMD [ "npm", "run", "start" ]

