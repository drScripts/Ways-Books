import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { HistoryTransactionItem } from "../../components";
import {
  HeroLayer,
  HistoryTransactionInformation,
  LoadingApp,
  Navbars,
} from "../../containers";
import API from "../../services";
import styles from "./HistoryTransactionPage.module.css";

export default function HistoryTransactionPage() {
  document.title = "WaysBook | History Transaction";
  const { id } = useParams();
  const [qty, setQty] = useState(0);

  const getTransaction = async () => {
    const { data } = await API.get(`/transaction/${id}`);
    const transaction = data?.data?.transaction;

    let qtyTemp = 0;
    transaction?.transactionItems?.forEach((item) => {
      qtyTemp += item?.qty;
    });

    setQty(qtyTemp);
    return transaction;
  };

  const { data, isLoading } = useQuery("transactionChace", getTransaction, {
    onError: (err) => {
      const message = err?.response?.data?.message || err?.message;
      toast.error(message);
    },
  });

  return (
    <div>
      <LoadingApp isLoading={isLoading} />
      <Navbars />
      <HeroLayer />
      <Container className={"px-md-5 my-3 my-sm-5"}>
        <h3 className={"mb-4 mx-0"}>My Transaction - {data?.status}</h3>
        <Row className={"mt-3"}>
          <Col md={"8"}>
            <h5 className={"mx-0"}>Review My Order</h5>
            <div className={`${styles.orderReview}`}>
              {data?.transactionItems?.map((item) => (
                <HistoryTransactionItem
                  book={item?.book}
                  item={item}
                  key={item?.id}
                />
              ))}
            </div>
          </Col>
          <HistoryTransactionInformation
            qty={qty}
            total={data?.total}
            transaction={data}
          />
        </Row>
      </Container>
    </div>
  );
}
