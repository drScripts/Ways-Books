import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { HeroLayer, Navbars } from "../../containers";
import thumbnail from "../../assets/images/mock_thumbnail.jpg";
import styles from "./DetailPurchasedBookPage.module.css";
import NumberFormat from "react-number-format";
import API from "../../services";
import { toast } from "react-toastify";

export default function DetailPurchasedBookPage() {
  document.title = "WaysBook | Detail Book";
  const { id: transactionId, bookId } = useParams();

  const getPurchasedBook = async () => {
    const { data } = await API.get(
      `/transaction/${transactionId}/book/${bookId}`
    );

    return data?.data?.book;
  };
  const { data } = useQuery("detailBookChace", getPurchasedBook, {
    onError: (err) => {
      const message = err?.response?.data?.message || err?.message;

      toast.error(message);
    },
  });

  return (
    <div>
      <Navbars />
      <HeroLayer />
      <Container className={"px-md-5 mt-5"}>
        <Row xs={1} md={2} className={"mb-4"}>
          <Col>
            <img
              src={data?.book?.thumbnail || thumbnail}
              alt="Thumbnail"
              className={styles.thumbnail}
            />
          </Col>
          <Col>
            <h1>{data?.book?.title}</h1>
            <p className={styles.author}>By. {data?.author}</p>

            <div className={"mt-5"}>
              <h4>Publication Date</h4>
              <p className={styles.published}>{data?.book?.publicationDate}</p>
            </div>
            <div>
              <h4>Pages</h4>
              <p className={styles.pages}>{data?.book?.page}</p>
            </div>
            <div>
              <h4 className="text-danger">ISBN</h4>
              <p className={styles.isbn}>{data?.book?.ISBN}</p>
            </div>
            <div>
              <h4>Price</h4>
              <p className={styles.price}>
                <NumberFormat
                  thousandSeparator={"."}
                  decimalSeparator={","}
                  prefix={"Rp. "}
                  displayType={"text"}
                  value={data?.book?.price}
                />
              </p>
            </div>
          </Col>
        </Row>
        <h1 className={"mb-3"}>About This Book</h1>
        <p className={styles.description}>{data?.book?.description}</p>
        <div className="text-end">
          <a
            className={`${styles.button} text-light mt-3`}
            href={data?.book?.bookAttachment}
            target={"_blank"}
            rel="noreferrer"
          >
            Download
          </a>
        </div>
      </Container>
    </div>
  );
}
