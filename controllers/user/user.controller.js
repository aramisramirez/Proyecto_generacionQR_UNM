
const User = require('../../models/user/user');
const jwt = require('jsonwebtoken');
const config = require('../../database/config');



const getUsers = async (req, res) => {
    // capture data 
    const { rol } = req.user;
    if (rol === "admin") {

        try {
            let users = await User.find({ isActive: true }, { password: 0 });
            if (!users.length) {
                message = 'No existen registros';
            }
            const token = jwt.sign({ users }, config.secret, {
                expiresIn: 86400 // 24 Hours
            });

            return res.status(200).json({ token });
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






module.exports = { getUsers }

