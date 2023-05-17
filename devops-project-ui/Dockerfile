FROM node:18

WORKDIR /app

COPY . .

RUN npm install

ENV PORT=4200

EXPOSE 4200

CMD [ "npm", "start" ]
