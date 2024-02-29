import bcrypt from 'bcrypt';
import {User} from "../models/User.js";
import jwt from 'jsonwebtoken'

export const getAllUsers = (req, res, next) => {
  User.find().then(users => res.status(200).json({users})).catch(error => res.status(404).json({error}));
}

export const getUserById = (req, res, next) => {
  User.findOne({_id: req.params._id})
    .then(user => res.status(200).json(user))
    .catch(() => res.status(404).json({message: "Unknown user"}));
}

export const deleteUser = (req, res, next) => {
  User.deleteOne({_id: req.params._id})
    .then(user => res.status(200).json({message: 'Deleted!'}))
    .catch(error => res.status(404).json({error}));
};

export const updateUser = (req, res, next) => {
  User.updateOne({_id: req.params._id}, {...req.body, _id: req.params._id})
    .then(() => res.status(200).json({message: 'Modified!'}))
    .catch(error => res.status(400).json({error}))
}

export const createUser = (req, res, next) => {
  bcrypt.hash(req.body.password, 10)
    .then(hash => {
      const user = new User({
        email: req.body.email,
        password: hash,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        userRole: req.body.userRole
      });
      user.save()
        .then(() => res.status(201).json({message: 'Utilisateur créé !'}))
        .catch(error => res.status(400).json({error}))
    })
    .catch(error => res.status(500).json({error}));
}
