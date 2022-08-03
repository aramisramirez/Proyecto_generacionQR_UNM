const express = require('express');
const cors = require('cors');

const { dbConnection } = require('../database/config');

class Server {

    constructor() {
        this.app  = express();
        this.port = process.env.PORT;
        // this.usuariosPath = '/api/usuarios';

        // Conectar a base de datos
        this.conectarDB();
    }

    async conectarDB() {
        await dbConnection();
    }


    listen() {
        this.app.listen( this.port, () => {
            console.log('Servidor corriendo en puerto', this.port );
        });
    }

}




module.exports = Server;
