const User = require('../models/user.model');
const jwt = require('jsonwebtoken');

const SECRET_KEY = process.env.SECRET_KEY;

const generateToken = (user) => {
    return jwt.sign({ id: user._id, email: user.email }, SECRET_KEY);
};

module.exports.registerUser = async (req, res) => {
    try {
        const {username, email, password} = req.body;

        const userNotValide = await User.findOne({email});
        if (userNotValide) {
            return res.status(400).json({ message: "Cet email est déjà utilisé."})
        }

        const newUser = new User({ username, email, password });
        await newUser.save();

        const token = generateToken(newUser);
        res.status(201).json({ message: 'Utilisateur créé avec succès.', user: newUser, token});
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la création utilisateur.', error: error.message});
    }
};

module.exports.loginUser = async (req, res) => {
    try {
        const {email, password} = req.body;

        const user = await User.findOne({email});
        if (!user) {
            return res.status(400).json({ message: 'Email incorrect.'})
        }

        const passwordValide = await user.isPasswordValid(password);
        if(!passwordValide) {
            return res.status(400).json({ message: 'mort de passe incorrect.'})
        }

        const token = generateToken(user);
        res.status(200).json({ message: 'Connexion réussie', user, token})
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la connexion.', error: error.message });
    }
};

module.exports.logoutUser = async (req, res) => {
    try {
        // à faire
        console.log(res);
        
        res.status(200).json({ message: 'Déconnexion réussie.' });
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la déconnexion.', error: error.message });
    }
};

module.exports.getUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if(!user) {
            return res.status(404).json({ message: 'utilisateur non trouvé'})
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération de l\'utilisateur.', error: error.message });
    }
};

module.exports.updateUser = async (req, res) => {
    try {
        const updates = req.body;
        const user = await User.findByIdAndUpdate(req.params.id, updates, {new: true, runValidators: true})

        if(!user) {
            return res.status(404).json({ message: 'utilisateur non trouvé'});
        }

        res.status(200).json({ message: 'utilisateur mis à jour avec succès', user})
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la mise à jour de l\'utilisateur.', error: error.message });
    }
};

module.exports.deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);

        if(!user) {
            return res.status(404).json({message : 'utilisateurs non trouvé'})
        }

        res.status(200).json({ message: 'Utilisateur supprimé avec succès.' });
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la suppression de l\'utilisateur.', error: error.message });
    }
};