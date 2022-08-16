const {Router} = require('express')

// here we import the routes from other files witihn this same folder
const userRoutes = require('./user.routes')
const sessionsRoutes = require('./sessions.routes')
const foodsRoutes = require('./foods.routes')
const adminDishRoutes = require('./admindish.routes')
const ordersRoutes = require('./orders.routes')

const routes = Router()

// here we use routes.use() in order to put those routes on the main router
// we also say what word leads to what route and that's it

routes.use("/user", userRoutes)
routes.use("/sessions",sessionsRoutes)
routes.use("/foods",foodsRoutes)
routes.use("/admindish",adminDishRoutes)
routes.use("/orders",ordersRoutes)

module.exports = routes;