
const User = require('../../models/user/user');
const jwt = require('jsonwebtoken');
const config = require('../../database/config');
const validator = require('validator');



const getUsers = async (req, res) => {
    // capture data 
    const { rol } = req.user;
    if (rol === "admin") {

        try {
            let users = await User.find({ isActive: true }, { password: 0 });
            if (!users.length) {
                message = 'No existen registros';
            }
            return res.status(200).json({ users });
        }
        catch (e) {
            return res.status(500).json({
                message: '¡Ocurrió un error!'
            });
        }

    } else {
        // Return error
        res.status(200).json({ message: '¡Este usuario no posee permisos para listar usuarios!' });
    }
}

const updatePassword = async (req, res) => {
    const id = req.params.id;
    const params = req.body;
    // array of validation
    const validate = [
        !validator.isEmpty(params.password)

    ];

    const passEncrypt = await User.encryptPassword(params.password);
    // validate array data and if there is incorrect data return
    if (validate.every(v => v === true)) {
        // If the data is correct, proceed to update the information
        User.findOneAndUpdate({ _id: id, isActive: true }, { password: passEncrypt }, { new: true }, (err, userUp) => {
            if (err) return res.status(404).json({ message: '¡El usuario no existe!' });
            if (!userUp) return res.status(404).json({ message: '¡El usuario no existe!' });
            const token = jwt.sign({ user: userUp.username }, config.secret, {
                expiresIn: 86400 // 24 Hours
            });
            return res.status(200).json({ message: '¡Contraseña actualizada!', token });
        });
    } else {
        // return incorrect data
        res.status(200).json({ message: '¡Datos incorrectos!' });
    }

}

const updateStatus = async (req, res) => {
    const id = req.params.id;
    // capture data 
    const { rol } = req.user;
    if (rol === "admin") {
        User.findOneAndUpdate({ _id: id, isActive: true }, { isActive: false }, { new: true }, (err, userUp) => {
            if (err) return res.status(404).json({ message: '¡Ocurrió un error!' });
            if (!userUp) return res.status(404).json({ message: '¡El usuario no existe!' });
            const token = jwt.sign({ user: userUp.username }, config.secret, {
                expiresIn: 86400 // 24 Hours
            });
            return res.status(200).json({ message: '¡Estado actualizado!', token });
        });
    } else {
        // Return error
        res.status(200).json({ message: '¡Este usuario no posee permisos para editar estado de usuarios!' });
    }

}


module.exports = { getUsers, updatePassword, updateStatus }

