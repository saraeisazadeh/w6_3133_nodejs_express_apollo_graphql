const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { ApolloServer } = require('apollo-server-express'); // Import ApolloServer
const typeDefs = require('./schema'); // Import your GraphQL schema
const resolvers = require('./resolvers'); // Import your resolvers

// Store sensitive information in env variables
const dotenv = require('dotenv');
dotenv.config();

// MongoDB Atlas Connection String
const mongodb_atlas_url = process.env.MONGODB_URL;

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(mongodb_atlas_url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Success: MongoDB connected');
  } catch (error) {
    console.log(`Error: Unable to connect to DB - ${error.message}`);
  }
};

// Define Apollo Server
const server = new ApolloServer({
  typeDefs, // Your GraphQL schema
  resolvers, // Your resolvers
  context: ({ req }) => ({ req }), // Optional: Add context if needed
});

// Define Express Server
const app = express();
app.use(express.json());
app.use('*', cors()); // Enable CORS for all routes

// Apply Apollo Server as middleware to Express app
server.applyMiddleware({ app });

// Start the server
const PORT = process.env.PORT || 4000;
app.listen({ port: PORT }, () => {
  console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`);
  connectDB(); // Connect to MongoDB after starting the server
});