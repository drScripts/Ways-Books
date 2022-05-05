import React from "react";
import { Row } from "react-bootstrap";
import { PurchasedBookCard } from "../../components";

export default function PurchasedBook() {
  return (
    <div>
      <h3>My Books</h3>
      <Row md={5} xs={2}>
        <PurchasedBookCard />
        <PurchasedBookCard />
        <PurchasedBookCard />
      </Row>
    </div>
  );
}
