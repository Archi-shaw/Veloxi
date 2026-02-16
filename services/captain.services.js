const captainModel = require('../models/captainmodel');

module.exports.createCaptain = async ({ name, email, password, vehicle }) => {

    if (
        !name ||
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
        name,
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
