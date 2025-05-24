const asyncHandler = require("express-async-handler");
const Menu = require("../model/menuModel");




const getAllMenu = asyncHandler(async (req, res) => {
    try {
      // const menus = await Menu.find({});
      const menus = await Menu.find().sort({ createdAt: -1 });
      res.status(200).json(menus);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });


  // admin can add menu

  const postMenuItem = async (req, res)=>{
    const newItem = req.body;
    try{
      const result = await Menu.create(newItem)
      res.status(200).json(result);

    }catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  //delete menu
  const deleteMenuItem = async (req, res) => {
    const menuItemId = req.params.id;
    try {
      const result = await Menu.findByIdAndDelete(menuItemId);
      if(!result) {
        return res.status(404).json({ message: "menu item not found" });
      }
      res.status(200).json({message: "menu item deleted successfully"});
    } catch (error) {
      res.status(500).json({ message: error.message });
      
    }
  }

 // get single menu

 const getSingleMenuItem = async (req, res)=>{
  const menuId = req.params.id;
  try{
    const menu = await Menu.findById(menuId);
    res.status(200).json(menu)
  }
  catch(error){
    res.status(500).json({ message: error.message });
  }
 }

//  update a single menu
const updateMenuItem = async (req, res)=>{
  const menuId = req.params.id;
  const { name, recipe, image, price, category } = req.body;
  try {
      const result = await Menu.findByIdAndUpdate(menuId, { name, recipe, image, price, category }, { new: true, runValidators: true});
      if(!result) {
        return  res.status(404).json({ message: "menu item not found" });
      }
      res.status(200).json(result);
  } catch (error) {
      res.status(500).json({ message: error.message });
      
  }
}



module.exports = {
  getAllMenu,
  postMenuItem,
  deleteMenuItem,
  getSingleMenuItem,
  updateMenuItem

}