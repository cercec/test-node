import express from "express";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getAllProductsByUserId,
  getOneProduct,
  updateProduct
} from "../controllers/product.js";
import {auth} from "../middlewares/auth.js";

export const router = express.Router()

router.get('/', getAllProducts);
router.get('/:id', auth, getOneProduct);
router.get('/user/:id', auth, getAllProductsByUserId);
// router.post('/', auth, multerConfig, createProduct);
router.post('/', auth, createProduct);
router.put('/:id', auth, updateProduct);
router.delete('/:id', auth, deleteProduct);

