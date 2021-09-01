import React from "react";
import { Container } from "react-bootstrap";
import BookList from "./components/books/BookList";
import FormCreateBook from "./components/customForm/FormCreateBook";
import {
  ApolloClient,
  ApolloProvider,
  from,
  HttpLink,
  InMemoryCache,
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import "./global.css";

const httpLink = new HttpLink({
  uri: "https://book-store-copy.herokuapp.com/graphql",
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    );

  if (networkError) console.log(`[Network error]: ${networkError}`);
});

const client = new ApolloClient({
  link: from([errorLink, httpLink]),
  cache: new InMemoryCache(),
});

const App = () => {
  return (
    <ApolloProvider client={client}>
      <Container className="py-3 mt-3" style={{ backgroundColor: "lightcyan" }}>
        <h1 className="mb-3 text-center text-info">My Book</h1>
        <FormCreateBook />
        <BookList></BookList>
      </Container>
    </ApolloProvider>
  );
};

export default App;
