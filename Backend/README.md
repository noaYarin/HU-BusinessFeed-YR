# Business Feed

## About our Website

This project is about Index & Information Website for Business Owners to help Advertise Their Business.

-   Creating and connecting users using JWT (npm package) and dividing them into 3 access permissions: **Regular user ,Business and Admin**.
-   Creating a business card and performing CRUD operations for the business users.
-   Users can find card by entering it's short unique ID.
-   Everyone can see all cards without JWT.

## API Routes

**REST API for User**

| Description   | URL           | Method |
| ------------- | ------------- | ------ |
| User Register | /user/signUp  | POST   |
| User Login    | /user/signIn  | POST   |
| Get User      | /user/:userId | GET    |

**REST API for Card**

| Description                         | URL               | Method | Token        |
| ----------------------------------- | ----------------- | ------ | ------------ |
| Create Card                         | /cards/newCard    | POST   | Required     |
| Get all Cards                       | /cards/allCards   | GET    | Not Required |
| Get Card                            | /cards/cardBy/:id | GET    | Not Required |
| Get Card for Business user          | /cards/byUser/:id | GET    | Required     |
| Add LIKE to Card                    | /cards/cardBy/:id | PATCH  | Required     |
| Update Card                         | /cards/cardBy/:id | PUT    | Required     |
| Update Unique Card (for Admin user) | /cards/cardBy/:id | PATCH  | Required     |
| Delete Card                         | /cards/cardBy/:id | DELETE | Required     |

## API Reference

#### User Register (Sign Up)

```http
  POST /user/signUp
```

| Parameter    | Description                                            |
| :----------- | :----------------------------------------------------- |
| `username`   | **Required**. Username to be displayed when connected. |
| `email`      | **Required**.                                          |
| `password`   | **Required**.                                          |
| `isBusiness` | **Required**. Give the ability to create card(s).      |

Response:
On error - 'User already exist' or 'lack of field(s)' or 'incorrect validation'.
On success - Success signup.

#### User Login

```http
  POST /user/signIn
```

| Parameter  | Description                        |
| :--------- | :--------------------------------- |
| `email`    | the user email from the signup.    |
| `password` | the user password from the signup. |

Response:
On error - Incorrect details.
On success - Token is generated for that session.

#### Get User Details

```http
  GET /user/:userId
```

| Parameter | Description                                            |
| :-------- | :----------------------------------------------------- |
| id        | the id of the user to be shown.                        |
| TOKEN     | the token that identify the user who make the request. |

Response:
On error - Incorrect details.
On success - User details will be shown in a page.

#### Create New Card

```http
  POST /cards/newCard
```

Data is stored in req.body
| Parameter | Description |
| :-------- | :------------------------- |
| `ownerId` | the user whom created the card. |
| `cardId` | unique card id. |
| `bName` | the name of the business. |
| `bDesc` | the description of the business. |
| `bAddr` | the address of the business.|
| `bPhone` | the phone number of the business.|
| `bImageUrl` | the image/logo of the business. |
| `likes` | the list of the user that liked the business. |

Response:
On error - Incorrect details.
On success - Token is generated for that session.

#### Get all Cards

```http
  GET /cards/allCards
```

No token is required.
Response:
On error - Server/DB error.
On success - all Cards for DB.

#### Get Card

```http
  GET /cards/cardBy/:id
```

| Parameter | Description                       |
| :-------- | :-------------------------------- |
| id        | the id of the card to get from DB |

\*id can be the unique id or mongoose's ObjectId
Response:
On error - Server/DB error.
On success - Card found/not exist.

#### Get Card for Business user

```http
  GET /cards/byUser/:id
```

| Parameter | Description                                            |
| :-------- | :----------------------------------------------------- |
| id        | get cards of the user by the user id                   |
| TOKEN     | the token that identify the user who make the request. |

Response:
On error - Server/DB error.
On success - Cards of the user found/not exist.

#### Add LIKE to Card

```http
  PATCH /cards/cardBy/:id
```

| Parameter | Description                                            |
| :-------- | :----------------------------------------------------- |
| id        | set LIKE to card by the id of the card                 |
| TOKEN     | the token that identify the user who make the request. |

Response:
On error - Server/DB error.
On success - LIKE added/removed to the card.

#### Update Card

```http
  PUT /cards/cardBy/:id
```

| Parameter | Description                                            |
| :-------- | :----------------------------------------------------- |
| id        | the id of the card to be updated                       |
| TOKEN     | the token that identify the user who make the request. |

Response:
On error - Incorrect details.
On success - Card has been updated.

#### Update Unique Card ID

```http
  PATCH /cards/cardBy/:id
```

| Parameter | Description                                            |
| :-------- | :----------------------------------------------------- |
| id        | the id of the card to be updated                       |
| TOKEN     | the token that identify the user who make the request. |

**ONLY FOR ADMIN!**

Response:
On error - Incorrect details.
On success - Token is generated for that session.

#### Delete Card

```http
  DELETE /cards/cardBy/:id
```

| Parameter | Description                       |
| :-------- | :-------------------------------- |
| id        | the id of the card to be deleted  |
| TOKEN     | the token that identify the user. |

Response:
On error - 'id not found' | 'token not valid' | 'card not found'.
On success - 'card deleted' confirmation(can be an empty object).

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

-   👩‍💻[Yarin Levi](https://github.com/YarinLevi5)
-   👨‍💻[Raz Duchan ](https://github.com/razdu)
-   👨‍💻[Chen Duchan](https://github.com/ChenDuch)
