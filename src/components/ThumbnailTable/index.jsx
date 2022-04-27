import React, { useState } from "react";
import { Modal } from "react-bootstrap";

const Thumbnailtable = ({ url }) => {
  const [show, setShow] = useState(false);

  const setShowHandle = () => {
    setShow(true);
  };

  const handleClose = () => {
    setShow(false);
  };

  return (
    <>
      <p
        className="m-none text-decoration-underline text-primary"
        onClick={setShowHandle}
      >
        Book Thumbnail
      </p>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Book Thumbnail</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {" "}
          <img src={url} alt={"Book Thumbnail"} className={"w-100"} />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Thumbnailtable;
