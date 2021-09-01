import { gql } from "@apollo/client";

export const getBooks = gql`
  query getBooksQuery {
    books {
      name
      id
    }
  }
`;

export const getBook = gql`
  query getBookQuery($id: ID!) {
    book(id: $id) {
      name
      id
      genre
      author {
        id
        name
        age
        books {
          id
          name
          genre
        }
      }
    }
  }
`;

export const getAuthors = gql`
  query getAuthorsQuery {
    authors {
      id
      name
    }
  }
`;
