FROM node:22.4.0
RUN npm i -g nodemon
WORKDIR /server
COPY package.json package-lock.json ./
COPY .env .env
RUN npm install
ENTRYPOINT [ "npm", "run", "dev" ]
EXPOSE 3000