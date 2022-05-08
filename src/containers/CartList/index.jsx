import React, { useContext, useEffect } from "react";
import { Col } from "react-bootstrap";
import styles from "./CartList.module.css";
import { CartItem } from "../../components";
import { useQuery } from "react-query";
import API from "../../services";
import { toast } from "react-toastify";
import { UserContext } from "../../context/UserContext";
import LoadingApp from "../LoadingApp";

export default function CartList({ setCount, setTotal }) {
  const [, dispatch] = useContext(UserContext);

  const getCarts = async () => {
    const { data } = await API.get("/carts");
    return data?.data?.carts;
  };

  const { data, refetch, isLoading } = useQuery(["cartsChace"], getCarts, {
    onError: (err) => {
      const message = err?.response?.data?.message || err?.message;
      toast.error(message);
    },
  });

  useEffect(() => {
    if (data) {
      let qty = 0;
      let total = 0;
      data.forEach((cart) => {
        qty += cart?.qty;
        total += cart?.qty * cart?.book?.price;
      });
      dispatch({
        type: "UPDATE_CART",
        payload: { cartCount: qty },
      });
      setCount(qty);
      setTotal(total);
    }
  }, [data, setCount, setTotal, dispatch]);

  return (
    <>
      <LoadingApp isLoading={isLoading} />
      <Col md={"8"}>
        <h5 className={"mx-0"}>Review My Order</h5>
        <div className={`${styles.orderReview}`}>
          {data?.map((cart) => {
            return (
              <CartItem
                countItem={cart?.qty}
                book={cart?.book}
                key={cart?.id}
                id={cart?.id}
                refreshData={refetch}
                cart={cart}
              />
            );
          })}
        </div>
      </Col>
    </>
  );
}
