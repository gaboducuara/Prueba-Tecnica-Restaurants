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

router.put('/:colleccion/:id', [
    ValidateArchive , 
    check('id' , 'El id debe ser de mongo').isMongoId(),
    check('colleccion').custom( c => collecionesImg (c , ['Restaurant']))
   , validarCampos
] , imgActualizateCloudinary)

router.get('/:colleccion/:id', [] ,
    check('id' , 'El id debe ser de mongo').isMongoId(),
    check('colleccion').custom( c => collecionesImg (c , ['Restaurant']))
,validarCampos , mostrarImg)



module.exports = router;