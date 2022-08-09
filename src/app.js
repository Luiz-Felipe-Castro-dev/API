require('dotenv/config');
require('express-async-errors');
const database = require('./database/sqlite');
const express = require('express');
const routes = require('./routes');
const AppError = require('./utils/AppError');
const knex = require('knex');

const app = express()
app.use(express.json())


app.use(routes)
database();
app.use((error, request, response, next) => {
  if (error instanceof AppError) {
    return response.status(error.statusCode).json({
      status: 'error',
      message: error.message
    })
  }

  console.error(error);

  return response.status(500).json({
    status: 'error',
    message: 'Internal server error'
  })
})


const PORT = process.env.SERVER_PORT

app.listen(PORT, () => console.log(`server is running on ${PORT}`))