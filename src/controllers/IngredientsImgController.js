const knex = require("../database/knex")
const DiskStorage = require("../providers/DiskStorage");


class IngredientsImgController{
  async update(request,response){
    //request.user.id need to make automatic food id
    const {ingredient_id} = request.params;
    const foodImgFileName = request.file.filename;
    
    const diskStorage = new DiskStorage();
    const ingredients = await knex("ingredients").where({id:ingredient_id}).first()

      if(ingredients.ingredient_img){
        await diskStorage.deleteFile(ingredients.ingredient_img)
      }
    
    const filename = await diskStorage.saveFile(foodImgFileName);
    ingredients.ingredient_img = filename
    await knex("ingredients").update(ingredients).where({ id: ingredient_id });
    return response.json(ingredients);

  }
}

module.exports = IngredientsImgController