const capatinModel = require('../models/captainmodel');

module.exports.createCaptain = async({name,email,password,color,plate,capacity,vehicleType})=> {
     if(!name || !email|| !password || !color || !plate || !capacity || !vehicleType){
        throw new Error('All feilds are required');
     }
     const captain = capatinModel.create({
        name,
        email,
        password,
        vehicle:{
            color,
            plate,
            capacity,
            vehicleType
        }
     })
     return captain;
}