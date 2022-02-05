// Imports
const jwt = require("jsonwebtoken");
const db = require('../models/index');

require('dotenv').config({path: './config/.env'});


exports.likePost = async(req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.JWT_SERCRET_TOKEN);
    const UserId = decodedToken.userId;
    const isliked = req.body.like;
    const PostId = req.params.postId;

    console.log("LE LIKE " + isliked + " --- USER ID " + UserId + " --- POST ID " + PostId );

    if (!PostId || !UserId)return res.status(400)
    .json({ error: "Informations manquantes" });
      

    const isPost = await db.Post.findOne({ where: { id: PostId } }); 

    if (!isPost)return res.status(404)
    .json({ error: "Message inexistant !" });

    const isLikeExist = await db.Like.findOne({where : { userId:UserId,postid:PostId }})

    try {
        if (!isLikeExist && isliked){ // si il n'existe pas déjà de like et si nous likons
        console.log(" NOUS CREONS");
            db.Like.create({
             UserId,
             PostId,
            like:true
        }).then(()=>{
            isPost.update({likes: isPost.likes+1})
            res.status(201).json({ message: 'Vous aimez ce message !' })
        }).catch(error => res.status(400).json({error : error.message}));
    }else if(isLikeExist && isliked) // si il existe déjà un like de cet utilisateur sur ce post et que nous likons
    {
        console.log(" NOUS UPDATONS LIKE");
        isLikeExist.update({
            like:true
        }).then(()=>{
            isPost.update({likes: isPost.likes+1})
            res.status(201).json({ message: 'Vous aimez ce message !' })
        })
    }else if (isLikeExist && !isliked){
        console.log(" NOUS UPDATON DISLIKE");
        isLikeExist.update({
           like:false
        }).then(()=>{
            isPost.update({likes: isPost.likes-1})
            res.status(201).json({ message: 'Vous Dislikez ce message !' })
        })
    }
    } catch (error) {
        return res.status(400).json({ error : error.message }); 
    }
    

      
}

// Pour aimer un message
exports.likePostOld = async(req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.JWT_SERCRET_TOKEN);
    const userId = decodedToken.userId;
    const isliked = req.body.like
    console.log("salut " + req.params.postId)
    let postLike = await db.Like.findOne({
       where : {PostId: req.params.postId, 
        UserId: userId} 
    })
    if(postLike){
        console.log("bonjour")
    } else{console.log("pas trouvé")}
    db.Post.findOne({
      
        where: { id: req.params.postId },
    })

    .then(postfound => {
         if (isliked == false) {
            postLike.update({ 
                PostId: req.params.postId, 
                UserId: userId,
                like : false 
            })
            .then(response => {
                console.log(postfound.likes);
                
                db.Post.update({ 
                    likes: postfound.likes -1
                },{
                    where: { id: req.params.postId }
                })
                .then(() => res.status(201).json({ message: 'Vous aimez ce message !' }))
                .catch(error => res.status(402).json({ error: 'Une erreur s\'est produite !' })) 
            })
            .catch(error => res.status(403).json({ error: 'Une erreur s\'est produite !' }))
        } else if(isliked == true) {
            if (postLike != null){
                postLike.update({ 
                    where: { 
                        postId: req.params.postId, 
                        userId: userId,
                        like : true 
                    } 
                })
                .then(() => {
                    db.Post.update({ 
                        likes: postfound.likes +1
                    },{
                        where: { id: req.params.postId }
                    })
                    .then(() => res.status(201).json({ message: 'Vous n\'aimez plus ce message' }))
                    .catch(error => res.status(404).json({ error: 'Une erreur s\'est produite !' })) 
                })
                .catch(error => res.status(405).json({ error: 'Une erreur s\'est produite !' })) 
            }else {db.Like.create({
                        postId: req.params.postId, 
                        userId: userId,
                        like : true 
            }) .then(() => {
                db.Post.update({ 
                    likes: postfound.likes +1
                },{
                    where: { id: req.params.postId }
                })
                .then(() => res.status(201).json({ message: 'Vous n\'aimez plus ce message' }))
                .catch(error => res.status(406).json({ error: 'Une erreur s\'est produite !' })) })
            .catch(error => res.status(407).json({ error: 'Une erreur s\'est produite !' }))}
            
        } else {
            console.log('ko');
        }
    })
    .catch(error => res.status(400).json({ error: 'Une erreur s\'est produite !' }))  
}

// Pour afficher tous les likes pour un message
exports.getAllLike = (req, res, next) => {
    db.Like.findAll({
        where: { postId: req.params.postId},
        include: {
            model: db.User,
            attributes: ["username"]
        },
    })
    .then(likePostFound => {
        if(likePostFound) {
            res.status(200).json(likePostFound);
            console.log(likePostFound);
        } else {
            res.status(404).json({ error: 'Aucun like trouvé' });
        }
    })
    .catch(error => res.status(500).json({ error: 'Une erreur s\'est produite !' }))
}