import {
	GraphQLSchema,
	GraphQLObjectType,
	GraphQLString,
  GraphQLList,
  GraphQLInt,
} from 'graphql';

// Define custom type for querying pokemon
const PokemonType = new GraphQLObjectType({
  name: 'PokemonType',
  fields: () => {
    return {
      trainer_id: { type: GraphQLInt },
      poke_name: { type: GraphQLString },
      poke_type: { type: GraphQLString },
      hp: { type: GraphQLInt },
      attack: { type: GraphQLInt },
    };
  },
});

// This is where all of our querying will stem from
const RootQueryType = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: () => {
    return {
      pokemon: {
        type: new GraphQLList(PokemonType),
        args: {
          trainer_id: { type: GraphQLInt },
        },
        resolve: (obj, { trainer_id }, { resolvers }) => resolvers.getPokemon(trainer_id),
      },
    };
  },
});

const pokeSchema = new GraphQLSchema({
  query: RootQueryType,
  // ...mutation
});

export default pokeSchema;
