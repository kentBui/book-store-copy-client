import { useQuery } from "@apollo/client";
import React, { useState } from "react";
import { Col, Row } from "react-bootstrap";
import { getBooks } from "../../graphql-client/queries";
import BookDetail from "./BookDetail";
import BookItem from "./BookItem";

const BookList = () => {
  const [selectedBook, setSelectedBook] = useState(null);
  const { loading, error, data } = useQuery(getBooks);

  const getId = (id) => {
    setSelectedBook(id);
  };

  return (
    <>
      {loading && <p className="alert alert-info">Loading...</p>}
      {error && <p className="alert alert-danger">Something went wrong !</p>}
      {!loading && !error && (
        <Row>
          <Col md={8}>
            {/* <CardColumns>
              {data &&
                data.books.length > 0 &&
                data.books.map((book) => (
                  <BookItem key={book.id} book={book} />
                ))}
            </CardColumns> */}
            <Row>
              {data &&
                data.books.length > 0 &&
                data.books.map((book) => (
                  <Col md={6} lg={4} key={book.id}>
                    <BookItem key={book.id} book={book} getId={getId} />
                  </Col>
                ))}
            </Row>
          </Col>
          <Col md={4}>
            <BookDetail id={selectedBook} />
          </Col>
        </Row>
      )}
    </>
  );
};

export default BookList;
