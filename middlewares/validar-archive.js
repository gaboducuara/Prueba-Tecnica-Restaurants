const { response } = require('express')

const ValidateArchive = (req , res = response , next) => {
        // validacion de los archivos
  if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
    return res.status(400).json({msg:'No hay archivos a subir - ValidateArchive'});
  }

  next();

}

module.exports = {
    ValidateArchive
}
