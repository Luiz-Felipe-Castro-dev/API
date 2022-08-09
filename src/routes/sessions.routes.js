const {Router} = require('express')

const SessionsController = require('../controllers/SessionsController')

const sessionsController = new SessionsController

const sessionsRoutes = new Router()

sessionsRoutes.post("/", sessionsController.create)

module.exports = sessionsRoutes