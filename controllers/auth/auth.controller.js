const validator = require('validator');
const jwt = require('jsonwebtoken');
const config = require('../../database/config');
const User = require('../../models/user/user');
const Bit = require('../../controllers/bitacora/bitacora.controller');

//nuevo usuario
const signUp = async (req, res) => {
    // capture data 
    const { rol } = req.user;
    const { usernameLogin } = req.user;
    const userFound = {
        nombres: req.user.nombres,
        apellidos: req.user.apellidos,
        username: usernameLogin,
        correo: req.user.correo,
        rol: req.user.rol
    };

    if (rol === "admin") {
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
            const lenghtPass = password.length;
            //validate password
            if (lenghtPass >= 6) {
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
                    userCreacion: usernameLogin,
                    userModificacion: null,
                    userAnulacion: null,
                    fechaAnulacion: null,
                });

                const savedUser = await newUser.save();

                //bitácora
                const accion = "Usuario: " + savedUser.username + " Agregado";
                const BitNuevo = await Bit.add(userFound, accion);

                // Response success
                const token = jwt.sign({ id: savedUser._id, username: savedUser.username, bitStatus: BitNuevo.status, bitMessage: BitNuevo.message }, config.secret, {
                    expiresIn: 86400 // 24 Hours
                });

                res.status(201).json({ message: '¡Usuario agregado correctamente!', token });
            } else {
                // Return error
                res.status(400).json({ message: '¡la contraseña debe ser de al menos 6 caracteres!' });
            }

        } else {
            // Return error
            res.status(200).json({ message: '¡Datos incorrectos!' });
        }
    } else {
        // Return error
        res.status(200).json({ message: '¡Este usuario no posee permisos para agregar usuarios!' });
    }

}

//login
const signIn = async (req, res) => {

    const { correo, password } = req.body;
    const userFound = await User.findOne({ 'correo': correo, 'isActive': true });

    // Incorrect data
    if (!userFound) return res.status(200).json({ message: '¡Usuario no encontrado!' });

    const matchPassword = await User.comparePassword(password, userFound.password);

    if (!matchPassword) return res.status(401).json({ message: '¡Contraseña inválida!' });

    //bitácora
    const accion = "Login";
    const BitLogin = await Bit.add(userFound, accion);

    const token = jwt.sign({ id: userFound._id, nombres: userFound.nombres, apellidos: userFound.apellidos, usernameLogin: userFound.username, correo: userFound.correo, rol: userFound.rol }, config.secret, {
        expiresIn: 86400 // 24 Hours
    });

    res.status(200).json({ token, imagen: userFound.imagen, bitStatus: BitLogin.status, bitMessage: BitLogin.message });
}

module.exports = {
    signUp,
    signIn
}
