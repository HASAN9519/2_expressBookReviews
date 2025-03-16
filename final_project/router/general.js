import { Router } from 'express'
import books from "./booksdb.js"
import { isValid } from "./auth_users.js"
import { users } from "./auth_users.js"
const public_users = Router();
import axios from 'axios'


public_users.post("/register", (req,res) => {
      const username = req.body.username;
      const password = req.body.password;
  
      // Check if both username and password are provided
      if (username && password) {
          // Check if the user does not already exist
          if (!isValid(username)) {
              // Add the new user to the users array
              users.push({"username": username, "password": password});
              return res.status(200).json({message: "User successfully registered. Now you can login"});
          } else {
              return res.status(404).json({message: "User already exists!"});
          }
      }
      // Return error if username or password is missing
      return res.status(404).json({message: "Unable to register user."});
      
});


// Get the book list available in the shop
public_users.get('/',function (req, res) {
    res.send(JSON.stringify(books,null,4))

    //Creating a promise method. The promise will get resolved when timer times out after 6 seconds.
    let myPromise = new Promise((resolve,reject) => {
      setTimeout(() => {
        resolve("Promise resolved")
      },6000)})
    
    //Call the promise and wait for it to be resolved and then print a message.
    myPromise.then((successMessage) => {
      console.log("From Callback " + successMessage)
    })

});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
            const isbn = req.params.isbn;
            res.send(books[isbn]);
            // return res.status(300).json({message: "Yet to be implemented"});

            //Creating a promise method. The promise will get resolved when timer times out after 6 seconds.
            let myPromise = new Promise((resolve,reject) => {
              setTimeout(() => {
                resolve("Promise resolved")
              },6000)})

            //Call the promise and wait for it to be resolved and then print a message.
            myPromise.then((successMessage) => {
              console.log("From Callback " + successMessage)
            })

});
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {

        // Extract the author parameter from the request URL
        const author = req.params.author;
        let filtered_author = Object.values(books).filter(book => book.author === author);
        res.send(JSON.stringify(filtered_author,null,4));
        // return res.status(300).json({message: "Yet to be implemented"});
        
        //Creating a promise method. The promise will get resolved when timer times out after 6 seconds.
        let myPromise = new Promise((resolve,reject) => {
          setTimeout(() => {
            resolve("Promise resolved")
          },6000)})
        
        //Call the promise and wait for it to be resolved and then print a message.
        myPromise.then((successMessage) => {
          console.log("From Callback " + successMessage)
        })

        
});




// Get all books based on title
public_users.get('/title/:title',function (req, res) {
      const title = req.params.title;
      let filtered_title = Object.values(books).filter(book => book.title === title);
      res.send(JSON.stringify(filtered_title,null,4));
      // return res.status(300).json({message: "Yet to be implemented"});


      //Creating a promise method. The promise will get resolved when timer times out after 6 seconds.
      let myPromise = new Promise((resolve,reject) => {
        setTimeout(() => {
          resolve("Promise resolved")
        },6000)})
      
      //Call the promise and wait for it to be resolved and then print a message.
      myPromise.then((successMessage) => {
        console.log("From Callback " + successMessage)
      })
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  const isbn = req.params.isbn;

  res.send(JSON.stringify(books[isbn].reviews, null, 4));

  // return res.status(300).json({message: "Yet to be implemented"});
});

export const general = public_users;
