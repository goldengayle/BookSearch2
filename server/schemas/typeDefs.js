const { gql } = require('apollo-server-express');

const typeDefs = gql `

input BookInput {
    authors: [String]!
    title: String
    bookId:ID
    image: String
    link: String

}
type User {
    _id: ID
    username: String
    email: String
    bookCount: Int
    savedBooks: [Book]

}

type Book {
    bookId: ID
    authors: [String]!
    description: String
    title: String
    image: String
    link: String
}



type Auth {
    token: ID!
    user: User

}
type Query {
    me: User
   
}

type Mutation {
    loginUser (username: String!, password: String!): Auth
    addUser (username: String!, email: String!, password: String!): Auth
    saveBook (userId: ID!, input:BookInput ): User
    removeBook (bookId: ID!): User

}


`;

module.exports = typeDefs;