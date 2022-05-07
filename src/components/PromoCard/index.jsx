import React, { useContext } from "react";
import NumberFormat from "react-number-format";
import { useMutation } from "react-query";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import thumbnail from "../../assets/images/mock_thumbnail.jpg";
import { UserContext } from "../../context/UserContext";
import API from "../../services";
import styles from "./PromoCard.module.css";

const PromoCard = ({ book }) => {
  const [, dispatch] = useContext(UserContext);

  const postCart = async () => {
    const bodyData = JSON.stringify({ bookId: book?.id });

    const { data } = await API.post("/cart", bodyData, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    toast.success("Book added to cart");
    dispatch({
      type: "CART_INCREMENT",
    });
    return data?.data?.carts;
  };

  const { mutate: addToCart } = useMutation(postCart, {
    onError: (err) => {
      const message = err?.response?.data?.message || err?.message;
      toast.error(message);
    },
  });

  return (
    <div className={"d-flex align-items-center me-3"}>
      <Link to={`/book/${book?.id}`}>
        <img
          src={book?.thumbnail || thumbnail}
          alt="Thumbnail"
          className={styles.thumbnail}
        />
      </Link>

      <div className={styles.card}>
        <Link to={`/book/${book?.id}`} className={"text-dark"}>
          <h4>{book?.title}</h4>
          <p className={styles.author}>By. {book?.author}</p>
          <p className={`${styles.description} ellipsis max3 mb-3`}>
            {book?.description}
          </p>
          <h5 className={`${styles.price}`}>
            <NumberFormat
              prefix={"Rp. "}
              value={book?.price}
              thousandSeparator={"."}
              decimalSeparator={","}
              displayType={"text"}
            />
          </h5>
        </Link>
        <button onClick={addToCart} className={styles.button}>
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default PromoCard;
