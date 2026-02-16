const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const capatinSchema = new mongoose.Schema({
     name: {
        type:String,
        required: true,
         minlength:[3, 'Name should be minimum of 3 length'],
     },
     email:{
        type:String,
        unique:true,
        lowercase:true,
        match:[/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,'Please fill a valid email address'],
        minlength:[5,'Email should be atleast of 5 characters long'],
     },
     password:{
        type:String,
        required:true,
        minlength:[6, 'Password should be of minimum length of 6'],
        select:false,
     },
     socketId:{
        type: String,
        default: '',
     },
     status: {
        type: String,
        enum:['active','inactive'],
        default: 'inactive',
    },
  vehicle:{
      color:{
        type:String,
        required:true,
        minlength:[3, 'Minimum length should be 3'],
      },
      plate:{
        type:String,
        required:true,
        minlength:[3, 'Plate must be of 3 length long'],
      },
      capacity: {
        type:Number,
        required:true,
        min: [2,'Capacity must be minimumfor 2 people'],
      },
      vehicleType:{
            type:String,
            required: true,
            enum:['Bike','Car','Auto'],
      }
  },
  location:{
      lat:{
        type:Number,
      },
      long:{
        type:Number,
      },
  },
})

capatinSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({_id: this._id}, process.env.JWT_SECRET,{expiresIn:'24h'});
    return token;
}

capatinSchema.methods.comparePassword = async function(password){
   return await bcrypt.compare(password,this.password);
}

capatinSchema.statics.hashpassword = async function(password){
      return await bcrypt.hash(password,10);
}



const capatinModel = mongoose.model('captain',capatinSchema);

module.exports = capatinModel;
