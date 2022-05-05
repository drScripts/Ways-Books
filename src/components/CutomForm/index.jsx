import React from "react";
import { Form } from "react-bootstrap";
import styles from "./CustomForm.module.css";

export default function CustomForm({
  name,
  type,
  placeholder,
  value,
  onChangeHandler,
  className,
}) {
  return (
    <Form.Control
      name={name}
      type={type}
      placeholder={placeholder}
      required
      onChange={onChangeHandler}
      className={`${styles.overrideInput} ${className}`}
      value={value}
    />
  );
}
