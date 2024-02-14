//gestion de fichiers
//importer multer

const multer = require('multer')

const MIMES_TYPES = {
    'image/jpeg' : 'jpg',
    'image/jpg' : 'jpg',
    'image/png': 'png'
}

// créer un objet de stockage pour spécifier à multer où stocker ton fichier

const storage = multer.diskStorage({
    //destination du fichier donc où stocker le fichier
    destination: (req, file, callback) => {
        callback(null, "images")
    },
    // s'attaquer au nom du fichier, rendre le nom unique en ajoutant un timestamp
    filename: (req, file, callback) => {
        // récupérer le nom original du fichier // image darlene.jpg
        const fileName = file.originalname.split(' ').join('_')
        // récupérer son extension en fonction du mimetype du fichier image/jpeg
        const extension = MIMES_TYPES[file.mimetype]
        //modifier le nom du fichier en rajoutant un timestamp 
        callback(null, fileName + Date.now() + "." + extension) // image darlene.jpg42575752727272727.jpg
    }
}) // spécifier qu'on sauvegardera sur le disque

//exporter notre config

module.exports = multer({storage}).single('image')