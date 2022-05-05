import React from "react";
import { Nav } from "react-bootstrap";

export default function ProfileHistoryTab({ onChange, className }) {
  return (
    <Nav
      variant="pills"
      defaultActiveKey="purchased"
      className={`${className}`}
    >
      <Nav.Item>
        <Nav.Link eventKey="purchased" onClick={() => onChange("purchased")}>
          Purchased Books
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link
          eventKey="transaction"
          onClick={() => onChange("transaction")}
        >
          Transaction History
        </Nav.Link>
      </Nav.Item>
    </Nav>
  );
}
