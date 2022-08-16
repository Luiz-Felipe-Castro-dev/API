const {Router} = require('express');

const ensureAutheticated = require('../Middlewares/ensureAutheticated');
const OrdersController = require('../controllers/OrdersController')

const ordersController = new OrdersController()
const ordersRoutes = new Router()
ordersRoutes.use(ensureAutheticated)
ordersRoutes.get("/",ordersController.show)
ordersRoutes.post("/",ordersController.create)
ordersRoutes.put("/:order_id",ordersController.update)

module.exports = ordersRoutes