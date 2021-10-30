const { Router } = require('express');

const LoginController = require('./app/Controllers/LoginController');
const UserController = require('./app/Controllers/UserController');
const AuthMiddleware = require('./app/Middlewares/AuthMiddleware');

const routes = new Router();

routes.post("/user", UserController.store);
routes.get("/users", AuthMiddleware, UserController.show);

routes.post("/login", LoginController.index);


module.exports = routes;