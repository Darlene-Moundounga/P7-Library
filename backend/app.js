require('dotenv').config()
const express = require("express")
const mongoose = require("mongoose")
const User = require("./models/User")
const bcrypt= require("bcrypt")


//Connexion à la bd
const url = `mongodb+srv://darlene:${process.env.DATABASE_PASSWORD}@cluster.rnslr8s.mongodb.net/?retryWrites=true&w=majority`

mongoose.connect(url)
.then(()=> console.log("Connexion à la base de donnée réussie"))
.catch(()=> console.log("Connexion à la base de donnée échouée"))

const app = express()

app.use(express.json())

// middleware cors
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

async function hashPassword(password) {
    const saltRounds = 10
    return await bcrypt.hash(password, saltRounds)
}

// middleware user inscription 
app.post("/api/auth/signup", async (req, res) => { //fonction async, car hasPassword est asynchrone
    const user = new User({ //création d'un nouvel user avec ses propriétés
      email: req.body.email, //email du user passé dans le body
      password: await hashPassword(req.body.password) //mdp haché
    });
    user.save() //enregistrement du nouvel user
      .then(() => res.status(201).json({ message: 'Utilisateur inscrit !'})) //envoi du message et modification du statut si l'inscription a bien été réalisée
      .catch(error=> res.status(400).json({error})) //envoi du message d'erreur et modification du statut si l'inscription a échouée
  });




module.exports  = app