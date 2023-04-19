const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user.js');
const {verifyToken} = require('../utils/verifyToken.js');

router.get('/:id',UserController.fetch);
router.put('/addToFavourites/:id',verifyToken,UserController.addFavourite);
// router.put('/popFromFavourites/:id',verifyToken,UserController.popFromFavourites);
router.get('/getFavourites/:id',verifyToken,UserController.getFavoriteBooks);

module.exports = router;