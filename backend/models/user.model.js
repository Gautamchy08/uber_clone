const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
  fullname: {
    firstname: {
      type: String,
      required: true,
      minlength: [3, 'first should be atleast 3 length require']
    },

    lastname: {
      type: String,

      minlength: [3, 'first should be atleast 3 length require']
    }
  },
  email: {
    type: String,
    requird: true,
    unique: true,
    minlength: [5, 'email must be of the size of atleast 5']
  },
  password: {
    type: String,
    required: true,
    select: false
  },
  socketId: {
    type: String
  }
})

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {
    expiresIn: '24h'
  })
  return token
}

userSchema.methods.comparePassword = async function (password) {
  if (!password || !this.password) {
    throw new Error('Password missing for comparison.')
  }
  return await bcrypt.compare(password, this.password)
}

userSchema.statics.hashPassword = async password => {
  return await bcrypt.hash(password, 10)
}

const userModel = mongoose.model('user', userSchema)

module.exports = userModel
