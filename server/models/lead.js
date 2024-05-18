const mongoose = require('mongoose');

const leadSchema = new mongoose.Schema({
  name: { 
    type: String,
     required: true
     },
  email: { 
    type: String,
     required: true 
    },
  mobile: { 
    type: String, 
    required: true 
},
productOfInterst:{
    type:[String],
    required:true
},
user:{
    type: mongoose.Types.ObjectId,
    ref:"User",
    required:true
},
  
 
}, { timestamps: true });

const Lead = mongoose.model('Lead', leadSchema);

module.exports = Lead;
