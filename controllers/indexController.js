const User = require('../models/userModel');
const Posts = require('../models/postModel');
const { sendToken } = require('../utils/auth');


//hompage controller

exports.hompage = (req,res,next)=>{
    res.json({message : "this is homepage",user: req.user})
}

exports.currentuser = (req, res) => {
    res.status(200).json({ user: req.user });
};

//signup controller
exports.signup = async (req,res,next)=>{
    try {
        let user = await User.findOne({email : req.body.email}).exec();
        if(user){
            return res.status(200).json({message : "user Exists"});
        }
        const newUser = new User(req.body);
        user = await newUser.save();
        sendToken(user,req,res,200);
        console.log(user)
    } catch (error) {
        res.status(501).json({message : error.message})
    }
}

//login/signin controller

exports.signin = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        let user = await User.findOne({ email }).select("+password").exec();
        if (!user) {
            return res.status(404).json({ message: "user not found" });
        }
        // console.log(user)

        const matchpassword = user.comparepassword(password);

        if (!matchpassword) {
            return res.status(500).json({ message: "wrong credientials" });
        }

        sendToken(user, req, res, 200);
    } catch (error) {
        res.status(501).json({ message: error.message });
    }
    // res.json({})
};


//logout/signout controller

exports.signout = (req, res, next) => {
    res.clearCookie("token");
    res.status(200).json({ message: "logged out" });
};


//create post controller

exports.createpost = async (req, res) => {
    try {
        // console.log(req.body)
        const post = new Posts({ ...req.body, author: req.user._id });
        await req.user.posts.push(post._id);
        await post.save();
        await req.user.save();
        res.status(201).json({ message: "post posted" });
    } catch (error) {
        res.status(500).json({ message: error });
    }
};

exports.posts = async (req,res)=>{
    try {
        const { user_id, limit, page, startDate, endDate } = req.query;
        const users = await User.findOne({username : user_id}).exec();
        // Validate limit parameter and set a default if invalid
        let validLimit = parseInt(limit);
        if (isNaN(validLimit) || validLimit > 100) {
          validLimit = 10; // Set a default limit of 10 if invalid or greater than 100
        }
           
        // Construct query criteria based on user_id, startDate, and endDate
        const criteria = { author: users._id }; // Assuming author field stores user_id
        if (startDate && endDate) {
          criteria.createdAt = {
            $gte: new Date(startDate),
            $lte: new Date(endDate),
          };
        }
    
        // Calculate skip based on pagination
        const skip = (page - 1) * validLimit;
    
        // Query the database with pagination and criteria
        const posts = await Posts.find(criteria)
          .limit(validLimit)
          .skip(skip)
          .sort({ createdAt: -1 }) // Sort by createdAt in descending order for most recent posts first
          .exec();
    
        return res.json(posts);
      } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error" });
      }
}