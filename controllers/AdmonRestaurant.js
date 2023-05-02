const mongoose = require('mongoose')
const { response , request} = require('express');

// ------> modelo restaurante
const  Restaurant = require("../models/AdmonRestaurant.js");
const { body } = require('express-validator');

// ------> obtener lista de restaurantes
const RestaurantGet = async (req = request, res = response) => {
  const { limite = 30 , desde = 0 } = req.query;
  const query = {state:true}

  const getRestaurant =  await Promise.all([
    Restaurant.countDocuments(query),
    Restaurant.find(query)
        .skip(Number( desde ))
        .limit(Number(limite))
  ])

  res.status(200).json({
    msg: "get Restaurante - controlador",
    getRestaurant
  })
};

// ------> obtener lista de restaurantes por ID
const RestaurantGetById = async (req = request, res = response) => {
    const { id } = req.params;
    const RestaurantId = await Restaurant.findById( id )
    res.status(200).json(RestaurantId)
};

// ------> Crear restaurantes
const CreatePostRestaurant = async (req = request, res = response , next) => {
  
  const { description, address, ...restaurant}  = req.body
  // restaurant.name.toUpperCase();

  // const {name, description, ...body} = req.body
  const admonRestaurant = await Restaurant({ description, address, ...restaurant});
  //GuardarDB
  await admonRestaurant.save();

  res.status(201).json(admonRestaurant);

  }

// ----------> Actualizacion de Restaurantes
const RestaurantPut = async (req = request, res = response) => {
    const { id } = req.params
    const { ...restaurant } = req.body
    const ActualizateRestaurant = await Restaurant.findByIdAndUpdate(id, restaurant, {new: true})
    res.status(201).json(ActualizateRestaurant)
  };

// --------------->  Eliminar Restaurante
const RestaurantDelete = async (req = request, res = response) => {
    const { id } = req.params;
    // const { ...restaurant } = req.body
    const DeleteRestaurants = await Restaurant.findByIdAndUpdate(id, {state:false}, {new: true});
    console.log(DeleteRestaurants)
    res.json({
      DeleteRestaurants
    })
  };

module.exports = {
    RestaurantGet,
    RestaurantGetById,
    CreatePostRestaurant,
    RestaurantPut,
    RestaurantDelete
}


