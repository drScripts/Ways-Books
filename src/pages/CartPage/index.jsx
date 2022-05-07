import React, { useState } from "react";
import { Container, Row } from "react-bootstrap";
import {
  Navbars,
  HeroLayer,
  CartList,
  TransactionInformation,
} from "../../containers";

const CartPage = () => {
  document.title = "WaysBook | Cart";
  const [total, setTotal] = useState(0);
  const [qty, setQty] = useState(0);

  return (
    <div>
      <Navbars />
      <HeroLayer />
      <Container className={"px-md-5 my-3 my-sm-5"}>
        <h3 className={"mb-4 mx-0"}>My Cart</h3>
        <Row className={"mt-3"}>
          <CartList setCount={setQty} setTotal={setTotal} />
          <TransactionInformation
            total={total}
            qty={qty}
            isCartAvailable={total !== 0}
          />
        </Row>
      </Container>
    </div>
  );
};

export default CartPage;
