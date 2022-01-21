# Vending Machine
Vending machine where one can buy drinks using coins.


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

## API EndPoint

```
GET /api/products
Authorization: Bearer XXX
```
```
GET /api/balance
Authorization: Bearer XXX
```
```
POST /api/purchase
Content-Type: application/json
Authorization: Bearer XXX

{
    "productId": xxx , 
    "amount": xxx
}

```

```
POST /api/refund
Content-Type: application/json
Authorization: Bearer XXXX

{
    "productId":xxx 
}
```