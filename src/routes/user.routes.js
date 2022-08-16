const {Router} = require('express');
// multer is used to help manage and store img files, the db only gets a url
const UsersController = require('../controllers/UsersControllers')
const multer = require('multer');
const ensureAutheticated = require('../Middlewares/ensureAutheticated');


const usersController = new UsersController()

const userRoutes = Router();
// by the way this show method is a security issue

userRoutes.get("/", usersController.show)
userRoutes.post("/", usersController.create)
userRoutes.put("/",ensureAutheticated,usersController.update)
// we need to import middleware in order to apply it to certain routes here
// we import and instanciate controller classes as well
// we then set the routes of 'user' here and point it to the correct methods
//  of the class

module.exports = userRoutes;