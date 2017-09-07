import express from 'express';
import bodyParser from 'body-parser';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import { makeExecutableSchema } from 'graphql-tools';
import mongoose from 'mongoose';
import typeDefs from './graphql/data/schema';
import resolvers from './graphql/data/resolvers';

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

// mongoose.connect('mongodb://guest:guest123@ds161833.mlab.com:61833/e_car');
mongoose.connect(
  `mongodb://${process.env.['MONGODB_USER']}:${process.env['MONGODB_PASS']}@${process.env[
    'MONGODB_URL'
  ]}`
);

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

const PORT = 3000;

const app = express();

app.use(
  '/graphql',
  bodyParser.json(),
  graphqlExpress({ schema, context: { User, Block } })
);

app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));

app.listen(process.env.PORT || 5000);
