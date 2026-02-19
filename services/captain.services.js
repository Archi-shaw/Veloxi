const captainModel = require('../models/captainmodel');

module.exports.createCaptain = async ({ fullName, email, password, vehicle }) => {

    if (
        !fullName ||
        !email ||
        !password ||
        !vehicle ||
        !vehicle.color ||
        !vehicle.plate ||
        !vehicle.capacity ||
        !vehicle.vehicleType
    ) {
        throw new Error('All fields are required');
    }

    const captain = await captainModel.create({
        fullName,
        email,
        password,
        vehicle: {
            color: vehicle.color,
            plate: vehicle.plate,
            capacity: vehicle.capacity,
            vehicleType: vehicle.vehicleType
        }
    });

    return captain;
};
