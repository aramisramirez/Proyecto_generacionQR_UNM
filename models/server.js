const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const pkg = require('../package.json');
const { dbConnection } = require('../database/config');


class Server {

    constructor() {
        this.app = express();
        this.app.use(express.json())
        this.port = process.env.PORT;
        // Route default
        this.app.get('/info', (req, res) => {
            res.json({
                name: pkg.name,
                description: pkg.description,
                version: pkg.version,
            });
        });
        // Index routes
        this.app.use('/api', require('../routes'));


        // this.app.use(express.json());
        // this.app.use(express.urlencoded({ extended: false }));
        // this.app.use(morgan('dev'));

        // Conectar a base de datos
        this.conectarDB();
    }

    async conectarDB() {
        await dbConnection();
    }


    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en puerto', this.port);
        });
    }

}




module.exports = Server;
