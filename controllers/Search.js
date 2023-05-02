const mongoose = require('mongoose')
const { response, request } = require("express");

//importacion que trae las funciones de mongo
const { ObjectId } = require('mongoose').Types

const Restaurant = require("../models/AdmonRestaurant");

const coleccionesPermitidas = [
    'Restaurant',
];

const SearchRestaurant = async (termino = '' , res = response ) => {
    const esMongoId = ObjectId.isValid(termino);

    if (esMongoId) {
        // const SearchRestaurant = await Restaurant.find({_id: termino , state: true})
        const SearchRestaurants = await Restaurant.findById( termino );
        return res.json({
            results: ( SearchRestaurants ) ? [ SearchRestaurants ] : []
        })
    }

    // Busqueda sensible con el Metodo de expresion regular

    // const MatchName = async (termino = "" , res = response) => {
    //     const esMongoId = ObjectId.isValid(termino);
    // }
    
// const nombre = "Juan";
// const primeraLetra = nombre.match(/\b\w/g).join(""));
// console.log(primeraLetra); // Output: J

    // const regexa = new RegExp (termino, 'g')
    // const result = regexa.match(termino)
    // const regexa = new (termino , 'g')
    // , (/[a-z]+/gi)
    // / la cadena de texto
    // var texto = "Mi teléfono es 972.555555";
    // // el patrón de busqueda
    // var telRex = /(\d{3})[-.](\d{6})/;
    
    // console.log(
        //     texto.match(telRex)
        //   );
    const regex = new RegExp(termino , 'i')
    // const regexa = 


    const SearchRestaurant = await Restaurant.find({
        $or: [{name:regex} , {city: regex}],
        $and: [{state: true}]
    });

    return res.json({ 
        results: SearchRestaurant 
    })
}

    const Search = (req , res = response ) => {

    const {colleccion , termino} = req.params

    if(!coleccionesPermitidas.includes(colleccion)) {
        return res.status(400).json({
            msg:`Las colecciones permitidas son: ${coleccionesPermitidas}`
        })
    }

    switch (colleccion){
        case 'Restaurant':
            SearchRestaurant(termino , res)
        break;
    //     case 'category':
    //         buscarCategory(termino , res)
    //     break;
    //     case 'product':
    //         buscarProduct(termino , res)
    // break;

    default:
        res.status(500).json({
            msg: 'Se le olvido hacer esta busqueda'
        })
    }
}

module.exports = {
    Search
}