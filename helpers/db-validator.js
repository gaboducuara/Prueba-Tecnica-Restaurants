const mongoose = require('mongoose');

const Restaurant  = require('../models/AdmonRestaurant.js');

 /// --------> Validamos si el nombre del restaurante existe
const ExistName = async ( name = '') => {
   const ExistName = await Restaurant.findOne({ name })
   if ( ExistName ) {
     throw new Error(`El Nombre: ${ name } , ya esta registrado`)
   }
 }

  /// --------> Validamos si la Descripcion del restaurante existe
const ExistDescription = async ( description = '') => {
   const ExistDescription = await Restaurant.findOne({ description })
   if ( ExistDescription ) {
     throw new Error(`La Descripcion: ${ description } , ya esta registrado`)
   }
 }

  /// --------> Validamos si la direccion del restaurante existe
const ExistAddress = async ( address = '') => {
   const ExistAddress = await Restaurant.findOne({ address })
   if ( ExistAddress ) {
     throw new Error(`La Direccion: ${ address } , ya esta registrado`)
   }
 }

  /// --------> Validamos si la ciudad existe
const ExistCity = async ( city = '') => {
    // verificar si el correo existe
   const ExistCity = await Restaurant.findOne({ city })
   if ( ExistCity ) {
     throw new Error(`La Ciudad: ${ city } , ya esta registrado`)
   }
 }

const ExistImgUrl = async ( ImgRestaurant = '') => {
 const ExistImgUrl = await Restaurant.findOne({ ImgRestaurant })
 if ( ExistImgUrl ) {
   throw new Error(`La Foto Url del restarante: ${ ImgRestaurant } , ya esta registrado`)
 }
}


const collecionesImg = ( coleccion = '' , colecciones = []) => {

  const incluida = colecciones.includes( coleccion );
  if(!incluida) {
    throw new Error(`La coleccion ${ coleccion } no es permitida, ${ colecciones }`)
  }

  return true
}

   /// --------> Validamos si el ID Existe
   const ExistId = async ( id ) => {
    // verificar si el Usuario existe
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
    ExistName,
    ExistDescription,
    ExistAddress,
    ExistCity,
    ExistId,
    // ExistImgUrl,
    collecionesImg
 }