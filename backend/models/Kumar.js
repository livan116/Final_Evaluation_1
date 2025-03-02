const mongoose = require('mongoose');

const KumarSchema = new mongoose.Schema({  
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
    });
module.exports = mongoose.model('Kumar', KumarSchema);