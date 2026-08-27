const mongoose = require('mongoose');

const classSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true 
    },
    teachers: [{ 
        type: String 
    }],
    roomNumber: { 
        type: String 
    }
}, { timestamps: true });

module.exports = mongoose.model('Class', classSchema);