const userModel = require('../models/usermodel');
const jwt = require('jsonwebtoken');

module.exports.authUser = async (req, res, next) => {
        let token;
        if (req.cookies?.token) {
            token = req.cookies.token;
        } else if (req.headers.authorization?.startsWith('Bearer ')) {
            token = req.headers.authorization.split(' ')[1];
        }
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

const isBlacklisted = await userModel.findOne({ token });

if (isBlacklisted) {
    return res.status(401).json({ message: 'Unauthorized' });
}
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModel.findById(decoded._id);

        if (!user) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        req.user = user;

        next();

    } catch (err) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
};
