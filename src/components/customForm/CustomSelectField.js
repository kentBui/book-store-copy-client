import { useQuery } from "@apollo/client";
import { ErrorMessage } from "formik";
import React from "react";
import { Form } from "react-bootstrap";
import { getAuthors } from "../../graphql-client/queries";

const CustomSelectField = ({ field, form, authors }) => {
  const { name, value, onChange, onBlur } = field;
  const { errors, touched } = form;
  const showErr = errors[name] && touched[name];

  const { loading, error: err, data } = useQuery(getAuthors);

  return (
    <>
      {loading ? (
        <p className="alert alert-info">Loading...</p>
      ) : err ? (
        <p className="alert alert-danger">Something went wrong !</p>
      ) : (
        <Form.Group controlId="exampleForm.ControlSelect1">
          <Form.Control
            as="select"
            name={name}
            value={value}
            onBlur={onBlur}
            onChange={onChange}
            isInvalid={showErr}
          >
            <option value="" disabled>
              Select author
            </option>
            {data.authors?.length > 0 &&
              data.authors.map((author) => (
                <option key={author.id} value={author.id}>
                  {author.name}
                </option>
              ))}
          </Form.Control>
          <Form.Control.Feedback type="invalid">
            <ErrorMessage name={name} />
          </Form.Control.Feedback>
        </Form.Group>
      )}
    </>
  );
};

export default CustomSelectField;
