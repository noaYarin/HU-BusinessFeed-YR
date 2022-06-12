# Business Feed 

## About our Website
This project is about Index & Information Website for Business Owners to help Advertise Their Business. 
- Creating and connecting users using JWT (npm package) and dividing them into 3 access permissions: **Regular user ,Business and Admin**.
- Creating a business card and performing CRUD operations for the business users.
- Users can find card by entering it's short unique ID.
- Everyone can see all cards without JWT.

## API Reference

**Web API for User**

| Description                  | URL              | Method  |                       
| ---------------------------- | ---------------- | ------- |
| User Register                | /user/signUp     | POST    |                      
| User Login                   | /user/signIn     | POST    |                     
| Get User                     | /user/:userId    | GET     |                                                  


**Web API for Card**

| Description                  | URL                  | Method |                    
| ---------------------------- | -------------------- |------- |
| Create Card                  | /cards/newCard       | POST   |                        
| Get all Cards                | /cards/allCards      | GET    |                     
| Get Card                     | /cards/cardBy/:id    | GET    |
| Get Card for Business user   | /cards/byUser/:id    | GET    |
| Get Unique Card              | /cards/byUnique/:id  | GET    |      
| Update Card                  | /cards/cardBy/:id    | PUT    | 
| Update Card for Admin user   | /cards/cardBy/:id    | PATCH  |
| Delete Card                  | /cards/cardBy/:id    | DELETE |


## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`PORT`
`HOST`
`DBHOST`
`SECRET_KEY`
`SERVER`
`TOKEN`

## NPM packaged used this projects + links:

-   https://shortunique.id/ - Short Unique ID.

## Screenshots 


## FAQ 💭

#### Question 1

Answer 1

#### Question 2

Answer 2


## Tech Stack

> **Client:** React

> **Server:** Node, Express, MongoDB

## Contributors
- 👩‍💻[Yarin Levi](https://github.com/YarinLevi5)
- 👨‍💻[Raz Duchan ](https://github.com/razdu)
- 👨‍💻[Chen Duchan](https://github.com/ChenDuch)
