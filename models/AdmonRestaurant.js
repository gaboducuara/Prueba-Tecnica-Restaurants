const { Schema , model } = require('mongoose');

const RestaurantSchema = Schema ({
    name: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
        unique: true
    },
    description: {
        type: String,
        required: true, 
    },
    address: {
        type: String,
        required: true, 
    },
    city: {
        type: String, 
        required: true
    },
    ImgRestaurant: {
        type: String,
        required: true
    },
    state: {
        type: Boolean,
        default: true,
        // required: true
    }
});

// Forma para que no aparezca el estado,  ni el __v0 en postman o thunderClient...

RestaurantSchema.methods.toJSON = function() {
    const { __v, _id, ...restaurant} = this.toObject();
    restaurant.uid = _id;
    return restaurant;
}

module.exports = model('Restaurant', RestaurantSchema );