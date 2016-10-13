import express from 'express';
import pg from 'pg';
import config from './config/db';
import pgdb from './resolvers';
import schema from './schema';
import cors from 'cors';

const pgPool = new pg.Pool(config);
const resolvers = pgdb(pgPool);
const GRAPHQL_PORT = 8000;

const app = express();
import graphqlHTTP from 'express-graphql';

app.use(cors());
app.use('/graphql', graphqlHTTP({
  graphiql: true,
  pretty: true,
  context: { resolvers },
  schema,
}));
app.listen(GRAPHQL_PORT, () => console.log(
  `GraphQL Server is now running on http://localhost:${GRAPHQL_PORT}/graphql`
));
