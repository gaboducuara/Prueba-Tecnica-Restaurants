const { Router } = require('express');
const  { Search }  = require('../controllers/Search')

// middlewares
const { validarCampos } = require('../middlewares/validar-campos');
/// -------> DB - Validators
const { ExistName } = require("../helpers/db-validator");
const { check } = require('express-validator');

const router = Router();

// ---- BUSCAR UN restaurante por ID y nombre
router.get('/:colleccion/:termino', [
    check('name', 'El campo nombre es obligatorio').not().isEmpty().custom( ExistName ),
    validarCampos,
] , Search)

module.exports = router;