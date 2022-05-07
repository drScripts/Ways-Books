import React from "react";
import styles from "./PurchasedBookCard.module.css";
import thumbnail from "../../assets/images/mock_thumbnail.jpg";
import { Link } from "react-router-dom";
import { Col } from "react-bootstrap";

const PurchasedBookCard = ({ book, item }) => {
  return (
    <Col className="mb-3">
      <Link
        to={`/transaction/${item?.idTransaction}/book/${book?.id}`}
        className="text-decoration-none"
      >
        <img
          src={book?.thumbnail || thumbnail}
          alt="Thumbnail"
          className={`${styles.thumbnail} smallRadius`}
        />
        <h4 className={`text-dark ellipsis`}>{book?.title}</h4>
        <p className={styles.author}>By. {book?.author}</p>
      </Link>
      <a href={book?.bookAttachment} target={"_blank"} rel="noreferrer">
        <button className={styles.downloadBtn}>Download</button>
      </a>
    </Col>
  );
};

export default PurchasedBookCard;
