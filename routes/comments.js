const express = require('express');
const router = express.Router();
const Comment = require('../schemas/Comment');

router.get('/my', async (req, res) => {

    try {
        if (!req.session.userId) {
            return res.redirect('/users/login');
        }

        const comments = await Comment.find({ userId: req.session.userId })
        .populate('userId', 'username image')
        .populate({
            path: 'reviewId',
            populate: {
                path: 'restaurantId',
                select: 'name'
            }
        })
        .sort({ commentDate: -1 })
        .lean();

        res.render('myComments', {
            title: "My Comments",
            comments: comments,
            extraCSS: "myComments.css",
            isLoggedIn: req.session.user ? true : false,
            currentUser: req.session.user,
            navbarUser: req.session.user
        });

    } catch (err) {
        console.error(err);
        res.status(500).send("Server Error");
    }
});

module.exports = router;