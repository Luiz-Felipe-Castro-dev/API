const knex = require("../database/knex");
const AppError = require("../utils/AppError");

class UsersController{
  async show(request,response){
    const data = await knex("users")
    return response.status(202).json(data)
  }
  async create (request,response){
    const {name,email,password} = request.body
    const CheckIfEmailIsFree = await knex("users").where({email}).first();
    if(CheckIfEmailIsFree){
      throw new AppError("este email ja esta em uso",400);
    }
    const data = await knex("users").insert([{
      name,
      email,
      password
    }],)
    const userData = await knex("users").where({name})
    //  this response is for debbuging
    return response.status(201).json(userData)
  }
  async update(request,response){
    const {name,email,password} = request.body;
    const user = await knex("users").where({})
  }
}

module.exports = UsersController