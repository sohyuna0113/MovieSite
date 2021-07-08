const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const favoriteSchema = mongoose.Schema({
    userFrom: {
        type: Schema.Types.ObjectId, // ObjectId 타입으로 User가 가지고 있는 모든 정보를 가지고 올 수 있다.
        ref: 'User'
    },
    movieId: {
        type: String
    },
    movieTitle: {
        type: String
    },
    moviePosts: {
        type: String
    },
    movieRuntime : {
        type: String
    }
}, { timestamps: true })

const Favorite = mongoose.model('Favorite', favoriteSchema)

module.exports = { Favorite }


