FROM node:16-alpine

WORKDIR /app

COPY package*.json ./ 
# adiciona todos ariquivos que começam com package. no caso pega o pack.json e o pcj-lock.json

RUN ["npm", "install"]

COPY  . .

EXPOSE 3001

CMD ["npm", "start"]