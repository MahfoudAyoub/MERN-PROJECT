const mongoose = require('mongoose');
const {isEmail} = require('validator');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema(
    {
        pseudo: {
            type: String,
            required: true,
            minLength: 3,
            maxLength: 35,
            unique: true,
            trimp: true,//pour supprimer les espaces 
        },

        email: {
            type: String,
            required: true,
            lowercase: true,
            validate: [isEmail],
            trim: true,
        },

        password: {
            type: String,
            required: true,
            minLength: 6,
            max: 1024,
        },

        picture: {
            type: String,
            default: "./upload/profil/random-user.png"
        },

        bio: {
            type: String,
            max: 1024,
        },

        followers: {
            type: [String]
        },

        following: {
            type: [String]
        },

        likes: {
            type: [String]
        }
    },
    {
        timestamps: true,
    }
);

//play function before save info display : 'block'
userSchema.pre("save", async function(next){
    const salt = await bcrypt.genSalt();
    //crypt the password
    this.password = await bcrypt.hash(this.password, salt);
    next();
})


const UserModel = mongoose.model('user', userSchema);
module.exports = UserModel;