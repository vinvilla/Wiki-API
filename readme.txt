TERMINAL
* When you first open Terminal Type : bash
* Go to ~/
* Run every time you make change to  bash_profile file……     ==> source ~/.bash_profile

alias mongod='brew services run mongodb-community'
alias mongod-status='brew services list'

Run mongod

1. Create New Directory called Wiki-API

2. Run "npm init -y"

Install body-parser, mongoose, ejs, and express
3. Run "npm i express body-parser"
4. Run "npm i ejs mongoose"

5. Create a new file called app.js
    Run "touch app.js"


6.Inside app.js add server code (Write/copy)
Or go to https://github.com/londonappbrewery/Build-your-own-restful-api
scroll down to get the code for app.js

7. Setup MongoDB
  DB name is wikiDB
  Collection name is articles
  Document has two fields: title and content

8. Open another terminal Cntrl + T and from Wiki-API directory,
    Run:  "nodemon app.js"
    you should see this:
    [nodemon] starting `node app.js`
    Server started on port 3000

9. go to Chrome and go to http://localhost:3000/
   you should see: Cannot GET /


  alias mongod='brew services run mongodb-community'
  alias mongod-status='brew services list'
  alias mongod-stop='brew services stop mongodb-community'

  alias mongod-cli='mongod --dbpath /usr/local/var/mongodb --logpath /usr/local/var/log/mongodb/mongo.log --fork'
  alias mongod-kill='sudo pkill -f mongod'
