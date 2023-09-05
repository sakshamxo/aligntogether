const express = require("express");
const { hompage, signup, signin, signout, createpost, posts } = require("../controllers/indexController");
const { isLoggedIn } = require("../utils/auth");
const router = express.Router();

router.get('/',hompage);

router.get("/loaduser", isLoggedIn, currentuser);

router.post('/signup',signup);

router.post('/signin',signin);

router.get('/signout',isLoggedIn,signout);

router.post('/create',isLoggedIn,createpost);

router.get('/posts',isLoggedIn,posts)

module.exports = router;