import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useMutation, useQuery } from "react-query";
import { toast } from "react-toastify";
import { CustomSelect } from "../../components";
import { HeroLayer, Navbars } from "../../containers";
import API from "../../services";

export default function PromoBooksPage() {
  const [state, setState] = useState([]);

  const getPromoBooks = async () => {
    const { data } = await API.get("/promo-books");
    const promoBooks = data?.data?.promoBooks;

    const mappedPromo = promoBooks?.map((promo) => ({
      label: promo?.book?.title,
      value: promo?.book?.id,
    }));

    return mappedPromo;
  };

  const getBooks = async () => {
    const { data } = await API.get("/books");
    const books = data?.data?.books;
    const mappedBooks = books?.map((book) => ({
      label: book?.title,
      value: book?.id,
    }));
    return mappedBooks;
  };

  const { data: value, refetch } = useQuery("promoChace", getPromoBooks, {
    onError: (err) => {
      const message = err?.response?.data?.message || err?.message;
      toast.error(message);
    },
  });

  const { data: options } = useQuery("booksChace", getBooks, {
    onError: (err) => {
      const message = err?.response?.data?.message || err?.message;
      toast.error(message);
    },
  });

  const onSelectChange = (value) => {
    setState(value);
  };

  const updatePromo = async () => {
    const idBooks = state?.map((book) => book?.value);
    const bodyData = JSON.stringify({ idBooks });

    const { data } = await API.patch("/promo-book", bodyData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    toast.success("success update");
    refetch();
    return data;
  };

  const { mutate: onSubmit } = useMutation(updatePromo, {
    onError: (err) => {
      const message = err?.response?.data?.message || err?.message;

      toast.error(message);
    },
  });

  useEffect(() => {
    if (value) {
      setState(value);
    }
  }, [value]);

  return (
    <div>
      <Navbars isAdmin />
      <HeroLayer />
      <Container>
        <h2>Promo Books</h2>
        <CustomSelect
          isMulti
          value={state}
          options={options}
          placeHolder={"Please select promo books"}
          name={"promo"}
          onChange={onSelectChange}
        />
        <div className="text-end mt-3">
          <button className="customBtn" onClick={onSubmit}>
            Update Promo
          </button>
        </div>
      </Container>
    </div>
  );
}
