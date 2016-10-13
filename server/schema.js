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

const TrainerType = new GraphQLObjectType({
  name: 'TrainerType',
  fields: () => {
    return {
      id: { type: GraphQLInt },
      first_name: { type: GraphQLString },
      last_name: { type: GraphQLString },
      pokemon: {
        type: new GraphQLList(PokemonType),
        description: 'Pokemon belonging to this trainer',
        resolve: ({ id }, args, { resolvers }) => resolvers.getPokemon(id),
      },
    };
  },
});

// This is where all of our querying will stem from
const RootQueryType = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: () => {
    return {
      trainers: {
        type: new GraphQLList(TrainerType),
        resolve: (obj, args, { resolvers }) => resolvers.getTrainers(),
      },
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
