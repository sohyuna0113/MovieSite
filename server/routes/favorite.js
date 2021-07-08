const express = require('express');
const router = express.Router();
const { Favorite } = require('../models/Favorite')

/* index.js에 app.use('/api/favorite', require('./routes/favorite')); */
router.post('/favoriteNumber', (req, res) => {

    // mongoDB에서 favorite 숫자를 가져오기
    Favorite.find({ "movieId": req.body.movieId }) // request.bodyparser.movieId
        .exec((err, info) => {
            if(err) return res.status(400).send(err)

            res.status(200).json({ success:true, favoriteNumber: info.length})
        })
    // 다음, 프론트에 다시 숫자 정보를 보내주기
})

router.post('/favorited', (req, res) => {

    // mongoDB에서 favorite 숫자를 가져오기
    Favorite.find({ "movieId": req.body.movieId, userFrom: req.body.userFrom }) // request.bodyparser.movieId
        .exec((err, info) => {
            if(err) return res.status(400).send(err)

            let result = false;
            if(info.length !== 0) {
                result = true
            }
            res.status(200).json({ success:true, favorited: result})
        })
    // 다음, 프론트에 다시 숫자 정보를 보내주기
})

router.post('/addToFavorite', (req, res) => {

    const favorite = new Favorite(req.body)

    favorite.save((err, doc) => {
        if(err) return res.status(400).send(err)
        return res.status(200).json({ success : true })
    })

})


router.post('/removeFromFavorite', (req, res) => {

    Favorite.findOneAndDelete({movieId: req.body.movieId, userFrom: req.body.userFrom})
        .exec(( err, doc ) => {
            if(err) return res.status(400).send(err)
            res.status(200).json({ success:true, doc })
        })

})


router.post('/getFavoredMovie', (req, res) => {

    Favorite.find({ 'userFrom': req.body.userFrom })
        .exec(( err, favorites ) => {
            if(err) return res.status(400).send(err)
            res.status(200).json({ success:true, favorites }) // Array형식으로 된 좋아요 정보들을 json형식으로 변환
        })

})


router.post('/removeFromFavorite', (req, res) => {

    Favorite.findOneAndDelete({movieId: req.body.movieId, userFrom: req.body.userFrom})
        .exec((err, doc) => {
            if(err) return res.status(400).send(err)
            return res.status(200).json({ success : true })
        })

})


module.exports = router;
