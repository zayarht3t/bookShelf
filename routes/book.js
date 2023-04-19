const express = require('express');
const router = express.Router();
const bookController = require('../controllers/book.js');


router.post('/',bookController.createBook);
router.get('/',bookController.fetchAll);
router.put('/updateDownload/:id',bookController.updateDownload);
router.get('/pages',bookController.fetchPages);
router.get('/find/:id', bookController.fetchById);
router.get('/find',bookController.fetchByCategory);
router.get('/dates',bookController.fetchByDates);
router.get('/author',bookController.fetchByAuthor);
router.get('/name',bookController.fetchByName);
router.delete('/:id', bookController.delete);
router.put('/update/:id', bookController.update);
router.get('/popular',bookController.fetchPopular);
router.get('/count', bookController.count);

module.exports = router;