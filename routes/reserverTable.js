const { Router } = require("express");
const { check } = require("express-validator");
const {
    // ReserveGet,
    // reserveGetById,
    CreatePostReserve,
    // ReservePut,
    // ReserveDelete
} = require("../controllers/reserverTable");
const { validarCampos } = require("../middlewares/validar-campos");


const router = Router();

  // ---> obtener todas las reservas
// router.get("/", ReserveGet);
 // ----> obtener todas las reservas por id
// router.get("/:id", reserveGetById);
  // ----> crear reservas
router.post("/", [
  check('name', 'El campo nombre es obligatorio').not().isEmpty(),
  validarCampos ,
] , CreatePostReserve);
 // ----> actualizar reservas por id
// router.put("/:id", ReservePut);
 // ----> Eliminar reservas por id
// router.delete("/:id", ReserveDelete);


module.exports = router;
