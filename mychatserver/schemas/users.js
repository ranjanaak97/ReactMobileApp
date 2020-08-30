const mongoose = require('mongoose')
const { Schema } = mongoose;
const UserSchema = new Schema({
  name: String,
  phone: String,
  email: String,
  password: String
})
module.exports = mongoose.model('Users', UserSchema);