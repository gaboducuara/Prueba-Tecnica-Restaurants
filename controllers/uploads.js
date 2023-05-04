const path = require('path')
const fs = require('fs')

/// -------------> Las imagenes estan montadas en la nube de claudinary.com


const cloudinary = require('cloudinary').v2
cloudinary.config( process.env.CLOUDINARY_URL)

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


/// --------> codigo put para actualizar o cambiar imagen

const imgActualizateCloudinary = async (req, res = response) => {

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
    const nameApp = modelo.ImgRestaurant.split('/');
    const name = nameApp[nameApp.length - 1]
    const [ public_id ] = name.split('.')
    cloudinary.uploader.destroy( public_id )
    // console.log(public_id)
  }
  const { tempFilePath } = req.files.archivo
  const { secure_url} = await cloudinary.uploader.upload( tempFilePath );
  modelo.ImgRestaurant = secure_url;

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
    const pathImg = path.join( __dirname, '../assets/no-image.jpg');
    res.sendFile( pathImg );
  }

module.exports = {
  uploadFiles,
  imgActualizateCloudinary,
  mostrarImg
};
