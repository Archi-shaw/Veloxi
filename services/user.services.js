const UserModel = require('../models/usermodel');

module.exports.createUser = async({
      fullName,
      email,
      password
})  => {
    if(!fullName|| !email || !password){
        throw new Error('All fields are required');
    }
    const user = UserModel.create({
        fullName,
        email,
        password
    })
    return user;
}