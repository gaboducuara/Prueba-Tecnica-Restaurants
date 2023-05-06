const { Router } = require('express');
const  { Search }  = require('../controllers/Search')

// middlewares
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

// ---- BUSCAR UN restaurante por ID y nombre
router.get('/:colleccion/:termino', [
    validarCampos,
] , Search)

module.exports = router;