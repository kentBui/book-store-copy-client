import { ErrorMessage } from "formik";
import React from "react";
import { Form } from "react-bootstrap";

const CustomField = ({ field, form, type, placeholder }) => {
  const { name, value, onChange, onBlur } = field;

  const { errors, touched } = form;
  const showErr = errors[name] && touched[name];

  return (
    <Form.Group>
      <Form.Control
        type={type}
        name={name}
        placeholder={placeholder}
        //
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        isInvalid={showErr}
      />
      <Form.Control.Feedback type="invalid">
        <ErrorMessage name={name} />
      </Form.Control.Feedback>
    </Form.Group>
  );
};

export default CustomField;
