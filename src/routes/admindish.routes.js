const {Router} = require('express')
const AdminDishController = require('../controllers/AdminDishController')
const ensureAutheticated = require('../Middlewares/ensureAutheticated')
const ensureAdmin = require('../Middlewares/ensureAdmin')

const adminDishController = new AdminDishController()

const adminDishRoutes = new Router()

adminDishRoutes.use(ensureAutheticated,ensureAdmin)
adminDishRoutes.post("/", adminDishController.create)
adminDishRoutes.put("/:food_id", adminDishController.update)
adminDishRoutes.delete("/:food_id",adminDishController.delete)

module.exports = adminDishRoutes