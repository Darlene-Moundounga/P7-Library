require('dotenv').config()
const express = require("express")
const mongoose = require("mongoose")


//Connexion à la bd
const url = `mongodb+srv://darlene:${process.env.DATABASE_PASSWORD}@cluster.rnslr8s.mongodb.net/?retryWrites=true&w=majority`

mongoose.connect(url,{
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(()=> console.log("Connexion à la base de donnée réussie"))
.catch(()=> console.log("Connexion à la base de donnée échouée"))
const app = express()

app.use((req,res)=>{
    res.json({message:"Le serveur fonctionne bien"})
})




module.exports  = app