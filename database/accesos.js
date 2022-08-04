

db.accesosRol.insertMany([
    {
        "name": "full",
        "pantallaAcceso": [
            "reportes",
            "generacionQR"
        ]
    },
    {
        "name": "parcial",
        "pantallaAcceso": [
            "generacionQR"
        ]
    }]);