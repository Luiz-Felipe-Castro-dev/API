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
    const {name,email,password,old_password} = request.body;

    const user_id = request.user.id
    const user = await knex("users").where('id',user_id).first();

    if (!user){
      throw new AppError('usuário não encontrado')
    }
    
    const userWithUpdatedEmail = await knex("users").where({email}).first()

    if(userWithUpdatedEmail && userWithUpdatedEmail.id !== user.id){
      throw new AppError('email ja esta em uso')
    }

    user.name = name ?? user.name
    user.email = email ?? user.email

    if (password && !old_password){
      throw new AppError("Você precisa informar a senha antiga")
    }
    if (password && old_password){
      const checkIfPasswordsMatch = user.password == old_password
      if(!checkIfPasswordsMatch){
        throw new AppError("As senhas não conferem")
      }
      user.password = password
    }
    await knex("users").where('id',user.id).update({
      name:user.name,
      email:user.email,
      password:user.password,
      updated_at: knex.fn.now()
    })
    return response.status(201).json(user)
  }

}

module.exports = UsersController