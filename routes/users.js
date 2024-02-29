import express from "express";

import {deleteUser, getAllUsers, updateUser, createUser, getUserById} from "../controllers/user.js";

export const router = express.Router()

router.get('/', getAllUsers);
router.get('/:_id', getUserById);
router.delete('/:_id', deleteUser);
router.put('/:_id', updateUser);
router.post('/', createUser);
