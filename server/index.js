if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const { ApolloServer } = require("apollo-server");
const typeDefs = require("./graphql/typeDefs");
const resolvers = require("./graphql/resolvers");
const authenticateToken = require("./graphql/middleware/authentication");

const { uri, config } = require("./database/db");
const mongoose = require("mongoose");

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({
    authenticationStatus: authenticateToken(req)
  })
});

mongoose
  .connect(uri, config)
  .then(
    server
      .listen({ port: process.env.PORT || 8000 })
      .then(({ url }) => {
        console.log(`Server is listening at ${url}...`);
      })
      .catch(error => {
        console.log(`Could not connect to the server. ${error}`);
      })
  )
  .catch(error => {
    console.log(`Could not connect to the database. ${error}`);
  });
