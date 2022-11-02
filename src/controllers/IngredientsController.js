const knex = require("../database/knex")


class IngredientsController{
  async index(request,response){
    const ingredients = await knex('ingredients')
    return response.status(200).json(ingredients)
  }
  async show(request,response){
    const {ingredient_name} = request.params
    const ingredient = await knex('ingredients').select().where('ingredient',ingredient_name)
 
    return response.status(200).json(ingredient[0])
  }

  async create(request,response){
    const {ingredient} = request.body
    const author_id = request.user.id
    await knex("ingredients").insert({
      author_id,
      ingredient
    })
    const ingredient_data = await knex('ingredients').select().where('ingredient',ingredient)
    return response.status(201).json(ingredient_data[0])
  }

  async update(request,response){
    const {ingredient} = request.body
    const {ingredient_id} = request.params

    const ingredient_data = await knex("ingredients").where('id',ingredient_id).first();

    ingredient_data.ingredient = ingredient ?? ingredient_data.ingredient 
  
    await knex("ingredients").where('id',ingredient_id).update({
      ingredient:ingredient_data.ingredient,
      updated_at: knex.fn.now()
    })
    return response.status(202).json(ingredient_data)
  }

  async delete(request,response){
    const {ingredient_id} = request.params
    await knex("ingredients").where('id',ingredient_id).delete()
    return response.status(200).json()
  }

}

module.exports = IngredientsController