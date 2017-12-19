FROM node:8.9.3

# Create app directory
WORKDIR /app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json /app/
RUN npm install

# Bundle app source
COPY . /app/

CMD node server/server.js

EXPOSE 8080
