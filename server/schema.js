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
      trainer_id: GraphQLInt,
      poke_name: GraphQLString,
      poke_type: GraphQLString,
      hp: GraphQLInt,
      attack: GraphQLInt,
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
          trainerId: { type: GraphQLInt },
        },
        resolve: () => 'world',
      },
    };
  },
});

const pokeSchema = new GraphQLSchema({
  query: RootQueryType,
  // ...mutation
});

export default pokeSchema;
