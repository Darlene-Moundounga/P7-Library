//générer la clé et la stocker dans un fichier 
const crypto = require("crypto")
const fs = require('fs')

const SECRET_KEY_FILE = 'secret.key'

function generateSecretKey(){
    let key;
    try {
        // lire la clé presente dans le fichier si le fichier existe
        key = fs.readFileSync(SECRET_KEY_FILE, 'utf-8').trim()
    } catch {
        key = crypto.randomBytes(32).toString("hex")
        fs.writeFileSync(SECRET_KEY_FILE, key)
    }
    return key
}

module.exports = generateSecretKey()
