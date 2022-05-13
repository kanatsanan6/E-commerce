# E-SHOP-WEBSITE

***

## Live Demo

Click here for a live demo: [E-SHOP](https://e-shop-commerce-app.netlify.app/)

## About the Project

![Home page](https://github.com/kanatsanan6/E-commerce/blob/master/client/public/HomePage.PNG?raw=true)

E-SHOP is a E-commerce website built by **React js (Frontend)** and **Node js (Backend).**

Merchandises' information is powered by [Fake Store API](https://fakestoreapi.com/).

The design is inspired by [Sumukha210 E-Commerce Project](https://github.com/Sumukha210/E-kart-website#redux-hooks).

## Usage

#### Front-End

- React

- React Bootstrap

- React Router Dom v6

- Axios

- Firebase ( Authentication and Real-time Database )

- Stripe ( Payment system )

- Netlify ( Deployment )

#### Back-End

- Node

- Express

- Cors

- Stripe ( Payment System )

- Heroku ( Deployment )

## Functionalities

#### Basic Functionalities

- User can see all of the products on Home page.

- User can see the product's detail on Product detail page by clicking on the product.

- User can add the product to busket ( with or without an authentication )

- User can see the summary of the basket including the total price of an order on Checkout page.

- User can be able to increase and decrease the quantity of products from busket.

- User can be able to remove the product from basket.

- User can checkout the order ( powered by Stripe ).

#### Authentication

- User can register and login to the website ( powered by firebase authentication ).

- The items will still be in the basket once user re-logged in ( powered by firebase real-time database ). 

- If there are any orders in the basket before logged in, the order will be merged with the existing order in the account once user logged in.

## Installation

#### 1. Clone the project repo

```bash
git clone https://github.com/kanatsanan6/E-commerce
```

#### 2. Install the dependancies.

- Client dependencies

```bash
cd client
npm install
```

- Server dependencies

```bash
cd server
npm install
```

#### 3. Start the project

- Client

```bash
npm start
```

- Server

```bash
npm start
```
