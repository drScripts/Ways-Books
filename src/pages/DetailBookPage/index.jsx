import React, { useContext } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { Navbars, HeroLayer } from "../../containers";
import thumbnail from "../../assets/images/mock_thumbnail.jpg";
import styles from "./DetailBookPage.module.css";
import whiteCart from "../../assets/icons/white-cart.png";
import { useMutation, useQuery } from "react-query";
import API from "../../services";
import NumberFormat from "react-number-format";
import { toast } from "react-toastify";
import { UserContext } from "../../context/UserContext";

const DetailBookPage = () => {
  const { id } = useParams();
  const [, dispatch] = useContext(UserContext);

  const { data } = useQuery(
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

  const { mutate: addToCart } = useMutation(
    async () => {
      const bodyData = JSON.stringify({ bookId: id });
      const { data } = await API.post("/cart", bodyData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      dispatch({ type: "CART_INCREMENT" });
      toast.success("Item added to cart");
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

  return (
    <div className={"mb-3"}>
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
    </div>
  );
};

export default DetailBookPage;
