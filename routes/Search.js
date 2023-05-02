const { Router } = require('express');
const  { Search }  = require('../controllers/Search')

const router = Router();

router.get('/:colleccion/:termino', Search)

module.exports = router;