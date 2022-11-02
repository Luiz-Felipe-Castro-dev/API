const knex = require("../database/knex")


class FoodsController{
  async index(request,response){
    const {food,ingredient} = request.query
    let foods;

    // these queries are mutually exclusive, only one should  be sent
    if(food){
      foods = await knex('foods').select([
        'id',
        'food_name',
        'category',
        'ingredients',
        'price',
        'description',
        'food_img']).whereLike('food_name',`%${food}%`)

    }
    else if(ingredient){
      foods = await knex('foods').select([
        'id',
        'food_name',
        'category',
        'ingredients',
        'price',
        'description',
        'food_img']).whereLike('ingredients',`%${ingredient}%`)
    }
    else{
      foods = await knex('foods').select([
        'id',
        'food_name',
        'category',
        'ingredients',
        'price',
        'description',
        'food_img'
      ])
    }
    return response.status(201).json(foods)
  }
  async show (request,response){
    const {food_id} = request.params
    const food = await knex('foods').select().where('id',food_id)

    return response.status(200).json(food[0])
  }
}

module.exports = FoodsController