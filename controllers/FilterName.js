// const { response } = require("express");

// const Restaurant = require('../models/AdmonRestaurant')
// const Search = require('./Search.js')

// const filtrarPorLetra = (req, res = response, next)  => {
//     const letra = req.params.termino; // Obtenemos la letra por la cual filtrar los datos
//     const dato = req.termino; // Obtenemos los datos a filtrar
  
//     const datosFiltrados = dato.filter((termino) => {
//       return termino.nombre.startsWith(letra); // Filtramos los datos que empiezan con la letra indicada
//     });
  
//     req.datos = datosFiltrados; // Actualizamos los datos en el objeto request
  
//     next(); // Continuamos con el siguiente middleware
//   }

//   module.exports = filtrarPorLetra
  