const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username:  { 
        type: String, 
        required: true 
    },
    email: { 
        type: String, 
        required: true 
    },
    password: { 
        type: String, 
        required: true 
    },
    age: { 
        type: Number 
    },
    
    classId: { type: mongoose.Schema.Types.ObjectId, ref: 'Class' }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);