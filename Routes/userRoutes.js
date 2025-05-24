const express = require('express');
const router = express.Router();
const  userController = require('../controllers/userController');
const verifyJWT = require('../middleware/verifyToken');
const verifyAdmin = require('../middleware/verifyAdmin');


router.get('/',verifyJWT, userController.getAllUsers);

router.post('/', userController.createUser);

router.post('/login', userController.loginUser);

router.delete('/:id', verifyJWT, verifyAdmin, userController.deleteUser);


//checking if a user is an admin
router.get('/admin/:email',verifyJWT,  userController.getAdmin);

router.patch('/admin/:id', verifyJWT,verifyAdmin, userController.makeAdmin);



module.exports = router;