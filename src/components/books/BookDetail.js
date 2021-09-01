import { useQuery } from "@apollo/client";
import React from "react";
import { Card, Table } from "react-bootstrap";
import { getBook } from "../../graphql-client/queries";

const BookDetail = ({ id }) => {
  const { loading, error, data } = useQuery(getBook, {
    variables: { id },
    skip: id === null,
  });

  return (
    <>
      {loading && <p className="alert alert-info">Loading...</p>}
      {id !== null && error && (
        <p className="alert alert-danger">Something went wrong!</p>
      )}
      {!loading && !error && data && data.book ? (
        <Card bg="info" text="white" className="shadow">
          <Card.Header>
            <Card.Title>{data.book.name}</Card.Title>
          </Card.Header>
          <Card.Body>
            <Card.Subtitle className="mb-3">
              The loai: {data.book.genre}
            </Card.Subtitle>
            <Card.Text>Tac gia: {data.book.author.name}</Card.Text>
            <Card.Text>Tuoi: {data.book.author.age}</Card.Text>
            <Card.Text>Cac cuon sach cung tac gia:</Card.Text>
            <Table striped bordered hover className="text-white">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Ten</th>
                  <th>The Loai</th>
                </tr>
              </thead>
              <tbody>
                {data.book.author.books.length > 0 &&
                  data.book.author.books.map((book, idx) => (
                    <tr key={book.id}>
                      <td>{idx + 1}</td>
                      <td>{book.name}</td>
                      <td>{book.genre}</td>
                    </tr>
                  ))}
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      ) : (
        <Card bg="info" text="white" className="shadow">
          <Card.Body>No more detail! Please select a book</Card.Body>
        </Card>
      )}
    </>
  );
};

export default BookDetail;
