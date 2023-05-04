const mongoose = require('mongoose')
const { response, request } = require("express");

const Reserve = require("../models/reserverTable");
const { body } = require('express-validator');

//  Obtener todas las Reservas
const ReserveGet = async (req = request, res = response) => {
    // const { page = 1, limit = 10, q, nombre = 'not name', apikey} = req.query;
    const { limite = 15 , desde = 0 } = req.query;
    const query = { state:true };
    // const {id, name, apellido, comentario} = req.body
  const [total , reserverTable] = await Promise.all
  // console.log(user)
  ([
    Reserve.countDocuments(query),
    Reserve.find(query)
        .populate('Restaurant' , 'name')
        .skip(Number( desde ))
        .limit(Number(limite))
  ])
// console.log(user)
    res.json({
      msg: "get categoria - controlador",
      total , reserverTable
    });
};
                          // Obtener Reservas por ID
const reserveGetById = async (req = request, res = response) => {
    const { id } = req.params;
    const ReserveId = await Reserve.findById( id )
        .populate('Restaurant' , 'name');
    res.json( ReserveId )
    
};
                          // Crear Reservas
const CreatePostReserve = async (req = request, res = response) => {
  // const {state,  name , ...body} = req.body}
  const name = req.body.name
  const ReserveDB = await Reserve.findOne({ name });

  if (ReserveDB) {
    return res.status(400).json({
      msg: `La Reserva ${ReserveDB.name} , ya existe`,
    });
  }
  //Generar la Data a guardar
  const dataApp = {
    name, 
    restaurant: req.Restaurant._id
};
  
  const DataReserve = new Reserve(dataApp);
  //GuardarDB
  await DataReserve.save();

  res.status(201).json(DataReserve);
};
                          // actualizar Reserva
const ReservePut = async (req = request, res = response) => {
    const {id} = req.params
    const { state, Restaurant, ...data} = req.body;

    data.name = data.name.toUpperCase();
    data.Restaurant = req.Restaurant._id;

    const Reserva = await Reserve.findByIdAndUpdate(id, data, {new: true});
    res.json(Reserva);
  };
// Eliminar Reservas
const ReserveDelete = async (req = request, res = response) => {
    const { id } = req.params;

    // state category to false
    const ReserveDelete = await Reserve.findByIdAndUpdate( id , {state: false} , {new: true});
    res.json( ReserveDelete );
};

module.exports = {
    // ReserveGet,
    // reserveGetById,
    CreatePostReserve,
    // ReservePut,
    // ReserveDelete
};
