// resolvers.ts
import { User, Post } from '@prisma/client'; // Import Prisma Client types for User and Post models
import prisma from './prisma'; // Import your Prisma client instance

const resolvers = {
  Query: {
    users: async (): Promise<User[]> => {
      return await prisma.user.findMany();
    },
    user: async (_: any, args: { id: number }): Promise<User | null> => {
      return await prisma.user.findUnique({ where: { id: args.id } });
    },
    posts: async (): Promise<Post[]> => {
      return await prisma.post.findMany();
    },
    post: async (_: any, args: { id: number }): Promise<Post | null> => {
      return await prisma.post.findUnique({ where: { id: args.id } });
    },
  },
  Mutation: {
    createUser: async (_: any, args: { name: string; email: string }): Promise<User> => {
      return await prisma.user.create({
        data: {
          name: args.name,
          email: args.email,
        },
      });
    },
    updateUser: async (_: any, args: { id: number; name?: string; email?: string }): Promise<User | null> => {
      return await prisma.user.update({
        where: { id: args.id },
        data: {
          name: args.name || undefined,
          email: args.email || undefined,
        },
      });
    },
    deleteUser: async (_: any, args: { id: number }): Promise<User | null> => {
      return await prisma.user.delete({
        where: { id: args.id },
      });
    },
    createPost: async (_: any, args: { title: string; content: string }): Promise<Post> => {
      return await prisma.post.create({
        data: {
          title: args.title,
          content: args.content,
        },
      });
    },
  },
};

export default resolvers;
