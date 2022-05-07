import React from "react";
import { Card } from "react-bootstrap";
import profile from "../../assets/images/profile.jpg";
import styles from "./UserContact.module.css";

export default function UserContact({
  contact,
  isActive = false,
  onItemClick,
}) {
  return (
    <Card.Body className="m-none mPoint" onClick={() => onItemClick(contact)}>
      <div
        className={`${styles.profileItem}  ${
          isActive ? styles.active : ""
        } my-1 mx-2 p-2 rounded  d-flex align-items-center gap-3 `}
      >
        <img
          src={contact?.sender?.profile?.profilePict || profile}
          alt="User Profile"
          className={styles.profile}
          width={45}
          height={45}
        />
        <div>
          <p className={"m-none"}>{contact?.sender?.name}</p>
          <p className="m-none text-break ellipsis max1">{contact?.message}</p>
        </div>
      </div>
    </Card.Body>
  );
}
