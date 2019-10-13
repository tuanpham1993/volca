FROM node:12.10.0-alpine

COPY . .

RUN ["yarn"]

ENTRYPOINT [ "node" ]

CMD ["app.js"]
