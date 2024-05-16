const GoogleStrategy = require("passport-google-oauth20").Strategy;
const password = require("passport");

passport.use(
    new GoogleStrategy(
    { 
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        callbackURL:"/login-google",
        scope: ["profile", "email"]},

        function (accessToken, refreshToken, profile, callback) {
        callback(null, profile);
        }
        

    

    
)
);