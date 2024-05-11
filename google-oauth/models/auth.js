const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")

const authSchema = new mongoose.Schema({
    googleId: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String
    }
}, { timestamps: true })

// authSchema.pre('save', async function (next) {
//     const salt = await bcrypt.genSalt(10);
//     this.password = await bcrypt.hash(this.password, salt);
//     next();
//   });
  
//   // Compare provided password with hashed password during login
// authSchema.methods.comparePassword = async function (candidatePassword) {
//     return await bcrypt.compare(candidatePassword, this.password);
//   };

const User = mongoose.model('User', authSchema)
module.exports = User;