### original code instructions
https://author-ide.skills.network/render?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtZF9pbnN0cnVjdGlvbnNfdXJsIjoiaHR0cHM6Ly9jZi1jb3Vyc2VzLWRhdGEuczMudXMuY2xvdWQtb2JqZWN0LXN0b3JhZ2UuYXBwZG9tYWluLmNsb3VkL0lCTURldmVsb3BlclNraWxsc05ldHdvcmstQ0QwMjIwRU4tU2tpbGxzTmV0d29yay9sYWJzL0ZpbmFsUHJvamVjdC9maW5hbC1wcm9qZWN0X25ldy9maW5hbC1wcm9qZWN0X25ldy5tZCIsInRvb2xfdHlwZSI6InRoZWlhIiwiYXRsYXNfZmlsZV9pZCI6MjcwNzIsImFkbWluIjpmYWxzZSwiaWF0IjoxNzMwMTU1MzY1fQ.P8gAfkDjTndBdlKhMheyOANQAVsJr9Y_tFxJJPZBjd8

### project github link
git clone https://github.com/ibm-developer-skills-network/expressBookReviews.git

### install all the necessary packages to execute the application
npm install --save

### command which will ensure that the express package is installed
npm install --save express

### Start the express server, file containing app.listen in the end are the server file
node index.js  

### below code also starts server
npm start

### using postman to retrieve data
### getting the list of books available in the shop
http://localhost:5000/

### Get book details based on ISBN
http://localhost:5000/isbn/1

### Get book details based on author
http://localhost:5000/author/Dante Alighieri

### getting the book details based on the title
http://localhost:5000/title/Fairy tales

### getting book review based on ISBN
http://localhost:5000/review/3

### registering user in postman in post method and paste codeblock on body in json format
http://localhost:5000/register 
{
    "username": "user1",
    "password": "123"
}
{
    "username": "user2",
    "password": "123"
}

### login in post method and paste codeblock on body in json format
http://localhost:5000/customer/login
{
    "username": "user1",
    "password": "123"
}
{
    "username": "user2",
    "password": "123"
}

### getting current user
http://localhost:5000/customer/auth/current_user


### put book review and paste codeblock on body in json format
http://localhost:5000/customer/auth/review/1
{
    "review": "good book"
}
{
    "review": "very good book"
}
{
    "review": "not good book"
}

### to check review updated or not
http://localhost:5000/isbn/1


### deleting a book review using delete
http://localhost:5000/customer/auth/review/1



### linking project with my github
### first create github repo without readme file
git init

git config --global user.email "shehab10111995@gmail.com"

git config --global user.name "HASAN9519"

git add --a

git commit -m "initial commit"

git branch -M main

### linking project with created github repo 
git remote add origin https://github.com/HASAN9519/2_expressBookReviews.git

git push -u origin main