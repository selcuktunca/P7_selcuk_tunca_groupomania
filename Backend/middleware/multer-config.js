// Permet d'importer multer
const multer = require('multer');

// Pour définir l'extension des fichiers images
const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png'
};

// Pour configurer multer
const storage = multer.diskStorage({
    // Pour stocker les images dans le dossier images
    destination: (req, file, callback) => {
        callback(null, 'images')
    },
    // Pour générer un nouveau nom de fichier image
    filename: (req, file, callback) => {
        const name = file.originalname.split(' ').join('_');
        const extension = MIME_TYPES[file.mimetype];
        callback(null, name + Date.now() + '.' + extension);
    }
});

// Pour exporter le middleware multer
module.exports = multer({storage}).single('image');