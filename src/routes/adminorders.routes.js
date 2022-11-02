const {Router} = require('express')
const AdminOrderController = require('../controllers/AdminOrderController')
const ensureAutheticated = require('../Middlewares/ensureAutheticated')
const ensureAdmin = require('../Middlewares/ensureAdmin')

const adminOrderController = new AdminOrderController()

const adminOrdersRoutes = new Router()

adminOrdersRoutes.use(ensureAutheticated,ensureAdmin)
adminOrdersRoutes.get("/",adminOrderController.index)
adminOrdersRoutes.put("/:order_id",adminOrderController.update)

module.exports = adminOrdersRoutes