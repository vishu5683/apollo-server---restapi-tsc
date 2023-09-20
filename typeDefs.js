"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// typeDefs.ts
const apollo_server_1 = require("apollo-server");
const typeDefs = (0, apollo_server_1.gql) `
  type User {
    id: Int!
    name: String!
    email: String!
  }

  type Post {
    id: Int!
    title: String!
    content: String!
  }

  type Query {
    users: [User]
    user(id: Int!): User
    posts: [Post]
    post(id: Int!): Post
  }

  type Mutation {
    createUser(name: String!, email: String!): User
    updateUser(id: Int!, name: String, email: String): User
    deleteUser(id: Int!): User
    createPost(title: String!, content: String!): Post
  }
`;
exports.default = typeDefs;
