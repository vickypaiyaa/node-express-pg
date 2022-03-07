# Setup application
Do `npm install` and start application `npm start`

# API list
1.  `/api/users` (POST) - Create user for login access
2.  `/api/login` (POST) - Create auth token by username
3.  `/api/verification` (POST) - Generate unique random number and update for the user

4.  `/api/students` (POST) - Create/insert student details
5.  `/api/students` (GET) - Fetch all student details using limit and offset(pagination)
6.  `/api/students/:studentId` - Update student details by only passing columns

# test coverage
Run `jest --coverage` to see api testing using JEST framework

# more points added
* ExpressJS framework for middleware
* postgres database used, npm pg package for db pooling connection
* created two tables users and students (attached table details - `Filename: database.sql`)
* token validation and verification for all API's using jwt, Secret_key used for verifiy the token for all requests
* Token is must for all API's except login 
* login API return token data, So this will be used for all other API's
* controllers based API access through routes
* Postman collections (attached - `Filename: adc.postman_collection.json`)
* environment variable used for DB connection string
* Application running on http://localhost:3000 URL
* Attached few screenshots for reference