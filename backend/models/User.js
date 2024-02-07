const mongoose = require("mongoose")
//créer un schéma de donnée pour un user
const userSchema = mongoose.Schema({
    email : {type:String, required:true},
    password : {type:String, required:true} //mdp haché
})

//s'assurer que mongoDB prenne l'email en id