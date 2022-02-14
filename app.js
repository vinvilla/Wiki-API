//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));


mongoose.connect("mongodb://localhost:27017/wikiDB", {
  useNewUrlParser: true
});

//TODO

const articleSchema = {
  title: String,
  content: String
};

// - REST (Gold Standard) - Roy Fielding - UCI
//  * Use HTTP Request Verbs (Get, Post , Put, Patch, Delete)
//  * Use specific pattern of routes/end points URLs

//https://medium.com/@saginadir/native-function-chaining-in-javascript-what-we-can-learn-from-jquery-3b42d5d4a0d

const Article = mongoose.model("Article", articleSchema);
//app.route("/articles").get().post().delete();


//////////////// Requests targetting all artiles ............

app.route("/articles")

  .get(function(req, res) {
    Article.find(function(err, foundArticles) {
      if (!err) {
        res.send(foundArticles);
        //  console.log(foundArticles);
      } else {
        res.send(err);
      }
    });
  })

  .post(function(req, res) {
    const newArticle = new Article({
      title: req.body.title,
      content: req.body.content
    });
    // console.log(req.body.title);
    // console.log(req.body.content);
    newArticle.save(function(err) {
      if (!err) {
        res.send("Successfuly added a new article");
      } else {
        res.send(err);
      }
    });
  })

  .delete(function(req, res) {
    Article.deleteMany(function(err) {
      if (!err) {
        res.send("Successfuly deleted all article");
      } else {
        res.send(err);
      }
    });
  });
//
// // GET API
// app.get("/articles", );
//
// // POST API
// app.post("/articles", );
//
// // DELETE API
// app.delete("/articles", );
//
//


// // GET API
// app.get("/articles", function(req, res) {
//   Article.find(function(err, foundArticles) {
//     if (!err) {
//       res.send(foundArticles);
//       //  console.log(foundArticles);
//     } else {
//       res.send(err);
//     }
//   });
// });


// // POST API
// app.post("/articles", function(req, res) {
//   const newArticle = new Article({
//     title: req.body.title,
//     content: req.body.content
//   });
//   // console.log(req.body.title);
//   // console.log(req.body.content);
//   newArticle.save(function(err) {
//     if (!err) {
//       res.send("Successfuly added a new article");
//     } else {
//       res.send(err);
//     }
//   });
// });

//
// // DELETE API
// app.delete("/articles", function(req, res) {
//   Article.deleteMany(function(err) {
//     if (!err) {
//       res.send("Successfuly deleted all article");
//     } else {
//       res.send(err);
//     }
//   });
// });

//////////////// Requests targetting a specific artile ............
app.route("/articles/:articleTitle")

  .get(function(req,res){

    Article.findOne({
      title: req.params.articleTitle
    }, function(err, foundArticle) {
      if (foundArticle) {
        res.send(foundArticle);
      } else {
        res.send("No articles matching that title was found.");
      }
    });
  })

  .put(function(req,res){
    Article.update(
    {title: req.params.articleTitle},
    {title: req.body.title, content: req.body.content},
//    {overwrite:true},
    function(err){
      if(!err){
        res.send("Successfuly updated the article.");
      } else {
        console.log(err);
        res.send("Aricle wasn't updated");
      }
    }
  );
})

// https://stackoverflow.com/questions/45182011/mongoose-overwrite-the-document-rather-that-set-fields

.patch(function(req,res){
  Article.update(
  {title: req.params.articleTitle},
  {$set:req.body},
  function(err){
    if(!err){
       res.send("Successfuly updated the article.");
    } else {
      console.log(err);
      res.send("Aricle wasn't updated");
    }
  }
);
})


.delete(function(req,res){
  Article.deleteOne(
  {title: req.params.articleTitle},
  function(err){
    if(!err){
       res.send("Successfuly deleted the article.");
    } else {
      console.log(err);
      res.send("Aricle wasn't deleted");
    }
  }
);
});

// for space , use %20
//localhost:3000/articles/Jack%20Bauer

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
