const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const userController = require('../controllers/user.controller');
const authMiddleware = require('../middleware/auth');

router.post('/register', [
    body('fullName.first_name')
  .isLength({ min: 3 })
  .withMessage('First name must be at least 3 characters long'),

body('fullName.last_name')
  .isLength({ min: 3 })
  .withMessage('Last name must be at least 3 characters long'),


    body('email')
        .isEmail()
        .withMessage('Please provide a valid email'),

    body('password')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters long')
],
userController.registerUser);

router.post('/login', [
    body('email')
        .isEmail()
        .withMessage('Please provide a valid email address'),

    body('password')
        .isLength({ min: 6 })
        .withMessage('Password must be atleast 6 characters long'),
],
userController.loginUser);

router.get(
    '/profile',
    authMiddleware.authUser,
    userController.getUserProfile
);

module.exports = router;
