const express = require('express');
const router = express.Router();
const Restaurant = require('../schemas/Restaurant');
const Review = require('../schemas/Review');

// View all restaurants
router.get('/', async (req, res) => {
    try {
        const restaurants = await Restaurant.find({}).lean();

        console.log(restaurants);

        res.render('viewRestaurants', {
            title: 'Restaurants',
            restaurants: restaurants,
            extraCSS: 'viewRestaurants.css',
            isLoggedIn: req.session.user ? true : false,
            currentUser: req.session.user,
            navbarUser: req.session.user
        });

    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

// for search restaurants
router.get('/search', async (req, res) => {
    try {
        const searchQuery = req.query.q;
        const ratingFilter = req.query.rating;
        
        let filter = {};
        
       // search by resto name
        if (searchQuery && searchQuery.trim() !== '') {
            filter.name = { $regex: searchQuery, $options: 'i' }; // 'i' for case-insensitive
        }

        // filter by rating
        if (ratingFilter && ratingFilter !== '') {
            filter.rating = { $eq: Number(ratingFilter) };
        }

        const restaurants = await Restaurant.find(filter).lean();

        res.render('viewRestaurants', {
            restaurants,
            searchQuery,
            extraCSS: 'viewRestaurants.css',
            navbarUser: req.session.user
        });

    } catch (err) {
        console.log(err);
        res.redirect('/');
    }
});

// Viewing each restaurant
router.get('/:id', async (req, res) => {
    try {
        const restaurant = await Restaurant.findById(req.params.id).lean();

        if (!restaurant) {
            return res.status(404).send('Restaurant not found');
        }

        let reviews = await Review.find({ restaurantId: req.params.id }).populate('userId', 'username image').sort({ reviewDate: -1 }).lean();

        const userId = req.session.userId;

        reviews = reviews.map(r => {
            return {
                ...r,
                isHelpful: userId ? r.helpfulUsers?.some(u => String(u) === String(userId)) : false,
                isUnhelpful: userId ? r.unhelpfulUsers?.some(u => String(u) === String(userId)) : false
            };
        });

        res.render('restoReview', {
            title: restaurant.name,
            restaurant: restaurant,
            reviews: reviews,
            extraCSS: 'restaurant-page.css',
            isLoggedIn: req.session.user ? true : false,
            currentUser: req.session.user,
            navbarUser: req.session.user
        });

    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

module.exports = router;