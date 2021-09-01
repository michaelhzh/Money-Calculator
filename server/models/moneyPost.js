const mongoose = require("mongoose");
const Schema = mongoose.Schema

const postSchema = new Schema({
    payer:{
        type:String,
        required: true
    },
    payee:{
        type: String,
        required: true
    },
    amount:{
        type: Number,
        required: true
    }

},{ timestamps: true })

const Post = mongoose.model('Post', postSchema)

module.exports=Post;