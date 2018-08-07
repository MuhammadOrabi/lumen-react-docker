FROM node

WORKDIR /front

COPY . .

RUN yarn

ENV PORT=3000

EXPOSE 3000

CMD ["yarn", "serve"]
