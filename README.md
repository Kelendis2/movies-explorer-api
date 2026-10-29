# Movies Explorer API

## Description

A REST API for user authentication and saving favorite movies. Built for the **Movie Explorer** movie search service, which allows users to find movies by keywords.

**Server domain:**

https://api.movies.kelendis.nomoreparties.co/

## API Resource Schemas and Models

### `user` Schema Fields

| Field | Description |
| ----- | ----------- |
| email | The email address used to register. Required and unique for each user. Validated as an email address. |
| password | Password hash. Required string field. Excluded from database query results by default. |
| name | User's name. Required string field, between 2 and 30 characters long. |

### `movie` Schema Fields

| Field | Description |
| ----- | ----------- |
| country | Country where the movie was produced. Required string field. |
| director | Movie director. Required string field. |
| duration | Movie duration. Required numeric field. |
| year | Movie release year. Required string field. |
| description | Movie description. Required string field. |
| image | URL of the movie poster. Required string field. |
| trailer | URL of the movie trailer. Required string field. |
| thumbnail | URL of the movie poster thumbnail. Required string field. |
| owner | `_id` of the user who saved the movie. Required field. |
| movieId | Movie `id` returned by the **MoviesExplorer** service. Required field. |
| nameRU | Movie title in Russian. Required string field. |
| nameEN | Movie title in English. Required string field. |

## Methods and Routes

| Method | Route | Description |
| ------ | ----- | ----------- |
| GET | `/users/me` | Returns the user's `email` and `name`. |
| PATCH | `/users/me` | Updates the user's information using the `email` and `name` provided in the request body. |
| POST | `/movies` | Creates a movie using the `country`, `director`, `duration`, `year`, `description`, `image`, `trailer`, `nameRU`, `nameEN`, `movieId`, and `thumbnail` provided in the request body. |
| GET | `/movies` | Returns all movies saved by the user. |
| DELETE | `/movies/:movieId` | Deletes a saved movie by its `_id`. |
| POST | `/signup` | Creates a user using the `email`, `password`, and `name` provided in the request body. |
| POST | `/signin` | Validates the `email` and `password` provided in the request body and returns a JWT. |

## Technologies Used

- Express.js
- nodemon
- MongoDB
- mongoose
- dotenv
- cors
- celebrate
- bcryptjs
- express-rate-limit
- winston
- express-winston
- helmet
- jsonwebtoken
- validator
- eslint
