const mongoose = require('mongoose');

// Define the Movie schema
const movieSchema = new mongoose.Schema({
  name: String,
  director_name: String,
  production_house: String,
  release_date: String,
  rating: Number,
});

// Create the Movie model
const Movie = mongoose.model('Movie', movieSchema);

const resolvers = {
  Query: {
    // Query to get all movies
    movies: async () => await Movie.find(),

    // Query to get a movie by ID
    movie: async (parent, args) => await Movie.findById(args.id),
  },
  Mutation: {
    // Mutation to insert a new movie
    addMovie: async (parent, args) => {
      const newMovie = new Movie({
        name: args.name,
        director_name: args.director_name,
        production_house: args.production_house,
        release_date: args.release_date,
        rating: args.rating,
      });
      return await newMovie.save();
    },

    // Mutation to update an existing movie
    updateMovie: async (parent, args) => {
      const updatedMovie = await Movie.findByIdAndUpdate(
        args.id,
        {
          $set: {
            name: args.name,
            director_name: args.director_name,
            production_house: args.production_house,
            release_date: args.release_date,
            rating: args.rating,
          },
        },
        { new: true } // Return the updated document
      );
      return updatedMovie;
    },

    // Mutation to delete a movie by ID
    deleteMovie: async (parent, args) => {
      const deletedMovie = await Movie.findByIdAndDelete(args.id);
      return deletedMovie;
    },
  },
};

module.exports = resolvers;