const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const captainSchema = new mongoose.Schema({
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
    lowercase: true,
    minlength: [5, 'email must be of the size of atleast 5']
  },
  password: {
    type: String,
    required: true,
    select: false
  },
  socketId: {
    type: String
  },
  status: {
    type: String,
    default: 'inactive',
    enum: ['active', 'inactive']
  },
  vehicle: {
    colour: {
      type: String,
      required: true,
      minlength: [3, 'colour should be atleast 3 length require']
    },
    plate: {
      type: String,
      required: true,
      minlength: [3, 'plate should be atleast 3 length require']
    },
    model: {
      type: String,
      required: true,
      minlength: [3, 'model should be atleast 3 length require']
    },
    capacity: {
      type: Number,
      required: true,
      min: [1, 'capacity should be atleast 1']
    },

    vehicleType: {
      type: String,
      required: true,
      enum: ['car', 'motorcycle', 'auto']
    },
    location: {
      lat: {
        type: Number
      },

      lng: {
        type: Number
      }
    }
  }
})

captainSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {
    expiresIn: '24h'
  })
  return token
}
captainSchema.methods.comparePassword = async function (password) {
  if (!password || !this.password) {
    throw new Error('Password missing for comparison.')
  }
  console.log(password)
  console.log(this.password)
  return await bcrypt.compare(password, this.password)
}

captainSchema.statics.hashPassword = async password => {
  return await bcrypt.hash(password, 10)
}

module.exports = mongoose.model('Captain', captainSchema)
