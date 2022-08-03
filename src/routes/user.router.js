const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
router.get('/services/getMethods', userController.getMethods);
router.get('/services/getStatics', userController.getStatics);
router.post('/users', userController.register);
router.post('/users/verifyOtp', userController.verifyOtp);
module.exports = router;