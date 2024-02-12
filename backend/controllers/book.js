// const Book = require("../models/Book")

const books = [{
    userId : "ObjectId('65c4eccf9ce2d6ca6f1b264a')",
    title : "L'art Subtil de S'en Foutre",
    author : "Mark Manson",
    imageUrl : "https://media.e.leclerc/9782212567595_4?op_sharpen=1&resmode=bilin&fmt=pjpeg&qlt=85&wid=450&fit=fit,1&hei=450",
    genre : "Développement personnel",
    year : 2016,
    ratings : [
        {
            userId : "ObjectId('65c4eccf9ce2d6ca6f1b264a')",
            grade : 4
        }
    ],
    averageRating : 4
},
{
    userId : "ObjectId('65c4eccf9ce2d6ca6f1b264a')",
    title : "La semaine de 4 heures",
    author : "Timothy Ferriss",
    imageUrl : "https://abpeditions.fr/wp-content/uploads/final-381x381.png",
    genre : "Développement personnel",
    year : 2018,
    ratings : [
        {
            userId : "ObjectId('65c4eccf9ce2d6ca6f1b264a')",
            grade : 5
        }
    ],
    averageRating : 3
}
]

exports.getAllBooks = (req,res) => {
    res.send(books)
 }

 exports.getOneBook = (req,res) => {
    res.send(books[1])
 }