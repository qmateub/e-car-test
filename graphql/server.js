import express from 'express';
import bodyParser from 'body-parser';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import { makeExecutableSchema } from 'graphql-tools';
import mongoose from 'mongoose';
import { printSchema } from "graphql/utilities/schemaPrinter";
import typeDefs from './data/schema';
import resolvers from './data/resolvers';

const setupGraphQLServer = () => {
  const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
  });
  // TODO username and password
  mongoose.connect('mongodb://guest:guest123@ds161833.mlab.com:61833/e_car');

  const User = mongoose.model('User', {
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    createdAt: { type: Date, default: Date.now },
    modifiedAt: { type: Date, default: Date.now },
  });

  const Block = mongoose.model('Block', {
    name: String,
    context: String,
    tags: [String],
    questions: [String],
    createdAt: { type: Date, default: Date.now },
    modifiedAt: { type: Date, default: Date.now },
  });

  // setup server
  const graphQLServer = express()

  // /api/graphql
  graphQLServer.use(
    "/graphql",
    bodyParser.json(),
    graphqlExpress({ schema, context: { User, Block } })
  )

  // /api/graphiql
  graphQLServer.use(
    "/graphiql",
    graphiqlExpress({ endpointURL: "/api/graphql" })
  )

  // /api/schema
  graphQLServer.use("/schema", (req, res) => {
    res.set("Content-Type", "text/plain")
    res.send(printSchema(schema))
  })

  return graphQLServer
}

export default setupGraphQLServer
