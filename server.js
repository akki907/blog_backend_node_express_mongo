const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const morgan = require("morgan");
const setting = require("./config/setting");
const mongoose = require("mongoose");
const auth = require("./api/auth");
const post = require("./api/post");
const bodyParser = require("body-parser");
const passport = require("passport");

//database
mongoose
  .connect(setting.mongoURL)
  .then(() => {
    console.log(`Database connected at ${setting.mongoURL}`);
  })
  .catch(err => {
    console.log(err);
  });

//middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));

//passport middleware
app.use(passport.initialize());
require("./config/passport")(passport);

//routes
app.use("/api/auth", auth);
app.use("/api/post", post);

//server
app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
