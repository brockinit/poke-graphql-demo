import express from 'express';
import schema from './schema';
// import resolvers from './resolvers';
import cors from 'cors';

const GRAPHQL_PORT = 8000;

const app = express();
import graphqlHTTP from 'express-graphql';

app.use(cors());
app.use('/graphql', graphqlHTTP({
  graphiql: true,
  pretty: true,
  schema,
}));
app.listen(GRAPHQL_PORT, () => console.log(
  `GraphQL Server is now running on http://localhost:${GRAPHQL_PORT}/graphql`
));
