# Vending Machine
Vending machine where one can buy drinks using coins and cash.


## Getting started

### Install

```
git clone `git@github.com:manishgs/vending-machine.git`
cd vending-machine
yarn install
```

### Run


Build the project

```
 yarn build
```

Run migration

```
yarn migrate
```

Run seed
```
yarn seed
```

Run the project for production

```
 yarn start
```

Run the project for development

```
 yarn dev
```


### Code Formattting

We are using Eslint to find coding errors and code formatting. Install ESlint extension on your editor.
Run linter before you commit changes.

```
yarn lint
```


## API Endpoints

```
GET http://localhost:3000/api/products
Authorization: Bearer XXX
```
```
GET http://localhost:3000/api/balance
Authorization: Bearer XXX
```
```
POST http://localhost:3000/api/purchase
Content-Type: application/json
Authorization: Bearer XXX

{
    "productId": xxx , 
    "amount": xxx
}

```

```
POST http://localhost:3000/api/refund
Content-Type: application/json
Authorization: Bearer XXXX

{
    "productId":xxx 
}
```


## Docker
for production, update `target` and `NODE_ENV` in `docker-compose.yml` 

```

 target: production 

 ...

 NODE_ENV: production 
```

Create and start containers
```
docker-compose up
```

Run yarn scripts
```
docker-compose exec api yarn $
```