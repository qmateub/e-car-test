import express from 'express';
import bodyParser from 'body-parser';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import { makeExecutableSchema } from 'graphql-tools';
import mongoose from 'mongoose';
import typeDefs from './src/graphql/schema';
import resolvers from './src/graphql/resolvers';
import { User, Block, Question } from './src/db/entities';

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

mongoose.connect(
  `mongodb://${process.env.MONGODB_USER}:${process.env.MONGODB_PASS}@${
    process.env.MONGODB_URL
  }`
);

const app = express();

app.use(
  '/graphql',
  bodyParser.json(),
  graphqlExpress({ schema, context: { User, Block, Question } })
);

// Deploying
app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));
app.listen(process.env.PORT || 5000);
