import React, { useContext, useEffect } from "react";
import { Col } from "react-bootstrap";
import NumberFormat from "react-number-format";
import { UserContext } from "../../context/UserContext";
import styles from "./HistoryTransactionInformation.module.css";

export default function HistoryTransactionInformation({
  total,
  qty,
  transaction,
}) {
  const [state] = useContext(UserContext);

  const pay = () => {
    window?.snap?.pay(transaction?.paymentToken, {
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
        </div>
        <div className={`${styles.orderReview} py-3`}>
          <div className="d-flex justify-content-between align-items center">
            <p className="m-none">Subtotal</p>
            <p className="m-none">
              <NumberFormat
                value={total - transaction?.shippingPrice}
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
                value={transaction?.shippingPrice}
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
              value={total}
              thousandSeparator={"."}
              decimalSeparator={","}
              prefix={"Rp. "}
              displayType={"text"}
            />
          </p>
        </div>

        <button
          disabled={transaction?.status?.toLowerCase() === "approve"}
          className={`${styles.payBtn} my-3`}
          onClick={pay}
        >
          Pay
        </button>
      </Col>
    </>
  );
}
