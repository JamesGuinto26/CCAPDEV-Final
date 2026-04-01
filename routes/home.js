const express = require('express');
const router = express.Router();
const Restaurant = require('../schemas/Restaurant');

router.get('/', async (req, res) => {
    if (!req.session.userId) {
        return res.render('guestPage', {
            title: 'Welcome',
            extraCSS: 'guest-page.css',
        });
    }

    const restaurants = await Restaurant
        .find({ featured: true })
        .limit(6)
        .lean();

    res.render('homePage', {
        title: 'Home Page',
        featuredRestaurants: restaurants,
        extraCSS: 'home-page.css',
        navbarUser: req.session.user
    });
});

module.exports = router;