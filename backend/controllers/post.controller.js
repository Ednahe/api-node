const postModel = require('../models/post.model');
const userModel = require('../models/user.model');

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
        const { message, author } = req.body;
        if (!message) {
            res.status(400).json({message : "Merci d'ajouter un message"});
        }

        // chercher l'utilisateur
        const user = await userModel.findOne({ username: author });
        if (!user) {
            return res.status(404).json({ message: "Utilisateur non trouvé." });
        }

        const post = await postModel.create({
            message,
            author: user._id,
        });

        res.status(201).json(post);
    } catch(error) {
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

        const updatedPost = await postModel.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        res.status(200).json(updatedPost);
    } catch (error) {
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

        await postModel.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Message supprimé " + req.params.id });
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la suppression du message.', error: error.message });
    }
}

// liker un message
module.exports.likePost = async (req, res) => {
    try {
        const post = await postModel.findByIdAndUpdate(
            req.params.id,
            { $addToSet: { likers: req.body.userId } },
            { new: true }
        ).populate('author', 'username').populate('likers', 'username');

        if (!post) {
            return res.status(404).json({ message: "Ce post n'existe pas." });
        }

        res.status(200).json(post);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors du like du message.', error: error.message });
    }
}

// disliker un message
module.exports.dislikePost = async (req, res) => {
    try {
        const post = await postModel.findByIdAndUpdate(
            req.params.id,
            { $pull: { likers: req.body.userId } }, 
            { new: true }
        ).populate('author', 'username').populate('likers', 'username');

        if (!post) {
            return res.status(404).json({ message: "Ce post n'existe pas." });
        }

        res.status(200).json(post);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors du dislike du message.', error: error.message });
    }
}