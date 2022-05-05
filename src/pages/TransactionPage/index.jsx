import React from "react";
import { Container } from "react-bootstrap";
import { Navbars, HeroLayer } from "../../containers";
import DataTable, { createTheme } from "react-data-table-component";
import NumberFormat from "react-number-format";

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
        when: (row) => row.status === "Approve",
        style: {
          color: "#0ACF83",
        },
      },
      {
        when: (row) => row.status === "Cancel" || row.status === "Pending",
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
        when: (row) => row.status === "Approve",
        style: {
          color: "#0ACF83",
        },
      },
      {
        when: (row) => row.status === "Cancel",
        style: {
          color: "#FF0742",
        },
      },
      {
        when: (row) => row.status === "Pending",
        style: {
          color: "#F7941E",
        },
      },
    ],
    style: {
      fontWeight: "bold",
    },
  },
];

const data = [
  {
    no: 1,
    id: 1,
    user: "Beetlejuice",
    book: "My Own Private Mr. Cool",
    total: 75000,
    status: "Approve",
  },
  {
    no: 2,
    id: 2,
    user: "Ghostbusters",
    book: "Garis Waktu : Sebuah Perjalanan",
    total: 49000,
    status: "Approve",
  },
  {
    no: 3,
    id: 3,
    user: "Amin Subagiyo",
    book: "Ayahku (Bukan) Pembohong",
    total: 130000,
    status: "Cancel",
  },
  {
    no: 4,
    id: 4,
    user: "Haris Astina",
    book: "Panduan Resmi Tes Cpns Cat 2019 / 2020",
    total: 184000,
    status: "Pending",
  },
  {
    no: 5,
    id: 5,
    user: "Haris Astina",
    book: "Panduan Resmi Tes Cpns Cat 2019 / 2020",
    total: 184000,
    status: "Pending",
  },
];

const TransactionPage = () => {
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
