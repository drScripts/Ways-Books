import React, { useState } from "react";
import { useQuery } from "react-query";
import { BookCard, CustomForm } from "../../components";
import API from "../../services";
import { Row, Container } from "react-bootstrap";
import { toast } from "react-toastify";
import LoadingApp from "../LoadingApp";
import styles from "./BookList.module.css";

export default function BookList() {
  const [q, setQ] = useState("");

  const { data, isLoading } = useQuery(
    ["booksChace", q],
    async () => {
      const { data } = await API.get("/books", {
        params: { q },
      });

      return data?.data?.books;
    },
    {
      onError: (err) => {
        const message = err?.response?.data?.message || err.message;
        toast.error(message);
      },
    }
  );

  const changeHandler = (e) => {
    setQ(e.target.value);
  };

  return (
    <>
      <LoadingApp isLoading={isLoading && !q} />
      <Container className="mt-5 mb-4">
        <div className="d-flex mb-4 justify-content-between align-items-center">
          <h1 className="m-none flex-grow-1">List Book</h1>
          <CustomForm
            name={"q"}
            placeholder={"Search your books...."}
            type={"text"}
            className={styles.searchForm}
            onChangeHandler={changeHandler}
          />
        </div>

        <Row md={5} sm={2} xs={2}>
          {data?.map((book) => (
            <BookCard
              author={book?.author}
              price={book?.price}
              src={book?.thumbnail}
              title={book?.title}
              id={book?.id}
              key={book?.id}
            />
          ))}
        </Row>
      </Container>
    </>
  );
}
