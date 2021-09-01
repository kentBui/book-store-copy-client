import { useMutation } from "@apollo/client";
import { FastField, Form as FormAsFormik, Formik } from "formik";
import React from "react";
import { Col, Row } from "react-bootstrap";
import * as Yup from "yup";
import {
  createAuthorFn,
  createSingleBookFn,
} from "../../graphql-client/mutations";
import { getAuthors, getBooks } from "../../graphql-client/queries";
import CustomInputField from "./CustomInputField";
import CustomSelectField from "./CustomSelectField";

const initialAuthor = {
  authorName: "",
  authorAge: 0,
};

const authorSchema = Yup.object().shape({
  authorName: Yup.string().required("This field is required"),
  authorAge: Yup.number().required("This field is required"),
});
const initialBook = {
  name: "",
  genre: "",
  authorId: "",
};

const bookSchema = Yup.object().shape({
  name: Yup.string().required("This field is required"),
  genre: Yup.string().required("This field is required"),
  authorId: Yup.string().required("This field is required"),
});

const FormCreateBook = () => {
  const [createNewBook, dataMutation] = useMutation(createSingleBookFn);
  const [createNewAuthor, dataMutation1] = useMutation(createAuthorFn);

  const { loading: loading_create_book } = dataMutation;
  const { loading: loading_create_author } = dataMutation1;

  const handleSubmitAuthor = (values, resetForm) => {
    createNewAuthor({
      variables: { name: values.authorName, age: parseInt(values.authorAge) },
      refetchQueries: [{ query: getAuthors }],
    });
    resetForm();
  };

  const handleSubmitBook = (values, resetForm) => {
    createNewBook({
      variables: {
        name: values.name,
        genre: values.genre,
        authorId: values.authorId,
      },
      refetchQueries: [{ query: getBooks }],
    });
    resetForm();
  };

  return (
    <Row className="my-3">
      <Col md={6}>
        <Formik
          initialValues={initialBook}
          validationSchema={bookSchema}
          onSubmit={(values, { resetForm }) => {
            handleSubmitBook(values, resetForm);
          }}
        >
          {(props) => {
            return (
              <FormAsFormik className="d-flex flex-column">
                <button
                  className="btn btn-info align-self-end mb-3"
                  disabled={loading_create_book ? true : false}
                  type="submit"
                >
                  Add Book
                </button>
                <FastField
                  type="text"
                  name="name"
                  placeholder="Book Name"
                  component={CustomInputField}
                />
                <FastField
                  type="text"
                  name="genre"
                  placeholder="Book Genre"
                  component={CustomInputField}
                />

                <FastField name="authorId" component={CustomSelectField} />
              </FormAsFormik>
            );
          }}
        </Formik>
      </Col>
      <Col md={6}>
        <Formik
          initialValues={initialAuthor}
          validationSchema={authorSchema}
          onSubmit={(values, { resetForm }) =>
            handleSubmitAuthor(values, resetForm)
          }
        >
          {(props) => {
            return (
              <FormAsFormik className="d-flex flex-column">
                <button
                  className="btn btn-success align-self-end mb-3"
                  disabled={loading_create_author ? true : false}
                  type="submit"
                >
                  Add Author
                </button>
                <FastField
                  type="text"
                  name="authorName"
                  placeholder="Author Name"
                  component={CustomInputField}
                />

                <FastField
                  type="number"
                  name="authorAge"
                  placeholder="Author Age"
                  component={CustomInputField}
                />
              </FormAsFormik>
            );
          }}
        </Formik>
      </Col>
    </Row>
  );
};

export default FormCreateBook;
