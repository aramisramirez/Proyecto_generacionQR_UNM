const User = require('../models/user/user');

const checkDuplicateEmail = async (req, res, next) => {

    const user = await User.findOne({ correo: req.body.correo, isActive: true });

    if (user) return res.status(400).json({ message: '¡Este usuario ya existe!' });

    next();
}

const checkDuplicateUsername = async (req, res, next) => {

    const user = await User.findOne({ username: req.body.username, isActive: true });

    if (user) return res.status(400).json({ message: '¡Este nombre de usuario ya existe!' });

    next();
}


module.exports = { checkDuplicateEmail, checkDuplicateUsername }

