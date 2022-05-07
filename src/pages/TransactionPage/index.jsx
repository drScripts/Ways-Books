import React from "react";
import { Container } from "react-bootstrap";
import { Navbars, HeroLayer } from "../../containers";
import DataTable, { createTheme } from "react-data-table-component";
import NumberFormat from "react-number-format";
import { useQuery } from "react-query";
import API from "../../services";
import { toast } from "react-toastify";

createTheme("light", {
  background: {
    default: "#F1F1F1",
  },
  striped: {
    default: "#FFF",
  },
});

const columns = [
  {
    name: <h6 className={"text-danger"}>No</h6>,
    selector: (row) => row.no,
    sortable: true,
  },
  {
    name: <h6 className={"text-danger"}>Users</h6>,
    selector: (row) => row.user,
  },
  {
    name: <h6 className={"text-danger"}>Product Purchased</h6>,
    selector: (row) => row.book,
  },
  {
    name: <h6 className={"text-danger"}>Total Payment</h6>,
    selector: (row) => row.total,
    sortable: true,
    conditionalCellStyles: [
      {
        when: (row) => row.status?.toLowerCase() === "approve",
        style: {
          color: "#0ACF83",
        },
      },
      {
        when: (row) =>
          row.status?.toLowerCase() === "cancel" ||
          row.status?.toLowerCase() === "pending",
        style: {
          color: "#FF0742",
        },
      },
    ],
    style: {
      fontWeight: "bold",
    },
    cell: (row) => (
      <NumberFormat
        value={row.total}
        thousandSeparator={"."}
        decimalSeparator={","}
        displayType={"text"}
        prefix={"Rp. "}
      />
    ),
  },
  {
    name: <h6 className={"text-danger"}>Status Payment</h6>,
    selector: (row) => row.status,
    conditionalCellStyles: [
      {
        when: (row) => row.status?.toLowerCase() === "approve",
        style: {
          color: "#0ACF83",
        },
      },
      {
        when: (row) => row.status?.toLowerCase() === "cancel",
        style: {
          color: "#FF0742",
        },
      },
      {
        when: (row) => row.status?.toLowerCase() === "pending",
        style: {
          color: "#F7941E",
        },
      },
    ],
    style: {
      fontWeight: "bold",
      textTransform: "capitalize",
    },
  },
];

const TransactionPage = () => {
  document.title = "WaysBook Admin | Transaction";
  const getTransaction = async () => {
    const { data } = await API.get("/transactions/all");

    const transactions = data?.data?.transactions;

    let no = 1;
    const mappedTransaction = transactions?.map((transaction) => {
      let booksName = "";

      transaction?.transactionItems?.forEach((item) => {
        booksName += item?.book?.title + ", ";
      });

      return {
        no: no++,
        id: transaction?.id,
        user: transaction?.user?.name,
        book: booksName,
        total: transaction?.total,
        status: transaction?.status,
      };
    });
    return mappedTransaction;
  };
  const { data } = useQuery("transactionChace", getTransaction, {
    onError: (err) => {
      const message = err?.response?.data?.message || err?.message;
      toast.error(message);
    },
  });

  return (
    <div>
      <Navbars isAdmin />
      <HeroLayer />
      <Container className={"px-md-5 mt-5"}>
        <h3>Incoming Transaction</h3>
        <div>
          <DataTable
            theme="light"
            columns={columns}
            striped
            data={data}
            pagination
            responsive
          />
        </div>
      </Container>
    </div>
  );
};

export default TransactionPage;
