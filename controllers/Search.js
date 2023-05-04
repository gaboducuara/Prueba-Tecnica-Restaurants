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
    const regex = new RegExp(termino , 'i')
 
    const SearchRestaurant = await Restaurant.find({
        $or: [{name:regex} , {city: regex}],
        $and: [{state: true}]
    });

    return res.json({ 
        results: SearchRestaurant 
    })
}

 // --- BUSCAR RESTAURANTE POR TERMINO Y ID, NOMBRE

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
    default:
        res.status(500).json({
            msg: 'Se le olvido hacer esta busqueda'
        })
    }
}

module.exports = {
    Search
}