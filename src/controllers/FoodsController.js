const knex = require("../database/knex")


class FoodsController{
  async index(request,response){
    const {food,ingredient} = request.query

    let foods;

    // these queries are mutually exclusive, only one should  be sent
    if(food){
      foods = await knex('foods').select([
        'food_name',
        'ingredients',
        'price']).whereLike('food_name',`%${food}%`)
    }
    else if(ingredient){
      foods = await knex('foods').select([
        'food_name',
        'ingredients',
        'price']).whereLike('ingredients',`%${ingredient}%`)
    }
    else{
      foods = await knex('foods').select([
        'food_name',
        'ingredients',
        'price'
      ])
    }
    return response.status(201).json(foods)
  }
  async show (request,response){
    const {food_id} = request.params
    const food = await knex('foods').select().where('id',food_id)
    return response.status(201).json(food)
  }
}

module.exports = FoodsController