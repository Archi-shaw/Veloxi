const mongoose = require('mongoose');

async function connectToDatabase(){
   try{
        console.log("Trying to connect...");
        await mongoose.connect(process.env.MONGODB_URL);
        console.log('Connected to database');
   }
   catch(err){
        console.error('Error connecting to database:', err);
   }
}

module.exports = connectToDatabase;
