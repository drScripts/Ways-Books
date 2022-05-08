import React from "react";
import { useQuery } from "react-query";
import { BookCard } from "../../components";
import API from "../../services";
import { Row, Container } from "react-bootstrap";
import { toast } from "react-toastify";
import LoadingApp from "../LoadingApp";

export default function BookList() {
  const { data, isLoading } = useQuery(
    ["booksChace"],
    async () => {
      const { data } = await API.get("/books");

      return data?.data?.books;
    },
    {
      onError: (err) => {
        const message = err?.response?.data?.message || err.message;
        toast.error(message);
      },
    }
  );

  return (
    <>
      <LoadingApp isLoading={isLoading} />
      <Container className="mt-5 mb-4">
        <h1 className="mb-4">List Book</h1>

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
