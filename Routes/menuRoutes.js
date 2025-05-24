const express = require('express');
const router = express.Router();
const {getAllMenu, postMenuItem, deleteMenuItem, getSingleMenuItem, updateMenuItem} = require('../controllers/menuController');



//get all menu
router.get('/', getAllMenu);

// postMenu by an admin
router.post('/', postMenuItem);

//delete menu item
router.delete('/:id', deleteMenuItem);

// getSingleMenu

router.get('/:id', getSingleMenuItem);

//update menu item
router.patch('/:id', updateMenuItem);



module.exports = router;