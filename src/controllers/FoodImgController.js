const knex = require("../database/knex")
const DiskStorage = require("../providers/DiskStorage");


class FoodImgController{
  async update(request,response){

    const {food_id} = request.params;
    const foodImgFileName = request.file.filename;
    
    const diskStorage = new DiskStorage();
    const foods = await knex("foods").where({id:food_id}).first()

    if(foods.food_img){
      await diskStorage.deleteFile(foods.food_img)
    }

    const filename = await diskStorage.saveFile(foodImgFileName);
    foods.food_img = filename
    await knex("foods").update(foods).where({ id: food_id });
    return response.json(foods);
  }
}

module.exports = FoodImgController