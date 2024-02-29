import mongoose from "mongoose";

const thingSchema = mongoose.Schema({
  title: {type: String, required: true},
  description: {type: String, required: true},
  // imageUrl: { type: String, required: true },
  price: {type: Number, required: true},
  userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Assure-toi que 'User' correspond au nom de ton modèle utilisateur
    required: true,
  },
});

export const Product = mongoose.model("Product", thingSchema);
