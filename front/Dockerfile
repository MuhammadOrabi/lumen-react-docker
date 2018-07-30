FROM node

WORKDIR /front

COPY package.json .

RUN yarn

ENV PORT=3000

EXPOSE 3000

CMD ["yarn", "serve"]
