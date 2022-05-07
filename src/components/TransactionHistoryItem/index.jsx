import React from "react";
import { Badge, Card } from "react-bootstrap";
import NumberFormat from "react-number-format";
import { Link } from "react-router-dom";

export default function TransactionHistoryItem({ transaction }) {
  const itemsName = transaction?.transactionItems
    ?.map((item) => item?.book?.title)
    ?.join(", ");

  return (
    <Link to={"/profile"} className={"text-dark"}>
      <Card className="shadow shadow-sm rounded-3 mb-3">
        <Card.Body>
          <h4>
            <Badge
              className="capitalize"
              pill
              bg={
                transaction?.status?.toLowerCase() === "approve"
                  ? "success"
                  : transaction?.status?.toLowerCase() === "pending"
                  ? "warning"
                  : "danger"
              }
            >
              {transaction?.status || "Cancel"}
            </Badge>
            <NumberFormat
              value={transaction?.total || 0}
              prefix={"Rp. "}
              thousandSeparator={"."}
              decimalSeparator={","}
              displayType={"text"}
              className={"text-grey ms-3"}
            />
          </h4>
          <p className="text-grey">
            {transaction?.createdAt} |{" "}
            {transaction?.paymentType
              ? transaction?.paymentType
              : "Payment Pending"}
          </p>
          <h5>{itemsName}</h5>
        </Card.Body>
      </Card>
    </Link>
  );
}
