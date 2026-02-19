const captainModel = require('../models/captainmodel');
const captainService = require('../services/captain.services');
const {validationResult} = require('express-validator');
const blacklistModel = require('../models/blacklistokenmodel')

module.exports.registercaptain = async (req, res, next) => {
   try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { fullName, email, password, vehicle } = req.body;

    const isexistingemail = await captainModel.findOne({ email });

    if (isexistingemail) {
        return res.status(400).json({ error: 'Captain already exists' });
    }

    const hashedpassword = await captainModel.hashpassword(password);

    const captain = await captainService.createCaptain({
        fullName,
        email,
        password: hashedpassword,
        vehicle  
    });

const token = captain.generateAuthToken();

    return res.status(201).json({
        token,
        captain   
    });
   } catch(err){
      return res.status(500).json({message: err.message});
   }
};


module.exports.loginCaptain = async(req,res,next) => {
      const errors = validationResult(req);
      if(!errors.isEmpty()){
         return res.status(400).json({errors: errors.array()});
      }
      const {email, password} = req.body;
      const existinguser = await captainModel.findOne({email}).select('+password');
      if(!existinguser){
         return res.status(400).json({message: "Invalid email or password"});
      }
      const isMatch = await existinguser.comparePassword(password);
      if(!isMatch){
         return res.status(400).json({message: "Invalid email or password"});
      }
      const token = existinguser.generateAuthToken();
      res.cookie('token',token);
      return res.status(200).json({message: "Login successful", token, captain: existinguser});
}

module.exports.getProfile = async(req,res,next) => {
    return res.status(200).json({ captain: req.captain });
}

module.exports.logoutCaptain = async(req,res, next) => {
   const token =
  req.cookies.token ||
  (req.headers.authorization &&
   req.headers.authorization.split(" ")[1]);

if (!token) {
  return res.status(400).json({ message: "No token provided" });
}
   await blacklistModel.create({ token});

   res.clearCookie('token');

   return res.status(200).json({message: "Logout Successfully"});
}