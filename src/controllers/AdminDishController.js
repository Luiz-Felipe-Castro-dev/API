const knex = require("../database/knex")

class AdminDishController{
  async create (request,response){
    const {food_name,category,ingredients,price,description} = request.body
    const author_id = request.user.id

    await knex("foods").insert({
      food_name,
      category,
      ingredients,
      price,
      description,
      author_id
    })
    const food = await knex('foods').select().where('food_name',food_name)
    return response.status(202).json(food[0])
  }
  async update  (request,response){
    const {food_name,category,ingredients,price,description} = request.body
    const {food_id} = request.params

    const food = await knex("foods").where('id',food_id).first();

    food.food_name = food_name ?? food.food_name
    food.category = category ?? food.category
    food.ingredients = ingredients ?? food.ingredients
    food.price = price ?? food.price
    food.description = description ?? food.description

    await knex("foods").where('id',food_id).update({
      food_name:food.food_name,
      category:food.category,
      ingredients:food.ingredients,
      price:food.price,
      description:food.description,
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