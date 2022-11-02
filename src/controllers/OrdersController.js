const knex = require("../database/knex")

class OrdersController{
  async show(request,response){
    const user_id = request.user.id
    const orders = await knex('orders').select([
      'id',
      'foods',
      'total_price',
      'client_id',
      'order_status',
      'created_at'
    ]).where('client_id',user_id)
    return response.status(200).json(orders)
  }
  async create (request,response){
    const {foods,total_price,order_status} = request.body;
    const client_id = request.user.id;

    await knex("orders").insert({
      foods,
      total_price,
      client_id,
    })

    return response.status(202).json()
  }
  async update(request,response){
    const {foods,total_price,order_status} = request.body
    const {order_id} = request.params


    const order = await knex("orders").where('id',order_id).first();

    order.foods = foods ?? order.foods
    order.total_price = total_price ?? order.total_price
    order.order_status = order_status ?? order.order_status

    await knex("orders").where('id',order_id).update({
      foods:order.foods,
      total_price:order.total_price,
      order_status:order.order_status,
      updated_at: knex.fn.now()
    })

    return response.status(201).json(order)
  }
}

module.exports = OrdersController