const express = require("express");

const app = express();

// app.use((req, res, next) => {
//   console.log("First middleware");
//   next(); // Needed if not returning a response
// });

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-control-Allow-Header",
    "Origin, X-Requested-With, Content-Type, Accept");
  res.setHeader(
    "Access-control-Allow-Method",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next();
});

app.use("/api/recipes", (req, res, next) => {
  // res.send('Hello from express!');
  const recipes = [
    {
      name: "A Taste Schnitzel",
      description: "A super-taste Schnitzel - just awesome!",
      imagePath:
        "https://upload.wikimedia.org/wikipedia/commons/7/72/Schnitzel.JPG",
      ingredients: [("Meat", 1), ("French Fries", 20)],
    },
    {
      name: "Big Fat Burge",
      description: "What else you need to say?",
      imagePath:
        "https://upload.wikimedia.org/wikipedia/commons/b/be/Burger_King_Angus_Bacon_%26_Cheese_Steak_Burger.jpg",
      ingredients: [("Buns", 2), ("Meat", 1)],
    },
  ];
  res.status(200).json({
    message: "Recipes fetched successfully!",
    recipes: recipes
  });
});

module.exports = app;
