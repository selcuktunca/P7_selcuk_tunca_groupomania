// Pour importer express
const express = require('express');

// Crée un routeur
const router = express.Router();

// Pour importer le middleware auth
const auth = require('../middleware/auth');


// Pour importer le controller message
const commentCtrl = require('../controllers/comment');


// Routes de l'API pour les messages
router.post('/:postId', auth, commentCtrl.createComment);
router.get('/:postId', auth, commentCtrl.getAllComments);
router.delete('/:commentId', auth, commentCtrl.deleteComment);


// Pour exporter le router
module.exports = router;