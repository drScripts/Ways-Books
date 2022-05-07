import React from "react";
import { Col } from "react-bootstrap";
import thumbnail from "../../assets/images/mock_thumbnail.jpg";
import styles from "./BookCard.module.css";
import { Link } from "react-router-dom";
import NumberFormat from "react-number-format";

const BookCard = ({ src, title, author, price, id }) => {
  return (
    <Col className="mb-3">
      <Link to={`/book/${id}`} className="text-decoration-none">
        <img
          src={src || thumbnail}
          alt="Thumbnail"
          className={`${styles.thumbnail} smallRadius shadow mb-2`}
        />
        <h4 className={`text-dark ellipsis`}>{title}</h4>
        <p className={styles.author}>By. {author}</p>
        <h5 className={`${styles.price} mt-2`}>
          <NumberFormat
            thousandSeparator={"."}
            decimalSeparator={","}
            prefix={"Rp. "}
            value={price}
            displayType={"text"}
          />
        </h5>
      </Link>
    </Col>
  );
};

export default BookCard;
