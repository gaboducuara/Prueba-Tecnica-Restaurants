const { Router } = require("express");
const { check } = require("express-validator");
const {
    RestaurantGet,
    RestaurantGetById,
    CreatePostRestaurant,
    RestaurantPut,
    RestaurantDelete
} = require('../controllers/AdmonRestaurant')

// middlewares
const { validarCampos } = require('../middlewares/validar-campos');
/// -------> DB - Validators
const { ExistName , ExistAddress , ExistCity , ExistDescription , ExistId } = require("../helpers/db-validator");

const router = Router();

// TRAER U OBTENER TODOS LOS RESTAURANTES
router.get("/", RestaurantGet);

// TRAER RESTAURANTE POR ID
router.get('/:id', [
    check('id','No es un Id valido').isMongoId().custom( ExistId ),
    validarCampos
] , RestaurantGetById)

// Creacion de restaurante sin IMAGEN POR QUE SE DEBE AGREGAR IMAGEN Y PARA ESO SE CREO SU PROPIO ENDPOIN
router.post("/", [
    check('name', 'El campo nombre es obligatorio').not().isEmpty().custom( ExistName ),
    check('description', 'El campo descripcion es obligatorio').not().isEmpty().custom( ExistDescription ),
    check('address', 'El campo Direccion es obligatorio').not().isEmpty().custom( ExistAddress ),
    check('city', 'El campo Ciudad es obligatorio').not().isEmpty().custom( ExistCity ),
    validarCampos,
] , CreatePostRestaurant);

// Actualizacion de datos de restaurante
router.put("/:id", [
    check('id','No es un Id valido').isMongoId().custom( ExistId ),
    check('name', 'El campo nombre es obligatorio').not().isEmpty().custom( ExistName ),
    check('description', 'El campo descripcion es obligatorio').not().isEmpty().custom( ExistDescription ),
    check('address', 'El campo Direccion es obligatorio').not().isEmpty().custom( ExistAddress ),
    check('city', 'El campo Ciudad es obligatorio').not().isEmpty().custom( ExistCity ),
    validarCampos, ] , RestaurantPut);

// Actualizar a status false 
router.delete("/:id", [
    check('id','No es un Id valido').isMongoId().custom( ExistId ),
    validarCampos, ] , RestaurantDelete);

module.exports = router;