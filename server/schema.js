import {
	GraphQLSchema,
	GraphQLObjectType,
	GraphQLString,
  GraphQLList,
  GraphQLInt,
  GraphQLID,
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

// Define custom type for querying trainers
const TrainerType = new GraphQLObjectType({
  name: 'TrainerType',
  fields: () => {
    return {
      id: { type: GraphQLID },
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

// Define custom type for querying battles
const BattleType = new GraphQLObjectType({
  name: 'BattleType',
  fields: () => {
    return {
      id: { type: GraphQLID },
      battleground: { type: GraphQLString },
      winning_trainer: { type: GraphQLInt },
      losing_trainer: { type: GraphQLInt },
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
        args: {
          first_name: { type: GraphQLString },
        },
        resolve: (obj, { first_name }, { resolvers: { getTrainers } }) =>
        getTrainers(first_name),
      },
      pokemon: {
        type: new GraphQLList(PokemonType),
        args: {
          trainer_id: { type: GraphQLInt },
        },
        resolve: (obj, { trainer_id }, { resolvers: { getPokemon } }) =>
        getPokemon(trainer_id),
      },
      battles: {
        type: new GraphQLList(BattleType),
        args: {
          battleground: { type: GraphQLString },
          winning_trainer: { type: GraphQLInt },
          losing_trainer: { type: GraphQLInt },
        },
        resolve: (obj, args, { resolvers: { getBattles } }) =>
        getBattles(args),
      },
    };
  },
});

const pokeSchema = new GraphQLSchema({
  query: RootQueryType,
  // ...mutation
});

export default pokeSchema;
