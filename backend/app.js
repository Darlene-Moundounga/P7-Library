require('dotenv').config()
const express = require("express")
const mongoose = require("mongoose")
const User = require("./models/User")
const bcrypt= require("bcrypt")
const jwt = require("jsonwebtoken")
const secretKey = require("./key")

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

async function verifyPassword(password,hashedPassword){
    return await bcrypt.compare(password,hashedPassword)
}

function generateToken(id,secret){
    return jwt.sign(
        {userId:id},
        secret,
        {expiresIn:"1h"}
        
    )
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


// middleware user login
app.post("/api/auth/login", (req,res)=>{
    //récupérer l'email envoyé et de vérifier si un utilisateur existe avec cet email
    User.findOne({email: req.body.email})
    .then(
        async (user) => { 
            if(user){ // dans ce cas on vérifie le mot de passe
                const matchPassword = await verifyPassword(req.body.password,user.password)
                if(matchPassword){ //les password correspondent donc générer le token 
                    const token = generateToken(user._id,secretKey)
                    res.json({userId: user._id, token})
                }else{ //si le mdp est incorrect
                    res.status(401).json({message: "Identifiants incorrects"}) //unauthorized
                }
            }else{
                res.status(404).json({message: "Utilisateur introuvable"}) //not found
            }
        }
    )
    .catch(error => res.status(404).json({error}))
    //si l'email existe
    //vérifie les password, sont ils les mêmes?
    //si password ok => générer un token (avec userId)
    //connecte
})


module.exports  = app