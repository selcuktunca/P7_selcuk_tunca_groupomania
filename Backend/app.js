// Imports
const express = require('express');
//permet d'extraire l'objet JSON de la demande (Post)
const bodyParser = require('body-parser');
//permet d'eviter les attaques type cross-site scripting ( consiste a modifier le contenu d'une page html), configure des en-tetes http appropriée
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
//fixe une limite pour les requetes(attaque brut force)
const rateLimit = require("express-rate-limit");
// Chemin d'accès pour le fichier .env
require('dotenv').config({path: './config/.env'});
// Pour accéder au chemin du système de fichiers
const path = require('path');
// Pour créer l'application express
const app = express();

//constante utiliser avec rateLimit
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100, //nombres requetes (erreur) autorisés
});


// Middleware CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});


// Pour importer les routers user, post 
const userRoutes = require('./routes/user');
const postRoutes = require('./routes/post');
const commentRoutes = require('./routes/comment');


// Transforme le corps de la requête en objet JS
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Pour configurer les en-têtes HTTP de manière sécurisée
app.use(helmet());
// Pour valider les entrées utilisateur et de remplacer les caractères interdits par "_"
app.use(mongoSanitize({
    replaceWith: '_'
}));
app.use(limiter);


// Pour accéder aux routes pour les utilisateurs, les publications et les images
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api/user', userRoutes);
app.use('/api/post', postRoutes);
app.use('/api/comment', commentRoutes);


// Pour exporter l'application express pour pouvoir y accéder depuis les autres fichiers du projet 
module.exports = app;