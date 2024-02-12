require('dotenv').config()
const express = require("express")
const mongoose = require("mongoose")
const userRoutes = require("./routes/user")
const bookRoutes = require("./routes/book")


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

app.use("/api/auth", userRoutes)

app.use("/api/books", bookRoutes)


module.exports  = app