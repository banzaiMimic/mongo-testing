# mongo-testing
- demo for testable mongoose queries using jest
might add more here but for now can look at [this test file](./src/_tests/queryDemo.test.js)
- demo for running and connecting to mongo from node using docker / docker-compose [here](./docker-compose.yml)
- demo for creating mock files from json into mongo ["create-mocks" script here](https://github.com/banzaiMimic/mongo-testing/blob/main/package.json#L12) 
- decent way of using .env vars without all the .dotenv nonsense ["env" line up to "xargs)" line here](https://github.com/banzaiMimic/mongo-testing/blob/main/package.json#L10)

## pre-requisites node
- node [tested on 16.14.0]
- yarn [tested on 1.22.19]

## quickstart node
```
yarn
yarn test
```

## pre-requisites docker-compose
- docker [tested on 20.10.5+dfsg1]
- docker-compose [tested on 1.25.0]

## quickstart docker-compose
```
docker-compose up --build
```