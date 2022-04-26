import React from "react";
import { Col } from "react-bootstrap";
import thumbnail from "../../assets/images/mock_thumbnail.jpg";
import styles from "./BookCard.module.css";
import { Link } from "react-router-dom";

const BookCard = () => {
  return (
    <Col className="mb-3">
      <Link to={"/book/2"} className="text-decoration-none">
        <img
          src={thumbnail}
          alt="Thumbnail"
          className={`${styles.thumbnail} smallRadius`}
        />
        <h4 className={`text-dark ellipsis`}>My Own Private Mr. Cool</h4>
        <p className={styles.author}>By. Indah Hanaco</p>
        <h5 className={`${styles.price} mt-2`}>Rp. 75.000</h5>
      </Link>
    </Col>
  );
};

export default BookCard;
