import { Router } from 'express'
import pkg from 'jsonwebtoken'
const { verify, sign } = pkg
import session from 'express-session' 
import books from "./booksdb.js"

const regd_users = Router();

let users = [];

const isValid = (username)=>{ //returns boolean
        // write code to check is the username is valid
        // Filter the users array for any user with the same username
        let userswithsamename = users.filter((user) => {
          return user.username === username;
        });
        // Return true if any user with the same username is found, otherwise false
        if (userswithsamename.length > 0) {
            return true;
        } else {
            return false;
        }
}

const authenticatedUser = (username,password)=>{ //returns boolean
        // write code to check if username and password match the one we have in records.
        // Filter the users array for any user with the same username and password
        let validusers = users.filter((user) => {
          return (user.username === username && user.password === password);
        });
        // Return true if any valid user is found, otherwise false
        if (validusers.length > 0) {
            return true;
        } else {
            return false;
        }
}

//only registered users can login
regd_users.post("/login", (req,res) => {
        //Write your code here
        const username = req.body.username;
        const password = req.body.password;
    
        // Check if username or password is missing
        if (!username || !password) {
            return res.status(404).json({ message: "Error logging in" });
        }
    
        // Authenticate user
        if (authenticatedUser(username, password)) {
        // Generate JWT access token
        const accessToken = sign({
            data: password
        }, 'access', { expiresIn: 60 * 60 }); // expire in one hour

        // Store access token and username in session
        req.session.authorization = {
            accessToken, username
        }
        return res.status(200).send("User successfully logged in");
        } else {
            return res.status(208).json({ message: "Invalid Login. Check username and password" });
        }

        // return res.status(300).json({message: "Yet to be implemented"});
});

// checking current_user
regd_users.get("/auth/current_user", (req, res) => {
  let current_user = req.session.authorization.username;
  // let current_user = req.user
  res.send(current_user);

});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
      //Write your code here
      const isbn = req.params.isbn;
      let current_user = req.session.authorization.username;
      const review = req.body.review;
      if (review) {
          books[isbn].reviews[current_user] = review;
      }
      
      return res.status(300).json({message: "review added"});

});


// delete review 
regd_users.delete("/auth/review/:isbn", (req, res) => {
            const isbn = req.params.isbn;
            let current_user = req.session.authorization.username;
            // Filter & delete the reviews based on the session username, so that a user can delete only his/her reviews and not other users
            // x returns empty array when it didn't find any review based on current_user
            let x = Object.keys(books[isbn].reviews).filter((rev) => rev === current_user)
            if (x.length>0) {
                
                delete books[isbn].reviews[current_user];
                res.send(`review from ${current_user} deleted.`);
            }
            else{
                res.send(`${current_user} don't have any review to delete.`);
            }
         
});

export const authenticated = regd_users;
const _isValid = isValid;
export { _isValid as isValid };
const _users = users;
export { _users as users };
