const { response, request } = require('express')
const jwt = require('jsonwebtoken')
const Restaurant = require('../models/AdmonRestaurant');


const validarjwt = async ( req = request, res = response , next ) => {
    const token = req.header('x-token');

    if (!token) {
        return  res.status(401).json({
            msg: 'No hay token en la peticion'
        });
    }

    try {
        
        const { uid } = jwt.verify(token , process.env.SECRETORPRIVATEKEY);

            // leer el USUARIO que corresponde al uid
        const restaurant = await Restaurant.findById( uid );

        if(!restaurant) {
            return res.status(401).json({
                msg:'Token no valido - Usuario no existe en base de datos'
            })
        }
    
        //Verificar si el uid tiene estado en true;
        if (!restaurant.state) {
            return res.status(401).json({
                msg:'Token no valido - Usuario con status : false'
            })
        }
        req.restaurant = restaurant;
        // console.log(payload)
        next();

    } catch (error) {

        console.log(error);
        res.status(401).json({
            msg: 'Token no valido'
        })
    }

    // next();
}

module.exports = {
    validarjwt
}