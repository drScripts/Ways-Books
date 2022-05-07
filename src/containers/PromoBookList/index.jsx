import React from "react";
import { useQuery } from "react-query";
import { toast } from "react-toastify";
import { PromoCard } from "../../components";
import API from "../../services";
import styles from "./PromoBookList.module.css";

export default function PromoBookList() {
  const getPromoBook = async () => {
    const { data } = await API.get("/promo-books");
    return data?.data?.promoBooks;
  };

  const { data } = useQuery("promoBookChace", getPromoBook, {
    onError: (err) => {
      const message = err?.response?.data?.message || err?.message;

      toast.error(message);
    },
  });

  return (
    <div className={`${styles.promo} mt-5`}>
      {data?.map((promoBook) => (
        <PromoCard book={promoBook?.book} key={promoBook?.id} />
      ))}
    </div>
  );
}
