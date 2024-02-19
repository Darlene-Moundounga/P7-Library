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
        userId: req.auth.userId,
    })
    book.save()
    .then( () => res.status(201).json({message : "Livre enregistré !"}))
    .catch( error => res.status(400).json({ error }))
    
}

exports.deleteBook = (req,res) =>{
    Book.deleteOne({_id:req.params.id})
    .then( () => res.json({message : "Livre supprimé !"}))
    .catch( error => res.status(400).json({ error }))
}

exports.updateBook =  (req, res) => {
    updateBookById(req, res)
}

const updateBookById =  (req, res) => {
    if(!req.file){
        req.auth.userId === req.body.userId ? updateRequest(req, res, {...req.body}) 
        : res.status(403).json({message: "Unauthorized request"})
    } else {
        const bookData = JSON.parse(req.body.book)
        const imageUrl = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        req.auth.userId === bookData.userId ? updateRequest(req, res, {...bookData, imageUrl}) 
        : res.status(403).json({message: "Unauthorized request"})
    }
}

const updateRequest = (req, res, params) => {
    Book.updateOne({_id: req.params.id}, params)
    .then( () => res.json({message: "Livre modifié !"}))
    .catch( error => res.status(400).json({ error }))
}


exports.getBestRatingBooks = (req, res) => {
    Book.find().sort({averageRating: -1}).limit(3)
    .then( (books) => {res.send(books)})
    .catch(error => res.status(400).json( { error }))
    
}

exports.rateBook = async (req,res) => {
//     Définit la note pour le user ID fourni(de 0 à 5)
//userId + note = objet rating
    const rate = {
        userId : req.body.userId,
        grade : req.body.rating
    }

   try {
    const bookId = req.params.id
    const bookToRate = await Book.findOne({_id: bookId  }) // faire une requête pour chercher le livre en question
    const ratings = bookToRate.ratings
    //ajouter la nouvelle note au tableau de notes
    ratings.push(rate)
    bookToRate.save() // note
    .then( async () => {
        const newAverageRating = calculAverageRating(ratings)
        await updateAverageRating(bookId,newAverageRating)
        const bookRatingUpdate = await Book.findOne({_id:bookId})
        res.send(bookRatingUpdate)
    })   
    .catch( error => res.status(400).json({ error }))
   } catch (error) {
    console.log("Something bad happens : ", error)
   }
}

const updateAverageRating = async (id,averageRating) => {
    try {
         await Book.updateOne({_id:id},{$set:{averageRating}})
    } catch (error) {
        res.json({error})
    }
}


const calculAverageRating = (ratings) => {
    const sum = ratings.reduce((acc, rating)=>{
        return acc + rating.grade
    },0)
    
    const average = sum / ratings.length
    return average
}

//     Ajout de l'ID de l'utilisateur + sa note au tableau rating --fait
//      Utilisateur ne peut pas noter 2 fois
//     La note moyenne "averageRating" doit être tenue à
//     jour, et le livre renvoyé en réponse de la requête.