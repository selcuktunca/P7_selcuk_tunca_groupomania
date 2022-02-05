// Imports
const jwt = require("jsonwebtoken");
const db = require('../models/index');
const fs = require('fs');

require('dotenv').config({path: './config/.env'});

// Pour créer un nouveau message
exports.createPost = (req, res, next) => {   
    const content = req.body.content;

    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.JWT_SERCRET_TOKEN);
    const userId = decodedToken.userId;
    
    // Pour vérifier que tous les champs sont complétés
    if (content == null || content == '') {
        return res.status(400).json({ error: 'Renseigner tout les champs' });
    } 

    // Pour contrôler la longueur contenu du message
    if (content.length <= 4) {
        return res.status(400).json({ error: 'Le message doit contenir minimum 4 caractères' });
    }
    
    db.User.findOne({
        where: { id: userId }
    })
    
    .then(userFound => {
        if(userFound) {
            console.log(userFound.id)
            const post = db.Post.create({
                content: req.body.content,
                imagePost: req.file ? `${req.protocol}://${req.get('host')}/images/${req.file.filename}`: null,
                UserId: userFound.id
            })
            .then(() => res.status(201).json({ message: 'Votre message a bien été créé !' }))
            .catch(error => res.status(405).json({ error: error }));
        } else {
            return res.status(404).json({ error: 'Utilisateur non trouvé' })
        }
    })
    .catch(error => res.status(500).json({ error: 'Une erreur s\'est produite !' }));
};


// Pour afficher tous les users de commentaire
exports.getAllPosts = (req, res, next) => {
    db.Post.findAll({
        order: [['createdAt', "DESC"]] ,
        include: [
        {
            model: db.User,
            attributes: [ 'username', 'imageProfile' ]
        },
        {
            model: db.Comment,
            include:[{
                model: db.User,
                attributes: [ 'username', 'imageProfile' ]
            }]
        }]
    })
    .then(postFound => {
        if(postFound) {
            res.status(200).json(postFound);
        } else {
            res.status(404).json({ error: 'Aucun message trouvé' });
        }
    })
    .catch(error => {
        res.status(500).send({ error: 'Une erreur s\'est produite !' });
    });
}


// Pour modifier un message
exports.modifyPost = (req, res, next) => {
    console.log('file', req.file);
    console.log('content', req.body.content);
    console.log('bodypost', req.body.post);
    const postObject = req.file ?
    {
    content: req.body.content,
    imagePost: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body };

    console.log('body', req.body);
    console.log(req.params.postId);

    db.Post.findOne({
        where: {  id: req.params.postId },
    })
    .then(postFound => {
        if(postFound) {
            db.Post.update(postObject, {
                where: { id: req.params.postId}
            })
            .then(post => res.status(200).json({ message: 'Votre message a été modifié !' }))
            .catch(error => res.status(400).json({ error: 'Une erreur s\'est produite !' }))
        }
        else {
            res.status(404).json({ error: 'Message non trouvé' });
        }
    })
    .catch(error => res.status(500).json({ error: 'Une erreur s\'est produite !' }));
}


// Pour supprimer un message
exports.deletePost = (req, res, next) => {
    db.Post.findOne({
        attributes: ['id'],
        where: { id: req.params.postId }
    })
    .then(post => {
        if(post) {
            if(post.imagePost != null) {
                const filename = post.imagePost.split('/images/')[1];
            
                fs.unlink(`images/${filename}`, () => {
                    db.Post.destroy({ 
                        where: { id: req.params.postId } 
                    })
                    .then(() => res.status(200).json({ message: 'Votre message a été supprimé' }))
                    .catch(() => res.status(500).json({ error: 'Une erreur s\'est produite !' }));
                })
            } else {
                db.Post.destroy({ 
                    where: { id: req.params.postId } 
                })
                .then(() => res.status(200).json({ message: 'Votre message a été supprimé' }))
                .catch(() => res.status(500).json({ error: 'Une erreur s\'est produite !' }));
            }
        } else {
            return res.status(404).json({ error: 'Message non trouvé'})
        }
    })
    .catch(error => res.status(500).json({ error: 'Une erreur s\'est produite !' }));
}
