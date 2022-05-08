import React, { useState, useContext } from "react";
import { Modal, Form } from "react-bootstrap";
import { useMutation } from "react-query";
import { toast } from "react-toastify";
import { UserContext } from "../../context/UserContext";
import API from "../../services";
import styles from "./ModalForm.module.css";
import LoadingApp from "../LoadingApp";

const ModalForm = ({ show, handleClose, isLogin, changeForm }) => {
  const [state, setState] = useState({
    full_name: "",
    email: "",
    password: "",
  });

  const [, dispatch] = useContext(UserContext);

  const { mutate: register, isLoading: loadingRegister } = useMutation(
    async () => {
      const { full_name, email, password } = state;

      const bodyData = JSON.stringify({ name: full_name, email, password });

      const { data } = await API.post("/register", bodyData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      const token = data?.data?.token;
      const user = data?.data?.user;

      handleClose();
      dispatch({
        type: "SUCCESS_REGISTER",
        payload: { token, user },
      });
      return data;
    },
    {
      onError: (err) => {
        const message = err?.response?.data?.message || err?.message;
        toast.error(message);
      },
    }
  );

  const { mutate: login, isLoading: loadingLogin } = useMutation(
    async () => {
      const { email, password } = state;

      const bodyData = JSON.stringify({ email, password });
      const { data } = await API.post("/login", bodyData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      const user = data?.data?.user;
      const token = data?.data?.token;

      handleClose();
      dispatch({
        type: "SUCCESS_LOGIN",
        payload: { user, token },
      });

      return data;
    },
    {
      onError: (err) => {
        const message = err?.response?.data?.message || err?.message;
        toast.error(message);
      },
    }
  );

  const onChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    localStorage.removeItem("path");
    if (isLogin) {
      login();
    } else {
      register();
    }
  };

  const clearState = () => {
    setState({ full_name: "", email: "", password: "" });
  };

  return (
    <>
      <LoadingApp isLoading={loadingRegister || loadingLogin} />
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header className="border-0">
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
                className="text-decoration-none fw-bold mPoint"
                onClick={() => {
                  clearState();
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
                className="text-decoration-none fw-bold mPoint"
                onClick={() => {
                  clearState();
                  changeForm({ type: true });
                }}
              >
                Here
              </span>
            </p>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ModalForm;
