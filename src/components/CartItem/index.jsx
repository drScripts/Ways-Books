import React, { useState } from "react";
import thumbnail from "../../assets/images/mock_thumbnail.jpg";
import NumberFormat from "react-number-format";
import trash from "../../assets/icons/trash.png";
import styles from "./CartItem.module.css";
import { Button } from "react-bootstrap";

const CartItem = ({ countItem = 1 }) => {
  const [counter, setCounter] = useState(countItem);

  const incrementHandler = () => {
    setCounter(counter + 1);
  };

  const decrementHandler = () => {
    if (counter - 1 > 0) {
      setCounter(counter - 1);
    }
  };

  return (
    <div className={"d-flex justify-content-between my-4"}>
      <div className="d-flex gap-3">
        <img src={thumbnail} alt="Book Thumbnail" width={130} height={180} />
        <div>
          <h5 className={"ellipsis max2"}>My Own Private Mr. Cool</h5>
          <p className={`${styles.author} mb-2`}>By. Indah Hanaco</p>
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
              value={counter * 75000}
              thousandSeparator={"."}
              decimalSeparator={","}
              prefix={"Rp. "}
              displayType={"text"}
            />
          </p>
        </div>
      </div>
      <img src={trash} alt="Trash Icon" width={20} height={20} />
    </div>
  );
};

export default CartItem;
