import {
	GraphQLSchema,
	GraphQLObjectType,
	GraphQLString,
} from 'graphql';


// This is where all of our querying will stem from
const RootQueryType = new GraphQLObjectType({
  name: 'RootQueryType',
  
  fields: {
    hello: {
      type: GraphQLString,
      resolve: () => 'world',
    },
  }
});

const pokeSchema = new GraphQLSchema({
  query: RootQueryType
  // ...mutation
});

export default pokeSchema;
