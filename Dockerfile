# Use Node.js base image
FROM node:14-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

# Port 3000
EXPOSE 3000

CMD ["npm", "start"]
