const {Schema , model } = require('mongoose');

const ReserveSchema = Schema ({
    name: {
        type: String, 
        required: [true , 'El nombre es obligatorio'],
        unique: true
    },
    state: {
        type: Boolean,
        default: true,
        required: true
    },
    restaurant : {
        type: Schema.Types.ObjectId,
        ref:'Restaurant',
        required: true,
    }, 

})

ReserveSchema.methods.toJSON = function() {
    const { __v, state, ...data} = this.toObject();
    return data;
}

module.exports = model('Reserve' , ReserveSchema);