const path = require('path')
const { v4: uuidv4 } = require('uuid')

const { response } = require("express");

const uploadFiles = (req, res = response) => {

    // validacion de los archivos
  if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
    res.status(400).json({msg:'No hay archivos que subir.'});
    return;
  }

  // validacion del nombre de los archivos
    const { archivo } = req.files;
    const nameCut = archivo.name.split('.');
    const extension = nameCut[nameCut.length -1];

    // Validar extension
    const extensionValite = ['png' , 'jpg' , 'jpeg' , 'gif'];
    if(!extensionValite.includes(extension)) {
        return res.status(400).json ({
            msg: `La extension ${ extension} no es permitida, ${extensionValite}`
        }); 
    };
        // validacion del ID de la extension 
    const nameTemp = uuidv4() + '.' + extension;
    const uploadPath = path.join( __dirname , '../uploads' , nameTemp );

    archivo.mv(uploadPath, (err) => {
        if(err) {
            return res.status(500).json({ err })
        }
        res.json({ msg: 'File upload to ' + uploadPath });
    });
}
module.exports = {
  uploadFiles
}
