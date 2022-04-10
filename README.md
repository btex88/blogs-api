# Blogs API


## Why does this exist?
- This project was developed eyeballing working with Sequelize ORM in creating a back end part of a "Blog" working as its API.
- The project was originally sketched by Trybe School and was meant to test our knowledge in backend, REST API, MSC architecture, working with Sequelize and MySQL database.


## Application roadmap
- All files and folders are inside ```/lib```. Since the application uses importing and exporting modules with ```require``` and ```module.exports```, the directory folder chosen for that was the ```/lib```.
- All routes are inside ```/lib/routes```.
- The ```/lib/database``` folder is meant to store all sequelize migrations and its connection start up config.
- The ```/lib/config``` holds the environment configuration for Sequelize.
- The ```/lib/helpers``` holds default messages and JWT configuration, working as a helper folder for storing literately helper classes that are used throughout the whole project.
- All the validations, check and verification are done inside the ```/lib/middlewares```. I've chosen to work with a single class using it static mode for all methods so a single middleware would be provided for every check or verify needed.
- Inside the ```/lib/controllers``` we will be able to find all the communication with the routes and treating the usage of the ExpressJS in this project. So the routes sends all requests to the controllers layer that literately controls those requisitions and responses, it is the "man in the middle" connecting the routes to those middleware validations and the business logic stored inside the services folder.
- The service layer, stored inside ```/lib/services``, is the responsible for the whole business logic of the project. In this layer that the magic happens, it is the responsibility of the services to apply all requests to the models layer and return the results for the controllers.
- The models layer, kept inside ```/lib/models``, has the main responsibility of handling the database, in this case we are using MySQL, but could be as easily as PostgreSQL or MariaDB or even SQLite. In this folder is all the ORM structure to store all values, return queries and modify our database.
- The ```/seeders``` stores the base default config for the database.
- The ```/tests``` folder was removed, since was a part of the evaluation to validate my project, and wasn't developed by myself, based on this I've choose to not publish a work that wasn't developed by my self and so I wouldn't have the ownership of that part of code.


## Links of libs used in this app
- [Sequelize](https://sequelize.org/)
- [ExpressJS](https://expressjs.com/)
- [Colorette](https://github.com/jorgebucaran/colorette)
- [Nodemon](https://nodemon.io/)
- [Eslint](https://eslint.org/)
- [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken)
- [Lodash](https://lodash.com/)
- [Node MySQL 2](https://github.com/sidorares/node-mysql2)
- [dotenv](https://github.com/motdotla/dotenv)


## How to use this API?
- First you need to clone the project into your machine, then you gotta open your terminal, change into the project directory and type ```npm install```
- After this process done, you must type create a ```.env``` file in the root of the project. Inside that file you must set you environment variables so the node will be able to access you database and the necessary settings and ports for setting up the API.
- With all this done, you may now hit ```npm start``` so you will got the project running.
