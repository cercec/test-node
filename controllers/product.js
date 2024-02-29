import { Product } from "../models/Products.js";

export const getAllProducts = (req, res, next) => {
  Product.find()
    .populate("userId", "firstName lastName userId")
    .populate("owner", "firstName lastName _id")
    .then((products) => res.status(200).json({ products }))
    .catch((error) => res.status(404).json({ error }));
};

export const getOneProduct = (req, res, next) => {
  Product.findOne({ _id: req.params.id })
    .then((product) => res.status(200).json({ product }))
    .catch(() => res.status(404).json({ message: "Unknown product" }));
};

export const getOneProductByUserId = (req, res, next) => {
  Product.find({ userId: req.params.id })
    .then((product) => res.status(200).json({ product }))
    .catch(() => res.status(404).json({ message: "Unknown product" }));
};

export const getAllProductsByUserId = (req, res, next) => {
  Product.find({ owner: req.params.id })
    .then((products) => {
      res.status(200).json(products);
    })
    .catch((error) => {
      res
        .status(500)
        .json({
          message: "Erreur lors de la récupération des produits",
          error,
        });
    });
};

export const createProduct = (req, res, next) => {
  const product = new Product({
    userId: req.auth.userId,
    title: req.body.title,
    description: req.body.description,
    price: req.body.price,
    owner: req.body.owner,
  });

  product
    .save()
    .then(() => res.status(201).json({ product }))
    .catch((error) => res.status(400).json({ error }));
};

export const updateProduct = (req, res, next) => {
  Product.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
    .then(() => res.status(200).json({ message: "Modified!" }))
    .catch((error) => res.status(400).json({ error }));
};

export const deleteProduct = (req, res, next) => {
  Product.deleteOne({ _id: req.params.id })
    .then((product) => res.status(200).json({ message: "Deleted!" }))
    .catch((error) => res.status(404).json({ error }));
};
