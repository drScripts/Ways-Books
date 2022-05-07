import React from "react";
import { Row } from "react-bootstrap";
import { PurchasedBookCard } from "../../components";

export default function PurchasedBook({ books }) {
  return (
    <div>
      <h3>My Books</h3>
      {books?.length <= 0 ? (
        <h2 className="text-center mt-5">You Don't Have Purchased Books</h2>
      ) : (
        <Row md={5} xs={2}>
          {books?.map((book) => (
            <PurchasedBookCard book={book?.book} item={book} key={book?.id} />
          ))}
        </Row>
      )}
    </div>
  );
}
