Movie API Documentation
This API provides information about movies, genres, and directors. Users can interact with the API to retrieve details about movies, genres, directors, create new users, and manage their favorite movies.

Table of Contents
Endpoints
1. Get All Movies
2. Get Movie by ID
3. Get Genre Description
4. Get Director by Name
5. Create New User
6. Update User Details
7. Add Movie to User's Favorites
8. Remove Movie from User's Favorites
9. Delete User
Endpoints
1. Get All Movies
Request:

Method: GET
URL: /movies
Request Body: None
Response:

Format: JSON
Description: A JSON object containing data on all movies.
2. Get Movie by ID
Request:

Method: GET
URL: /movies/[id]
Request Body: None
Response:

Format: JSON
Description: A JSON object containing data about a specific movie, including title, description, director details, genre with description, release date, image URL, and featured status.
3. Get Genre Description
Request:

Method: GET
URL: /movies/genre/[name]
Request Body: None
Response:

Format: JSON
Description: A JSON object containing the description of a genre.
4. Get Director by Name
Request:

Method: GET
URL: /movies/director/[name]
Request Body: None
Response:

Format: JSON
Description: A JSON object containing details about a director, including name, bio, birth date, and death date.
5. Create New User
Request:

Method: POST
URL: /users
Request Body Format: JSON
{
  "username": "eaadalen",
  "password": "abcd1234",
  "email": "eaadalen@fake.co",
  "birthday": "2000-01-01"
}
Response:

Format: JSON
Description: A JSON object with user details, including the new user's ID, version, date, and an empty list of favorite movies.
6. Update User Details
Request:

Method: PUT
URL: /users/[id]
Request Body Format: JSON (with at least one updated field)
{
  "username": "eaadalen",
  "email": "eaadalen@fake.co"
}
Response:

Format: JSON
Description: Updated user details.
7. Add Movie to User's Favorites
Request:

Method: POST
URL: /users/[id]/movies/[movie_id]
Request Body: None
Response:

Format: JSON
Description: Updated user details.
8. Remove Movie from User's Favorites
Request:

Method: DELETE
URL: /users/[id]/movies/[movie_id]
Request Body: None
Response:

Format: JSON
Description: Updated user details.
9. Delete User
Request:

Method: DELETE
URL: /users/[id]
Request Body: None
Response:

Format: JSON
Description: A message confirming the removal of the user.
Technologies Used
Node.js
Express.js
MongoDB with Mongoose
bcrypt
body-parser
cors
express-validator
jsonwebtoken
lodash
passport
passport-jwt
passport-local
uuid
Getting Started
Install dependencies: npm install
Start the server: npm start or for development with nodemon: npm run dev
Author
Erik Aadalen
License
This project is licensed under the ISC License.

Feel free to explore and interact with the Movie API!
