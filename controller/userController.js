const express = require('express');
const router = express.Router();
const userService = require('../service/userService');
const { authenticate } = require('../service/authMiddleware');

router.post('/register', userService.register);
router.post('/login', userService.login);
router.get('/', authenticate, userService.getAll);

module.exports = router;
