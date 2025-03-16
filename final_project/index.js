import express, { json } from 'express'
import pkg from 'jsonwebtoken'
const { verify, sign } = pkg 
import session from 'express-session'
import { authenticated as customer_routes } from './router/auth_users.js'
import { general as genl_routes } from './router/general.js'

const app = express();

app.use(json());

app.use("/customer",session({secret:"fingerprint_customer",resave: true, saveUninitialized: true}))

app.use("/customer/auth/*", function auth(req,res,next){

        if (req.session.authorization) { // Get the authorization object stored in the session
            let token = req.session.authorization['accessToken']; // Retrieve the token from authorization object
            verify(token, "access", (err, user) => { // Use JWT to verify token
            if (!err) {
                req.user = user;
                next();
            } else {
                return res.status(403).json({ message: "User not authenticated" });
            }
            });
        } else {
            return res.status(403).json({ message: "User not logged in" });
        }
});
 
const PORT =5000;

app.use("/customer", customer_routes);
app.use("/", genl_routes);

app.listen(PORT,()=>console.log("Server is running"));