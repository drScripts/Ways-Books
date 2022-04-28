import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Navbars, HeroLayer } from "../../containers";
import { CartItem } from "../../components";
import styles from "./CartPage.module.css";
import NumberFormat from "react-number-format";

const CartPage = () => {
  return (
    <div>
      <Navbars />
      <HeroLayer />
      <Container className={"px-md-5 my-3 my-sm-5"}>
        <h3 className={"mb-4 mx-0"}>My Cart</h3>
        <Row className={"mt-3"}>
          <Col md={"8"}>
            <h5 className={"mx-0"}>Review My Order</h5>
            <div className={`${styles.orderReview}`}>
              <CartItem />
              <CartItem />
              <CartItem />
            </div>
          </Col>
          <Col md={4} className={`ps-md-4`}>
            <div className={"m-none mt-2 mt-sm-0"}>
              <h5 className="mx-0 mb-3 mb-sm-2">Shipment Address</h5>
              <div className={`${styles.topBorder}`}>
                <p className={`${styles.address} mt-2`}>
                  Street: Jl Daan Mogot Km 14/9, Dki Jakarta City: Dki Jakarta
                  State/province/area: Jakarta Phone number 0-21-545-6711 Zip
                  code 11730 Country calling code +62 Country Indonesia
                </p>
              </div>
            </div>
            <div className={`${styles.orderReview} py-3`}>
              <div className="d-flex justify-content-between align-items center">
                <p className="m-none">Subtotal</p>
                <p className="m-none">
                  <NumberFormat
                    value={134000}
                    thousandSeparator={"."}
                    decimalSeparator={","}
                    prefix={"Rp. "}
                    displayType={"text"}
                  />
                </p>
              </div>
              <div className="d-flex justify-content-between align-items center">
                <p className="m-none">Shipment Services</p>
                <p className="m-none">
                  <NumberFormat
                    value={6000}
                    thousandSeparator={"."}
                    decimalSeparator={","}
                    prefix={"Rp. "}
                    displayType={"text"}
                  />
                </p>
              </div>
              <div className="d-flex justify-content-between align-items center">
                <p className="m-none">Qty</p>
                <p className="m-none">3</p>
              </div>
            </div>
            <div
              className={`d-flex justify-content-between align-items-center ${styles.price} mt-2`}
            >
              <p className="m-none">Total</p>
              <p className="m-none">
                <NumberFormat
                  value={140000}
                  thousandSeparator={"."}
                  decimalSeparator={","}
                  prefix={"Rp. "}
                  displayType={"text"}
                />
              </p>
            </div>

            <button className={`${styles.payBtn} my-3`}>Pay</button>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default CartPage;
