FROM node:10
WORKDIR /build
COPY package.json /build
RUN npm install
COPY ./build /build
ENV NODE_ENV production
CMD node server.js
EXPOSE 3001