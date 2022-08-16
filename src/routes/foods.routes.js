const {Router} = require('express')

const FoodsController = require('../controllers/FoodsController')
const ensureAutheticated = require('../Middlewares/ensureAutheticated')

const foodsController = new FoodsController()

const foodsRoutes = Router()

foodsRoutes.use(ensureAutheticated)

foodsRoutes.get("/",foodsController.index)
foodsRoutes.get("/:food_id",foodsController.show)

module.exports = foodsRoutes