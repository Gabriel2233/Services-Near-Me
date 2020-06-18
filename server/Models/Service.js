const mongoose = require('mongoose')

const ServiceSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    uf: {
        type: String,
        required: true
    },

    city:{
        type: String,
        required: true
    },

    serviceType: {
        type: String,
        required: true
    },

    latitude: {
        type: Number,
        required: true
    },

    longitude: {
        type: Number,
        required: true
    },

    opensAt: {
        type: String,
        required: true
    },

    closesAt: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Service', ServiceSchema)