const postModel = require('../models/post.model');
const userModel = require('../models/user.model');
const mongoose = require('mongoose');

// afficher les messages
module.exports.getPosts = async (req, res) => {
    try {
        const posts = await postModel.find().populate('author', 'username').populate('likers', 'username');
        res.status(200).json(posts);

    } catch(error) {
        res.status(500).json({ message: 'Erreur lors de la récupération des messages', error: error.message});
    }
}

// créer un message
module.exports.setPosts = async (req, res) => {
    try {
        const { message } = req.body;
        const author = req.userId;

        if (!message) {
            return res.status(400).json({message : "Merci d'ajouter un message"});
        };

        if (!author) {
            return res.status(400).json({ message: "Utilisateur inconnu" });
        }
        
        let post = await postModel.create({
            message,
            author: new mongoose.Types.ObjectId(author),
        });

        post = await post.populate('author', 'username');

        res.status(201).json(post);

    } catch(error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de la création du message.', error: error.message });
    }
};

// éditer un message
module.exports.editPost = async (req, res) => {
    try {
        const post = await postModel.findById(req.params.id);

        if (!post) {
            return res.status(404).json({ message: "Ce post n'existe pas." });
        }

        const userIdObject = new mongoose.Types.ObjectId(req.userId);

        // Vérifier si l'utilisateur connecté est bien l'auteur du post

        if (!post.author.equals(userIdObject)) {
            return res.status(403).json({ message: "Accès refusé. Vous n'êtes pas l'auteur de ce message." });
        }

        let updatedPost = await postModel.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        updatedPost = await updatedPost.populate('author', 'username');

        res.status(200).json(updatedPost);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de la mise à jour du message.', error: error.message });
    }
}

// supprimer un message
module.exports.deletePost = async (req, res) => {
    try {
        const post = await postModel.findById(req.params.id);

        if (!post) {
            return res.status(404).json({ message: "Ce post n'existe pas." });
        }

        const userIdObject = new mongoose.Types.ObjectId(req.userId);

        if (!post.author.equals(userIdObject)) {
            return res.status(403).json({ message: "Accès refusé. Vous n'êtes pas l'auteur de ce message." });
        }

        await postModel.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Message supprimé " });

    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la suppression du message.', error: error.message });
    }
}

// liker un message
module.exports.likePost = async (req, res) => {
    try {
        const userId = req.userId;
        const post = await postModel.findById(req.params.id);
        // travailler cette partie
        if (!userId) {
            return res.status(400).json({ message: "utilisateur non trouvé" });
        }

        if (!post) {
            return res.status(404).json({ message: "post non trouvé"});
        }

        if (post.likers.includes(userId)) {
            return res.status(400).json({ message: "post déjà liké"});
        }

        // ajouter l'utilisateur au tableau des likes
        post.likers.push(userId);
        await post.save();

        res.status(200).json(post);

    } catch (error) {
        res.status(500).json({ message: 'Erreur lors du like du message.', error: error.message });
    }
}

// disliker un message
module.exports.dislikePost = async (req, res) => {
    try {
        const userId = req.userId;
        const post = await postModel.findById(req.params.id);

        if (!post) {
            return res.status(404).json({ message: "Ce post n'existe pas." });
        }

        if(!post.likers.includes(userId)) {
            return res.status(400).json({ message: "vous n'avez pas liké ce post, vous ne pouvez pas le dislike."})
        }

        // enlever l'utilisateur du tableau des likes
        post.likers = post.likers.filter(likerId => likerId.toString() !== userId);
        await post.save();

        res.status(200).json(post);

    } catch (error) {
        res.status(500).json({ message: 'Erreur lors du dislike du message.', error: error.message });
    }
}