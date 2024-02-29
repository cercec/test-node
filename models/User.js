import mongoose from "mongoose";
import uniqueValidator from "mongoose-unique-validator"

const userSchema = mongoose.Schema({
  firstName: {type: String, required: true},
  lastName: {type: String, required: true},
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  userRole: {type: String, required: true}
})

userSchema.plugin(uniqueValidator)

export const User = mongoose.model('User', userSchema)
