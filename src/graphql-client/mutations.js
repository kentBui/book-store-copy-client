import { gql } from "@apollo/client";

export const createSingleBookFn = gql`
  mutation addSingleBookMutation(
    $name: String!
    $genre: String
    $authorId: ID!
  ) {
    createBook(name: $name, genre: $genre, authorId: $authorId) {
      id
      name
    }
  }
`;

export const createAuthorFn = gql`
  mutation addNewAuthorMutation($name: String!, $age: Int) {
    createAuthor(name: $name, age: $age) {
      id
      name
    }
  }
`;
