const express = require("express");
const app = express();
const mongoose = require("mongoose");
mongoose.connect(
  "mongodb+srv://admin-tushar:tushar123@blogproject-kqc6s.mongodb.net/test?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
//working with database...............
const schema = mongoose.Schema({
  title: { type: String },
  story: { type: String },
});
//table created...............
const blogPost = mongoose.model("blogPost", schema);

const title = "Welcome message";
const about =
  "Hey ! nothing important to know about me.Just grap a coffee and do the thing";
app.get("/", function (req, res) {
  blogPost.find(function (err, data) {
    if (err) console.log(data);
    else res.render("home", { message: data });
  });
});
app.get("/Contact", function (req, res) {
  res.render("contact", { contactcontent: about });
});
app.get("/About", function (req, res) {
  res.render("About", { aboutcontent: about });
});
app.get("/compose", function (req, res) {
  res.render("compose");
});
app.post("/compose", function (req, res) {
  const newStory = new blogPost({
    title: req.body.title,
    story: req.body.story,
  });
  newStory.save();
  res.redirect("/");
});
app.get("/post/:pageId", function (req, res) {
  const blogId = req.params.pageId;
  console.log(blogId);
  blogPost.findOne({ _id: blogId }, function (err, data) {
    if (err) console.log(err);
    else res.render("post", { title: data.title, story: data.story });
  });
});
//welcomeMessage.save();
let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}
app.listen(port, function () {
  console.log("server started at port 3000");
});
