// Imports
const jwt = require("jsonwebtoken");
const db = require('../models/index');

require('dotenv').config({path: './config/.env'});



/**
 * Création d'un commentaire
 * @param {*} req
 * @param {*} res
 * @returns OBJECT {error:STRING || message: STRING}
 */
 exports.createComment = async (req, res) => {
    
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.JWT_SERCRET_TOKEN);
    const UserId = decodedToken.userId;
    const PostId = req.params.postId;;
    const content = req.body.content;

     console.log(" ---------------------------------------");

      if (!PostId || !content || !UserId) {
        return res.status(400).json({ error: "Informations manquantes" });
      }
      const isPost = await db.Post.findOne({ where: { id: PostId } });
      if (!isPost) {
        return res.status(404).json({ error: "Message inexistant !" });
      }

      try {
           await db.Comment.create({ UserId, PostId, content });
          return res.status(201).json({ message: "Commentaire enregistré !" });

      } catch (error) {
        return res.status(403).json({ error : error.message });
      }
      
  };

// Pour créer un nouveau commentaire
exports.createCommentOld = (req, res, next) => {    
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.JWT_SERCRET_TOKEN);
    const userId = decodedToken.userId;
    const postId = req.params.postId;
    
    db.Post.findOne({
        where: { id: req.params.postId }
    })
    .then(postFound => {
        if(postFound) {
            const comment = db.Comment.build({
                content: req.body.content,
                postId,
                userId
            })

            console.log("contenu " + comment.content + " -- id " + comment.postId + " -- " + comment.userId);

            comment.save()
                .then(() => res.status(201).json({ message: 'Votre commentaire a été créé !' }))
                .catch(error => res.status(400).json({ error: 'Une erreur s\'est produite !' }));
        } else {
            return res.status(404).json({ error: 'Message non trouvé'})
        }
    })
    .catch(error => res.status(500).json({ error: 'Une erreur s\'est produite !' }));
}


// Pour afficher tous les commentaires
exports.getAllComments = (req, res, next) => {
    db.Comment.findAll({
        order: [['updatedAt', "ASC"], ['createdAt', "ASC"]],
        where: { postId: req.params.postId },
        include: [{
            model: db.User,
            attributes: [ 'username', 'imageProfile' ]
        }]
    })
    .then(commentFound => {
        if(commentFound) {
            res.status(200).json(commentFound);
            console.log(commentFound);
        } else {
            res.status(404).json({ error: 'Aucun commentaire trouvé' });
        }
    })
    .catch(error => {
        res.status(500).send({ error: 'Une erreur s\'est produite !' });
    });
}


// Pour supprimer un commentaire
exports.deleteComment = (req, res, next) => {
    db.Comment.findOne({
        attributes: ['id'],
        where: { id: req.params.commentId }
    })
    .then(commentFound => {
        if(commentFound) {
            db.Comment.destroy({ 
                where: { id: req.params.commentId } 
            })
            .then(() => res.status(200).json({ message: 'Votre commentaire a été supprimé' }))
            .catch(() => res.status(500).json({ error: 'Une erreur s\'est produite !' }));
            
        } else {
            return res.status(404).json({ error: 'Commentaire non trouvé'})
        }
    })
    .catch(error => res.status(500).json({ error: 'Une erreur s\'est produite !' }));
}