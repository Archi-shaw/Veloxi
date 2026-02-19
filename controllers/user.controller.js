const { validationResult } = require('express-validator');
const UserModel = require('../models/usermodel');
const userService = require('../services/user.services');
const blacklistTokenModel = require('../models/blacklistokenmodel')

module.exports.registerUser = async(req, res,next) => {
    try{
         const errors = validationResult(req);
         if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()});
         }
        const {fullName, email, password} = req.body;

        const existinguser = await UserModel.findOne({email});
        if(existinguser){
            return res.status(400).json({message: 'User already exists'});
        }
        const hashedpassword = await UserModel.hashPassword(password);


const newuser = await userService.createUser({
    fullName,
    email,
    password: hashedpassword
});

        const token = newuser.generateAuthToken();
        res.cookie('token', token);
        res.status(201).json({token,newuser});
    }
    catch(err){
        next(err);
    }
}

module.exports.loginUser = async(req,res,next) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()})
        }
        const {email, password} = req.body;
        const existingUser = await UserModel.findOne({email}).select('+password'); 
        if(!existingUser){
            return res.status(400).json({ message: 'Invalid email or password'});
        }
        const isMatch = await existingUser.comparePassword(password);
        if(!isMatch){
            return res.status(400).json({message: 'Invalid password or email'});
        }
        const token = existingUser.generateAuthToken();
        return res.status(200).json({token,existingUser});
}

module.exports.getUserProfile = async(req,res,next) => {
    return res.status(201).json(req.user);
}

module.exports.logoutuser = async(req,res,next) => {
    res.clearCookie('token');
    const token = req.cookies.token || req.headers.authorization.split(" ")[1];

    await blacklistTokenModel.create({ token });
    res.status(200).json({ message: "Logging out"});
}