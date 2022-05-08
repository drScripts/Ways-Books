import React, { useContext, useState } from "react";
import { Col, Container, Row, Modal } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { Navbars, HeroLayer, LoadingApp } from "../../containers";
import thumbnail from "../../assets/images/mock_thumbnail.jpg";
import styles from "./DetailBookPage.module.css";
import whiteCart from "../../assets/icons/white-cart.png";
import { useMutation, useQuery } from "react-query";
import API from "../../services";
import NumberFormat from "react-number-format";
import { toast } from "react-toastify";
import { UserContext } from "../../context/UserContext";

const DetailBookPage = () => {
  document.title = "WaysBook | Detail Book";
  const { id } = useParams();
  const [, dispatch] = useContext(UserContext);
  const [show, setShow] = useState(false);

  const showModal = () => {
    setShow(true);

    setTimeout(() => {
      setShow(false);
    }, 2000);
  };

  const { data, isLoading: bookLoading } = useQuery(
    ["bookChace", id],
    async () => {
      const { data } = await API.get(`/book/${id}`);

      return data?.data?.book;
    },
    {
      onError: (err) => {
        const message = err?.response?.data?.message || err?.message;
        toast.error(message);
      },
    }
  );

  const { mutate: addToCart, isLoading } = useMutation(
    async () => {
      const bodyData = JSON.stringify({ bookId: id });
      const { data } = await API.post("/cart", bodyData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      dispatch({ type: "CART_INCREMENT" });
      showModal();
      return data;
    },
    {
      onError: (err) => {
        const message = err?.response?.data?.message || err?.message;
        console.clear();
        toast.error(message);
      },
    }
  );

  const handleClose = () => {
    setShow(false);
  };

  return (
    <div className={"mb-3"}>
      <LoadingApp isLoading={bookLoading || isLoading} />
      <Navbars />
      <HeroLayer />
      <Container className={"px-md-5 mt-5"}>
        <Row xs={1} md={2} className={"mb-4"}>
          <Col>
            <img
              src={data?.thumbnail || thumbnail}
              alt="Thumbnail"
              className={styles.thumbnail}
            />
          </Col>
          <Col>
            <h1>{data?.title}</h1>
            <p className={styles.author}>By. {data?.author}</p>

            <div className={"mt-5"}>
              <h4>Publication Date</h4>
              <p className={styles.published}>{data?.publicationDate}</p>
            </div>
            <div>
              <h4>Pages</h4>
              <p className={styles.pages}>{data?.page}</p>
            </div>
            <div>
              <h4 className="text-danger">ISBN</h4>
              <p className={styles.isbn}>{data?.ISBN}</p>
            </div>
            <div>
              <h4>Price</h4>
              <p className={styles.price}>
                <NumberFormat
                  thousandSeparator={"."}
                  decimalSeparator={","}
                  prefix={"Rp. "}
                  displayType={"text"}
                  value={data?.price}
                />
              </p>
            </div>
          </Col>
        </Row>
        <h1 className={"mb-3"}>About This Book</h1>
        <p className={styles.description}>{data?.description}</p>
        <div className="text-end">
          <button className={styles.button} onClick={addToCart}>
            Add Cart{" "}
            <img
              src={whiteCart}
              alt="Add to cart"
              width={20}
              height={20}
              className={"ms-2"}
            />
          </button>
        </div>
      </Container>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Body className={"text-success text-center"}>
          The product is successfully added to the cart
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default DetailBookPage;
