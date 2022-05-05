import React, { useState } from "react";
import thumbnail from "../../assets/images/mock_thumbnail.jpg";
import NumberFormat from "react-number-format";
import trash from "../../assets/icons/trash.png";
import styles from "./CartItem.module.css";
import { Button } from "react-bootstrap";
import { useMutation } from "react-query";
import API from "../../services";
import { toast } from "react-toastify";

const CartItem = ({ countItem = 1, book, id, refreshData, cart }) => {
  const [counter, setCounter] = useState(countItem);

  const updateCart = async (type) => {
    const jsonData = JSON.stringify({ type });

    await API.patch(`/cart/${id}`, jsonData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    refreshData();
  };

  const deleteCart = async () => {
    const { data } = await API.delete(`/cart/${cart?.id}`);
    return data;
  };

  const { mutate } = useMutation(updateCart);
  const { mutate: deleteItem } = useMutation(deleteCart, {
    onError: (err) => {
      const message = err?.response?.data?.message || err?.message;

      toast.error(message);
    },
    onSuccess: () => {
      refreshData();
    },
  });

  const incrementHandler = () => {
    setCounter(counter + 1);
    mutate("INCREMENT");
  };

  const decrementHandler = () => {
    if (counter - 1 > 0) {
      setCounter(counter - 1);
      mutate("DECREMENT");
    }
  };

  return (
    <div className={"d-flex justify-content-between my-4"}>
      <div className="d-flex gap-3">
        <img
          src={book?.thumbnail || thumbnail}
          alt="Book Thumbnail"
          width={130}
          height={180}
        />
        <div>
          <h5 className={"ellipsis max2"}>{book?.title}</h5>
          <p className={`${styles.author} mb-2`}>By. {book?.author}</p>
          <div className="d-flex gap-3 mb-3 align-items-center">
            <Button
              disabled={counter <= 1}
              variant={"danger"}
              onClick={decrementHandler}
            >
              <h6 className="m-0">-</h6>
            </Button>{" "}
            <h6 className="m-0">{counter}</h6>
            <Button variant={"success"} onClick={incrementHandler}>
              <h6 className="m-0">+</h6>
            </Button>
          </div>
          <p className={styles.price}>
            <NumberFormat
              value={counter * book?.price}
              thousandSeparator={"."}
              decimalSeparator={","}
              prefix={"Rp. "}
              displayType={"text"}
            />
          </p>
        </div>
      </div>
      <img
        src={trash}
        alt="Trash Icon"
        width={20}
        height={20}
        className={"mPoint"}
        onClick={deleteItem}
      />
    </div>
  );
};

export default CartItem;
