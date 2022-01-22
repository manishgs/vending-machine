FROM  node:17-alpine3.14 as base
RUN apk add gcc make libc-dev python2 g++
WORKDIR /src

EXPOSE 3000

FROM base as production
ENV NODE_ENV=production
RUN yarn install && yarn build
COPY . /
CMD ["yarn", "start"]

FROM base as dev
ENV NODE_ENV=development
RUN yarn install
COPY . /
CMD ["yarn", "dev"]