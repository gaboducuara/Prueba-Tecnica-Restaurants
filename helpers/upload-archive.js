const path = require('path')
const { v4: uuidv4 } = require('uuid')

const UploadArchive = ( files , extensionValite= ["png", "jpg", "jpeg", "gif"] , file = '') => {
  return new Promise((resolve, reject) => {
    // validacion del nombre de los archivos
    const { archivo }  = files;
    const nameCut = archivo.name.split(".");
    const extension = nameCut[nameCut.length - 1];

    // Validar extension
    // const extensionValite
    if (!extensionValite.includes(extension)) {
    return reject(`La extension ${extension} no es permitida, ${extensionValite}`)
    }
    // validacion del ID de la extension
    const nameTemp = uuidv4() + "." + extension;
    const uploadPath = path.join(__dirname, "../uploads/", file , nameTemp);

    archivo.mv(uploadPath, (err) => {
      if (err) {
        reject(err);
    }
        resolve( nameTemp );
});
  });
};

module.exports = UploadArchive;
