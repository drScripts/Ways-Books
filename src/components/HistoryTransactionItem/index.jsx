import React from "react";
import thumbnail from "../../assets/images/mock_thumbnail.jpg";
import NumberFormat from "react-number-format";
import styles from "./HistoryTransactionItem.module.css";

const HistoryTransactionItem = ({ item, book }) => {
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
            <h6 className="m-0">qty: {item?.qty}</h6>
          </div>
          <p className={styles.price}>
            <NumberFormat
              value={item?.qty * book?.price}
              thousandSeparator={"."}
              decimalSeparator={","}
              prefix={"Rp. "}
              displayType={"text"}
            />
          </p>
        </div>
      </div>
    </div>
  );
};

export default HistoryTransactionItem;
