const knex = require("../database/knex")

class AdminOrderController{
  async index(request,response){
    const data = await knex("orders")
    return response.status(200).json(data)
  }
  async update(request,response){
    const {order_id} = request.params
    
    return response.status(202).json()
  }
}

module.exports = AdminOrderController