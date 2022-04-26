import React from "react";
import styles from "./PurchasedBookCard.module.css";
import thumbnail from "../../assets/images/mock_thumbnail.jpg";
import { Link } from "react-router-dom";
import { Col } from "react-bootstrap";

const PurchasedBookCard = () => {
  return (
    <Col className="mb-3">
      <Link to={"/book/2"} className="text-decoration-none">
        <img
          src={thumbnail}
          alt="Thumbnail"
          className={`${styles.thumbnail} rounded`}
        />
        <h4 className={`text-dark ellipsis`}>My Own Private Mr. Cool</h4>
        <p className={styles.author}>By. Indah Hanaco</p>
      </Link>
      <a
        href={
          "http://badanbahasa.kemdikbud.go.id/lamanbahasa/sites/default/files/SD-Gatotkaca%20Satria%20dari%20Pringgadani.pdf"
        }
        target={"_blank"}
        rel="noreferrer"
      >
        <button className={styles.downloadBtn}>Download</button>
      </a>
    </Col>
  );
};

export default PurchasedBookCard;
