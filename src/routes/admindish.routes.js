const {Router} = require('express')
const multer = require("multer")
const uploadConfig = require('../configs/upload')

const AdminDishController = require('../controllers/AdminDishController')
const FoodImgController = require('../controllers/FoodImgController')
const ensureAutheticated = require('../Middlewares/ensureAutheticated')
const ensureAdmin = require('../Middlewares/ensureAdmin')

const adminDishController = new AdminDishController()
const foodImgController = new FoodImgController()

const adminDishRoutes = new Router()
const upload = multer(uploadConfig.MULTER)

adminDishRoutes.use(ensureAutheticated,ensureAdmin)
adminDishRoutes.post("/", adminDishController.create)
adminDishRoutes.put("/:food_id", adminDishController.update)
adminDishRoutes.patch("/food_img/:food_id",upload.single("food_img"),foodImgController.update);
adminDishRoutes.delete("/:food_id",adminDishController.delete)

module.exports = adminDishRoutes