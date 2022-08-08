//invocamos las dependencias necesarias
const jwtSimple = require('jwt-simple');
const moment = require('moment');
const config = require('../database/config');


const ensureAuth = async (req, res, next) => {
    //Comprobamos si existe la cabecera de autenticación
    if (!req.headers.authorization) {
        return res.status(403).send({ message: "No existe una cabecera de autenticación" });
    }
    //recogemos el token de la cabecera. Partimos el string porque viene con la palabra Bearer 
    let token = req.headers.authorization.split(" ")[1];
    let payload;
    try {
        //Comprobamos que el token coincide
        payload = await jwtSimple.decode(token, config.secret);
        //Comprobamos que el token no ha expirado 
        if (payload.exp <= moment.unix()) {
            return res.status(401).send({ message: 'Tu conexión ha expirado, ¡Vuelve a hacer iniciar sesión!' });
        }
    } catch (e) {
        return res.status(500).send({ message: "Ha ocurrido un error: " + e.message });
    }
    //asignamos el payload el usuario de la peticion
    req.user = payload;
    //Usamos next() para seguir el curso de la aplicación
    next();
}

module.exports = { ensureAuth }
