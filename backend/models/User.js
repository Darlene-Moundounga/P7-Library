const mongoose = require("mongoose")
//créer un schéma de donnée pour un user
const userSchema = mongoose.Schema({
    email : {type:String, required:true, unique:true},
    password : {type:String, required:true} 
})

module.exports = mongoose.model("User", userSchema)
