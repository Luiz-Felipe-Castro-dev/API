const {Router} = require('express')
const multer = require("multer")
const uploadConfig = require('../configs/upload')

const IngredientsController = require('../controllers/IngredientsController')
const IngredientsImgController = require('../controllers/IngredientsImgController')

const ensureAutheticated = require('../Middlewares/ensureAutheticated')
const ensureAdmin = require('../Middlewares/ensureAdmin')

const ingredientsController = new IngredientsController()
const ingredientsImgController = new IngredientsImgController()

const ingredientsRoutes = Router()
const upload = multer(uploadConfig.MULTER)


ingredientsRoutes.use(ensureAutheticated)

ingredientsRoutes.get("/", ingredientsController.index)
ingredientsRoutes.get("/:ingredient_name",ingredientsController.show)
ingredientsRoutes.patch("/ingredient_img/:ingredient_id",upload.single("ingredient_img"),ensureAdmin,ingredientsImgController.update)

ingredientsRoutes.post("/",ensureAdmin,ingredientsController.create)
ingredientsRoutes.put("/:ingredient_id",ensureAdmin,ingredientsController.update)
ingredientsRoutes.delete("/:ingredients_id",ensureAdmin,ingredientsController.delete)

module.exports = ingredientsRoutes