const knex = require("../database/knex")
const AppError = require("../utils/AppError")

async function ensureAdmin(request,response,next){
  const {id} = request.user
  const isAutorized = await knex("users").where('id',id).select('isAdmin');

  const isAdmin = isAutorized[0].isAdmin;
  if(isAdmin == 1){
    return next() 
  }
  else if(isAdmin == 0){
    throw new AppError('usuario não permitido',401)
  }
  else{
    throw new AppError('internal server error',500)
  }
}

module.exports = ensureAdmin