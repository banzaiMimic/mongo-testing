FROM node:16.14.0
WORKDIR /app
COPY ["package.json", "yarn.lock", "./"]
RUN yarn
COPY . .
CMD ["yarn", "start"]