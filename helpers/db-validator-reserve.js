const mongoose = require('mongoose');

const Reserve  = require('../models/reserverTable');

 /// --------> Validamos si el nombre de la reserva existe
 const ExistNameReserve = async ( name = '') => {
    const ExistName = await Reserve.findOne({ name })
    if ( ExistName ) {
      throw new Error(`El Nombre: ${ name } , ya esta registrado`)
    }
 }


/// -----> validamos si el id existe
const ExistId = async ( id ) => {
        // verificar si la reserva existe
       if ( mongoose.Types.ObjectId.isValid (id)) {
         const existeId = await Restaurant.findById ( id )
    
         if ( !existeId ) {
          throw new Error(`El Id ${ id } no existe en la base de datos `)
       }   
       } else {
        throw new Error(`El Id ${ id } no es valido`)
       }
  }
 
  module.exports = {
    ExistNameReserve,
    ExistId 
  }