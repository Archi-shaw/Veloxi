const express = require('express');
const router = express.Router();
const { body } = require("express-validator");
const captainController = require('../controllers/captain.controller')

router.post('/register',[
     body('name').isLength({min: 3}).withMessage('Name must be 3 characters long'),
     body('email').isEmail().withMessage('Invalid Email'),
     body('password').isLength({min:6}).withMessage('Password must be 3 length long'),
     body('vehicle.color').isLength({ min: 3}).withMessage('Colors must be of 3 characters long'),
     body('vehicle.plate').isLength({min:3}).withMessage('PLate must be 3 characters long'),
     body('vehicle.capacity').isInt({ min: 2}).withMessage('Capacity must be minimum for 2 person'),
     body('vehicle.type').isIn(['Car', 'Bike', 'Auto']).withMessage('Invalid type'),
],
captainController.registercaptain)

module.exports = router;