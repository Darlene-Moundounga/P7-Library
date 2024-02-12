const mongoose = require("mongoose")
const UniqueValidator = require("mongoose-unique-validator")
//créer un schéma de donnée pour un user
const userSchema = mongoose.Schema({
    email : {type:String, required:true, unique:true},
    password : {type:String, required:true} 
})

userSchema.plugin(UniqueValidator) //améliore l'affichage de l'eeruer

module.exports = mongoose.model("User", userSchema)
