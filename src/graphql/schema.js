export default `

type User {
  _id: String!
  firstName: String!
  lastName: String!
  email: String!
  password: String!
  createdAt: String!
  modifiedAt: String!
}

type Block {
  _id: String!
  name: String!
  context: String!
  tags: [String!]
  questions: [String!]!
  createdAt: String!
  modifiedAt: String!
}

type Question {
  _id: String!
  key: String!
  text: String!
  createdAt: String!
  modifiedAt: String!
}

input UserSearch {
  id: String
  firstName: String
  lastName: String
  email: String
  password: String
}

input UserInput {
  firstName: String!
  lastName: String!
  email: String!
  password: String!
}

input UserUpdateInput {
  id: String!
  firstName: String
  lastName: String
  email: String
  password: String
}

input BlockInput {
  name: String!
  context: String!
  tags: [String!]
  questions: [String!]!
}

input BlockSearch {
  id: String
  name: String
  context: String
}

type Query {
  users(user: UserSearch): [User!]!
  blocks(block: BlockSearch): [Block!]!
}

type Mutation {
  createUser(user: UserInput!): User!
  createBlock(block: BlockInput!): Block!
  updateUser(user: UserUpdateInput!): User!
}

`
