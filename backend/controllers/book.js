const Book = require("../models/Book")


exports.getAllBooks = (req,res) => {
    Book.find()
    .then(books => res.send(books))
    .catch(error => res.status(404).json({error}))
 }

 exports.getOneBook = (req,res) => {
    Book.findOne({_id:req.params.id})
    .then(book => res.send(book) )
    .catch(error => res.status(404).json({error}))
 }


 //coder la logique pour ajouter un livre

exports.addBook = (req, res) => {
    const bookData = JSON.parse(req.body.book)
    //data book data image envoyée
    //c'est de créer un chemin vers le fichier 
    const imgURL = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`

    //supprimer l'id envoyé par le front
    delete bookData._id
    delete bookData.userId

    const book = new Book({
        ...bookData,
        imageUrl: imgURL,
        userId: req.auth.userId
    })
    book.save()
    .then( () => res.status(201).json({message : "Livre enregistré !"}))
    .catch( error => res.status(400).json({ error }))
    
}