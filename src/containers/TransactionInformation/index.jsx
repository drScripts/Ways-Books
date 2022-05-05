import React, { useContext, useEffect, useState } from "react";
import { Button, Col, Modal } from "react-bootstrap";
import NumberFormat from "react-number-format";
import { useMutation } from "react-query";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { ShipmentContainers } from "..";
import { UserContext } from "../../context/UserContext";
import API from "../../services";
import styles from "./TransactionInformation.module.css";

export default function TransactionInformation({
  total,
  qty,
  isCartAvailable = false,
}) {
  const [state] = useContext(UserContext);
  const [show, setShow] = useState(false);
  const [shipmentCost, setShipmentCost] = useState(0);

  const handleClose = () => {
    setShow(false);
  };

  const createTransaction = async () => {
    const bodyData = JSON.stringify({ shipmentCost });

    const { data } = await API.post("/transaction", bodyData, {
      headers: { "Content-Type": "application/json" },
    });

    const token = data?.data?.transaction?.paymentToken;

    window?.snap?.pay(token, {
      onSuccess: function (result) {
        console.log("success");
        console.log(result);
      },
      onPending: function (result) {
        console.log("pending");
        console.log(result);
      },
      onError: function (result) {
        console.log("error");
        console.log(result);
      },
      onClose: function () {
        console.log("customer closed the popup without finishing the payment");
      },
    });
  };

  const { mutate: onSubmit } = useMutation(createTransaction, {
    onError: (err) => {
      const message = err?.response?.data?.message || err?.message;

      toast.error(message);
    },
  });

  useEffect(() => {
    const midtransScriptUrl = "https://app.sandbox.midtrans.com/snap/snap.js";
    const midtransClientKey = process.env.REACT_APP_MIDTRANS_CLIENT_KEY;

    const scriptTag = document.createElement("script");
    scriptTag.src = midtransScriptUrl;
    scriptTag.setAttribute("data-client-key", midtransClientKey);
    document.body.appendChild(scriptTag);

    return () => {
      document.body.removeChild(scriptTag);
    };
  }, []);

  useEffect(() => {
    if (!state?.user?.profile?.provinceId && !state?.user?.profile?.regionId) {
      setShow(true);
    }
  }, [state?.user?.profile?.provinceId, state?.user?.profile?.regionId]);

  return (
    <>
      <Col md={4} className={`ps-md-4`}>
        <div className={"m-none mt-2 mt-sm-0"}>
          <h5 className="mx-0 mb-3 mb-sm-2">Shipment Address</h5>
          <div className={`${styles.topBorder}`}>
            <p className={`${styles.address} mt-2`}>
              {state?.user?.profile?.address || "-"}
            </p>
          </div>
          <ShipmentContainers
            setCost={setShipmentCost}
            userDest={state?.user?.profile?.regionId}
            isAvailable={
              state?.user?.profile?.provinceId && state?.user?.profile?.regionId
            }
          />
        </div>
        <div className={`${styles.orderReview} py-3`}>
          <div className="d-flex justify-content-between align-items center">
            <p className="m-none">Subtotal</p>
            <p className="m-none">
              <NumberFormat
                value={total}
                thousandSeparator={"."}
                decimalSeparator={","}
                prefix={"Rp. "}
                displayType={"text"}
              />
            </p>
          </div>
          <div className="d-flex justify-content-between align-items center">
            <p className="m-none">Qty</p>
            <p className="m-none">{qty}</p>
          </div>
          <div className="d-flex justify-content-between align-items center">
            <p className="m-none">Shipment Services</p>
            <p className="m-none">
              <NumberFormat
                value={shipmentCost}
                thousandSeparator={"."}
                decimalSeparator={","}
                prefix={"Rp. "}
                displayType={"text"}
              />
            </p>
          </div>
        </div>
        <div
          className={`d-flex justify-content-between align-items-center ${styles.price} mt-2`}
        >
          <p className="m-none">Total</p>
          <p className="m-none">
            <NumberFormat
              value={total + shipmentCost}
              thousandSeparator={"."}
              decimalSeparator={","}
              prefix={"Rp. "}
              displayType={"text"}
            />
          </p>
        </div>

        <button
          disabled={shipmentCost === 0 || !isCartAvailable}
          className={`${styles.payBtn} my-3`}
          onClick={onSubmit}
        >
          Pay
        </button>
        <Modal centered show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Announcement</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Please Update your address information due to shipment information!
          </Modal.Body>
          <Modal.Footer>
            <Button variant="danger" onClick={handleClose}>
              Close
            </Button>
            <Link to={"/profile/edit"}>
              <Button variant="primary">Update Profile</Button>
            </Link>
          </Modal.Footer>
        </Modal>
      </Col>
    </>
  );
}
