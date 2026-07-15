// require("dotenv").config();

// const express = require('express');
// const connectDB = require("./moviedb");
// const app = express();

// connectDB();
// app.get('/', (req, res) => {
//   res.send('Movie APP is runnig');
// });




// const Movie=require("./models/Movie");

// app.use(express.json());

// app.post("/movies",async (req,res)=>{
//   try{
//    const movie = await Movie.create(req.body);
//     res.status(201).json(movie);
//   }catch(error){
//     res.status(500).json({message:error.message});

//   }
//   }
// );

// app.get("/movies", async (req, res) => {
//   try {
//     const filter = {};

//     if (req.query.genre) {
//       filter.genre = req.query.genre;
//     }

//     if (req.query.rating) {
//       filter.rating = { $gt: Number(req.query.rating) };
//     }

//     if (req.query.search) {
//       filter.title = {
//         $regex: req.query.search,
//         $options: "i"
//       };
//     }

//     let query = Movie.find(filter);

//     if (req.query.sort) {
//       query = query.sort({ [req.query.sort]: -1 });
//     }

//     const movies = await query;

//     res.json(movies);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });
// app.listen(5000, () => {
//   console.log("Server is Running on port 5000");
// });
// // Route to get movies
// // app.get("/movies", async (req, res) => {
// //   const movies = await Movie.find();
// //   res.json(movies);
// // });

// // app.listen(5000, () => {
// //   console.log("Server running on port 5000");
// // });








// // app.get("/movies", async (req, res) => {
// //   try {
// //     const filter = {};

// //     if (req.query.genre) {
// //       filter.genre = req.query.genre;
// //     }

// //     const movies = await Movie.find(filter);

// //     res.json(movies);
// //   } catch (error) {
// //     res.status(500).json({ message: error.message });
// //   }
// // });

// // app.get("/movies",async(req,res)=>{
// //   try{
// //     const filter={};

// //     if(req.query.rating){
// //       filter.rating={$gt:Number(req.query.rating)};
// //     }
// //     const movies=await Movie.find(filter);
// //     res.json(movies);
// //   } catch (error) {
// //     res.status(500).json({ message: error.message });
// //   }
// // });

// // app.listen(5000,()=>{
// //   console.log("Server is Running on port 5000");
// // });



// app.put("/movies/:id", async (req, res) => {
//   try {
//     const movie = await Movie.findByIdAndUpdate(
//       req.params.id,
//       req.body,
//       { new: true }
//     );

//     res.json(movie);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });




// app.delete("/movies", async (req, res) => {
//   await Movie.deleteMany({});
//   res.json({ message: "All movies deleted" });
// });





require("dotenv").config();

const express = require("express");
const connectDB = require("./moviedb");
const logger = require("./middleware/logger");
const movieRoutes = require("./routes/movieRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();

connectDB();


app.use(logger);

app.use(express.json());

app.use("/movies", movieRoutes);
app.use("/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("Movie App Running");
});

app.listen(5000, () => {
  console.log("Server is Running on port 5000");
});