const knex = require("../database/knex")

class AdminDishController{
  async create (request,response){
    const {food_name,ingredients,price} = request.body
    const author_id = request.user.id

    await knex("foods").insert({
      food_name,
      ingredients,
      price,
      author_id
    })
    return response.status(202).json()
  }
  async update  (request,response){
    const {food_name,ingredients,price} = request.body
    const {food_id} = request.params

    const food = await knex("foods").where('id',food_id).first();

    food.food_name = food_name ?? food.food_name
    food.ingredients = ingredients ?? food.ingredients
    food.price = price ?? food.price

    await knex("foods").where('id',food_id).update({
      food_name:food.food_name,
      ingredients:food.ingredients,
      price:food.price,
      updated_at: knex.fn.now()
    })
    return response.status(201).json(food)
  }
  async delete (request,response){
    const {food_id} = request.params
    await knex("foods").where('id',food_id).delete()
    return response.status(200).json()
  }
}

module.exports = AdminDishController