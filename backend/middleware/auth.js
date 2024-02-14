const jwt = require('jsonwebtoken')
const SECRET_KEY = require('../key')

module.exports = (req, res, next) => {
    // le token est envoyé dans l'en tête de la requete
    //sous forme string "Bearer 11dfddf5566ddfd"
    try {
        const token = req.headers.authorization.split(' ')[1]
        const decodedToken = jwt.verify(token, SECRET_KEY)
        //du token décodé on récupère l'id de l'user
        const userId = decodedToken.userId

        //cet id je veux le passer à chaque requête - transmettre le user id à toutes les routes qui en ont besoin
        req.auth = {
            userId: userId
        }
    } catch (error) {
        res.status(401).json({ error })
    }

    next();
}