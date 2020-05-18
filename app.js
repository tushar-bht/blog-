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

const title = "Welcome message";
const home =
  "Hey friend welcome you are gladly welcome here , by comming here you proved that you are a gem ,you just need to be pollished. And leave this small work on me";
const about =
  "Hello friends ,I am glad to have you here.I will soon be uploading my thoughts here and trust me i think a lot......You can say a minimum to 10 hours a day";
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
let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}
app.listen(port, function () {
  console.log("server started at port 3000");
});
//working with database...............
const schema = mongoose.Schema({
  title: { type: String },
  story: { type: String },
});
//table created...............
const blogPost = mongoose.model("blogPost", schema);
const welcomeMessage = new blogPost({
  title: title,
  story: home,
});
//welcomeMessage.save();
