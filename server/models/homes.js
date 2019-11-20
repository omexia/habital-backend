const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');


let rolesValidos = {
    values: ['ADMIN_ROLE', 'USER_ROLE'],
    message: '{VALUE} no es un rol válido'
};

let Schema = mongoose.Schema;

let homeSchema = new Schema({
    home_name: {
        type: String,
        required: [true, 'El nombre es necesario']
    },
    home_owner: {
        type: String,
        unique: true,
        required: [true, 'El propietario es necesario']
    },
    home_address: {
        type: String,
        required: [true, 'La dirección es obligatoria']
    },
    home_mts: {
        type: Number,
        required: [true, 'Las dimensiones son obligatorias']
    },
    home_value: {
        type: Number,
        required: [true, 'El valor es obligatorio']
    },
    home_predial: {
        type: Number,
        required: false
    }
});

homeSchema.methods.toJSON = function() {
    let home = this;
    let homeObject = home.toObject();
    return homeObject;
}

module.exports = mongoose.model('Homes', homeSchema);