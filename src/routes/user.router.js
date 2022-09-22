const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
router.post('/users', userController.register);
router.post('/user/verifyOtp', userController.verifyOtp);
router.get('/services/getMethods', userController.getMethods);
router.get('/services/getStatics', userController.getStatics);

module.exports = router;
