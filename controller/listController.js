const express = require('express');
const router = express.Router();
const listService = require('../service/listService');


router.get('/', listService.getAllLists);
router.post('/item', listService.addItem);
router.patch('/item/:id/buy', listService.markAsBought);
router.delete('/item/:id', listService.deleteItem);

module.exports = router;
