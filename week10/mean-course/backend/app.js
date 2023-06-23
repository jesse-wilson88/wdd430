const express = require("express");

const app = express();

// app.use((req, res, next) => {
//   console.log("First middleware");
//   next(); // Needed if not returning a response
// });

app.use("/api/posts", (req, res, next) => {
  // res.send('Hello from express!');
  const posts = [
    {
      id: "11",
      title: "First server-side post",
      content: "This is coming from the server",
    },
    {
      id: "13",
      title: "Second server-side post",
      content: "This is coming from the server!",
    },
  ];
  res.status(200).json({
    message: "Post fetched successfully.",
    posts: posts
  });
});

module.exports = app;
