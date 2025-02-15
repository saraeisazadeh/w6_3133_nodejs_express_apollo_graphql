const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Movie {
    id: ID!
    name: String!
    director_name: String!
    production_house: String!
    release_date: String!
    rating: Float!
  }

  type Query {
    movies: [Movie!]! # Query to get all movies
    movie(id: ID!): Movie # Query to get a movie by ID
  }

  type Mutation {
    addMovie(
      name: String!
      director_name: String!
      production_house: String!
      release_date: String!
      rating: Float!
    ): Movie # Mutation to insert a new movie

    updateMovie(
      id: ID!
      name: String
      director_name: String
      production_house: String
      release_date: String
      rating: Float
    ): Movie # Mutation to update an existing movie

    deleteMovie(id: ID!): Movie # Mutation to delete a movie by ID
  }
`;

module.exports = typeDefs;