const User = require('../models/user/user');

const checkDuplicateEmail = async (req, res, next) => {

    const user = await User.findOne({ email: req.body.email });

    if (user) return res.status(400).json({ message: '¡Este usuario ya existe!' });

    next();
}

module.exports = {
    checkDuplicateEmail
}
