import React from "react";
import { ModalForm } from "../../containers";
import style from "./NavbarButton.module.css";

const NavbarButton = ({
  outlineOnly = true,
  title,
  isLogin = false,
  handleShow,
  handleClose,
  show,
}) => {
  const changeForm = (type) => {
    handleShow(type);
  };

  return (
    <>
      <button
        onClick={() => handleShow({ type: title === "Login" })}
        className={`${style.button} ${outlineOnly ? "" : style.bgDark}`}
      >
        {title}
      </button>
      <ModalForm
        handleClose={handleClose}
        show={show}
        isLogin={isLogin}
        changeForm={changeForm}
      />
    </>
  );
};

export default NavbarButton;
