import { ApolloServer } from 'apollo-server';
import typeDefs from './typeDefs';
import resolvers from './resolvers';
import prisma from './prisma';

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: { prisma }, // Provide Prisma context to resolvers
});

server.listen().then(({ url }) => {
  console.log(`Server is running at ${url}`);
});
