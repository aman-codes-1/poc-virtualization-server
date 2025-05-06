import path from 'path';
import { mergeTypeDefs } from '@graphql-tools/merge';
import { loadFilesSync } from '@graphql-tools/load-files';
import * as trainee from './userList';

const typesArray = loadFilesSync(path.join(__dirname, './**/*.graphql'));

const typeDefs = mergeTypeDefs(typesArray, { all: true });

export default {
  resolvers: {
    Query: {
      ...trainee.Query,
    },
    Mutation: {
      ...trainee.Mutation,
    },
  },
  typeDefs,
};
