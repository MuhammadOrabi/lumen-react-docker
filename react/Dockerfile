FROM orabi/node:10

WORKDIR /react

COPY package.json .

RUN yarn

ENV PORT=3000

EXPOSE 3000

CMD ["yarn", "start"]
