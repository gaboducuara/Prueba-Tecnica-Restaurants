const { Router } = require('express');
const  { Search }  = require('../controllers/Search')

const router = Router();

// ---- BUSCAR UN restaurante por ID y nombre

router.get('/:colleccion/:termino', Search)

module.exports = router;