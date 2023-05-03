const path = require('path')
const fs = require('fs')
const { response } = require("express");
const UploadArchive = require("../helpers/upload-archive");

const Restaurant = require("../models/AdmonRestaurant");

// cargando archivos al path
const uploadFiles = async (req, res = response) => {
  try {
    const nameArchive = await UploadArchive(req.files, undefined, "imgs");
    res.json({ nameArchive });
  } catch (msg) {
    res.status(400).json({ msg });
  }
};

const imgActualizate = async (req, res = response) => {

  const { id, colleccion } = req.params;

  let modelo;

  switch (colleccion) {
    case "Restaurant":
      modelo = await Restaurant.findById(id);
      if (!modelo) {
        return res.status(400).json({
          msg: `No existe un Restaurante con el id ${id}`,
        });
      }
      break;

    default:
      return res.status(500).json({ msg: "Se me olvido validar esto" });
  }

  if(modelo.ImgRestaurant) {
    const pathImg = path.join( __dirname, '../uploads' , colleccion, modelo.ImgRestaurant);
    if(fs.existsSync( pathImg )) {
      fs.unlinkSync ( pathImg );
    }
  }

  const nameArchive = await UploadArchive(req.files, undefined, colleccion);
  modelo.ImgRestaurant = nameArchive;

  await modelo.save();

  res.json(modelo);
};


const mostrarImg = async(req , res = response ) => {
  const { id, colleccion } = req.params;

  let modelo;

  switch (colleccion) {
    case "Restaurant":
      modelo = await Restaurant.findById(id);
      if (!modelo) {
        return res.status(400).json({
          msg: `No existe un Restaurante con el id ${id}`,
        });
      }
      break;

    default:
      return res.status(500).json({ msg: "Se me olvido validar esto" });
  }


  // Limpiar imagenes !
  if(modelo.ImgRestaurant) {
    // Borrar la imagen del servidor
    const pathImg = path.join( __dirname, '../uploads' , colleccion, modelo.ImgRestaurant);
    if(fs.existsSync( pathImg )) {
      return  res.sendFile( pathImg )
    }
  }
    res.json({ msg:'falta placeholder'})
}

module.exports = {
  uploadFiles,
  imgActualizate,
  mostrarImg
};
