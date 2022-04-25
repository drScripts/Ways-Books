import React, { useState } from "react";
import { Modal, Form } from "react-bootstrap";
import styles from "./ModalForm.module.css";

const ModalForm = ({ show, handleClose, isLogin, changeForm }) => {
  const [state, setState] = useState({
    full_name: "",
    email: "",
    password: "",
  });

  const onChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(state);
  };

  const cleatState = () => {
    setState({ full_name: "", email: "", password: "" });
  };

  return (
    <Modal
      show={show}
      onHide={handleClose}
      backdrop="static"
      centered
      keyboard={false}
      size="sm"
    >
      <Modal.Header closeButton className="border-0">
        <Modal.Title>{isLogin ? "Login" : "Register"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={onSubmit}>
          {!isLogin && (
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                placeholder="Full Name"
                className={styles.customForm}
                required
                onChange={onChange}
                name="full_name"
                value={state?.full_name}
              />
            </Form.Group>
          )}

          <Form.Group className="mb-3">
            <Form.Control
              type="email"
              placeholder="Email"
              className={styles.customForm}
              required
              onChange={onChange}
              name="email"
              value={state?.email}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Control
              type="password"
              placeholder="Password"
              className={styles.customForm}
              required
              onChange={onChange}
              name="password"
              value={state?.password}
            />
          </Form.Group>
          <button className={`${styles.formButton} mt-3 mb-2`}>
            {isLogin ? "Login" : "Register"}{" "}
          </button>
        </Form>

        {isLogin ? (
          <p className="text-center">
            Don't have an account ? Klik{" "}
            <span
              className="text-decoration-none fw-bold"
              onClick={() => {
                cleatState();
                changeForm({ type: false });
              }}
            >
              Here
            </span>
          </p>
        ) : (
          <p className="text-center">
            Already have an account ? Klik{" "}
            <span
              className="text-decoration-none fw-bold"
              onClick={() => {
                cleatState();
                changeForm({ type: true });
              }}
            >
              Here
            </span>
          </p>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default ModalForm;
