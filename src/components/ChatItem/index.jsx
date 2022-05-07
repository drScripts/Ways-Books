import React from "react";
import { Card } from "react-bootstrap";
import styles from "./ChatItem.module.css";

export default function ChatItem({ message, isCurrent = false }) {
  return (
    <div className={`${isCurrent ? styles.right : ""}`}>
      <Card className={`${styles.messages}`}>
        <Card.Body className="text-break">{message?.message}</Card.Body>
      </Card>
    </div>
  );
}
