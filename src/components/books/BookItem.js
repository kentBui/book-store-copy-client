import React from "react";
import { Card } from "react-bootstrap";

const BookItem = ({ book, getId }) => {
  return (
    <Card
      border="info"
      text="info"
      className="text-center shadow mb-5"
      style={{ height: "65px" }}
      onClick={() => getId(book.id)}
    >
      <Card.Body>{book.name}</Card.Body>
    </Card>
  );
};

export default BookItem;
