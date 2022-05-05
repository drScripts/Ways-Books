import React from "react";
import { Form } from "react-bootstrap";
import styles from "./CustomTextArea.module.css";

export default function CustomTextArea({
  name,
  onChangeHandler,
  value,
  placeholder,
  className,
}) {
  return (
    <Form.Control
      as="textarea"
      rows={3}
      placeholder={placeholder}
      className={`${styles.overrideInput} ${className}`}
      onChange={onChangeHandler}
      name={name}
      value={value}
    />
  );
}
