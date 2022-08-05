const {Router, application} = require('express')

// here we import the routes from other files witihn this same folder
const userRoutes = require('./user.routes')

const routes = Router()

// here we use routes.use() in order to put those routes on the main router
// we also say what word leads to what route and that's it

routes.use("/user", userRoutes)

module.exports = routes;