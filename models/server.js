const express = require("express");
const cors = require("cors");
const fileUpload = require('express-fileupload')

const { dbConnection } = require("../database/config.js");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    //Rutas disponibles e existentes en la aplicacion
    this.paths = {
      AdmonRestaurant     :'/api/AdmonRestaurant',
      Search              :'/api/Search',
      UploadImg            :'/api/UploadImg',
      reserverTable        :'/api/reserve'         
    }
 
    this.connectDB()
    //Middlewares ---> siempre se ejecutara cuando levantemos nuestro servidor;
    this.middlewares();
    //Rutas de mi aplicacion
    this.routes();
  }

  async connectDB() {
    await dbConnection()
  }

  middlewares() {
    //CORS
    this.app.use(cors());
    // parseo y lectura del body, cualquier informacion que venga con POST, PUT, PATCH, DELETE .. la intenta serializar en formato JSON
    this.app.use(express.json())
    //Directorio publicos
    this.app.use(express.static("public"))

    // Carga de archivo
    this.app.use(fileUpload({
      useTempFiles: true,
      TempFileDir :'/tmp/',
      createParentPath: true
    }));
  }

  routes() {
    this.app.use( this.paths.AdmonRestaurant, require('../routes/AdmonRestaurant.js'));
    this.app.use( this.paths.Search, require('../routes/Search.js'))
    this.app.use( this.paths.UploadImg, require('../routes/uploads.js'))
    this.app.use( this.paths.reserverTable, require('../routes/reserverTable.js'))
  };

  listen() {
    this.app.listen(this.port, () => {
      console.log("servidor corriendo en el puerto", this.port);
    });
  }
}

module.exports = Server;
