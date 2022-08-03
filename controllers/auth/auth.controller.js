const validator = require('validator');
const jwt = require('jsonwebtoken');
const config = require('../../database/config');
const User = require('../../models/user/user');

const signUp = async (req, res) => {
    // capture data 
    const { nombres, apellidos, username, correo, password, rol } = req.body;

    // array of validation
    const validate = [
        !validator.isEmpty(nombres),
        !validator.isEmpty(apellidos),
        !validator.isEmpty(username),
        !validator.isEmpty(correo),
        !validator.isEmpty(password),
        !validator.isEmpty(rol),
    ];
    // validate array data and if there is incorrect data return
    if (validate.every(v => v === true)) {
        // Create the object
        const newUser = new User({
            nombres,
            apellidos,
            username,
            correo,
            password: await User.encryptPassword(password),
            rol,
            isActive: true,
            imagen: 'ejemplo',
            userCreacion: 'camaradiaga',
            userModificacion: null,
            userAnulacion: null,
            fechaAnulacion: null,
        });

        const savedUser = await newUser.save();
        // // Response success
        const token = jwt.sign({ id: savedUser._id, username: savedUser.username }, config.secret, {
            expiresIn: 86400 // 24 Hours
        });

        res.status(201).json(token);
    } else {
        // Return error
        res.status(200).json({ message: '¡Datos incorrectos!' });
    }
}


const signIn = async (req, res) => {

    const { email, password } = req.body;
    const userFound = await User.findOne({ 'email': email, 'status': true }).populate("idRole");

    // Incorrect data
    if (!userFound) return res.status(200).json({ message: 'User not found' });

    const matchPassword = await User.comparePassword(password, userFound.password);

    if (!matchPassword) return res.status(401).json({ message: 'Invalid password' });

    const token = jwt.sign({ id: userFound._id }, config.SECRET, {
        expiresIn: 86400 // 24 Hours
    });

    res.status(200).json({ token });
}

module.exports = {
    signUp,
    signIn
}
