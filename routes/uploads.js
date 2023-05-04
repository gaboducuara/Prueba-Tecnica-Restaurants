const { Router } = require('express')
const { check } = require('express-validator')

// validores de rutas
const { validarCampos } = require('../middlewares/validar-campos');
const { ValidateArchive } = require('../middlewares/validar-archive')
 // controlador de archivos
const { uploadFiles, imgActualizateCloudinary , mostrarImg} = require('../controllers/uploads');
const { collecionesImg } = require('../helpers/db-validator');


const router = Router();


router.post('/', ValidateArchive , uploadFiles )

 /// Actualizacion de imagen a los datos del restaurante
 /// --- > se debe agregar /Restaurant/:id, al endpoints
router.put('/:colleccion/:id', [
    ValidateArchive , 
    check('id' , 'El id debe ser de mongo').isMongoId(),
    check('colleccion').custom( c => collecionesImg (c , ['Restaurant']))
   , validarCampos
] , imgActualizateCloudinary)


 /// --- > se debe agregar /Restaurant/:id, al endpoints
router.get('/:colleccion/:id', [] ,
    check('id' , 'El id debe ser de mongo').isMongoId(),
    check('colleccion').custom( c => collecionesImg (c , ['Restaurant']))
,validarCampos  , mostrarImg)



module.exports = router;