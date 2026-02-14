const capatinModel = require('./captain.controller')
const captainService = require('../services/captain.services');
const {validationResult} = require('express-validator');

module.exports.registercaptain = async(req,res,next) => {
     const errors = validationResult(req);
     if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array()});
     }

     const {name, email,password, vehicle} = req.body; 

    const isexistingemail = await captainModel.findOne({email});
    
    if(isexistingemail){
        return res.status(400).json({error: 'Captain already exists'});
      }
     const hashedpassword = await captainModel.hashPassword(password);

     const captain = await captainService.createCaptain({
        name,
        email,
        password: hashedpassword,
        color: vehicle.color,
        plate: vehicle.plate,
        capacity: vehicle.capacity,
        type:vehicle.vehicleType,
});
const token = captain.generateToken();

return res.status(201).json({token, user});
}