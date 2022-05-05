import React from "react";
import { Button, Container } from "react-bootstrap";
import { Navbars, HeroLayer } from "../../containers";
import DataTable, { createTheme } from "react-data-table-component";
import NumberFormat from "react-number-format";
import { Thumbnailtable, TableDescription } from "../../components";
import API from "../../services";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";

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
    name: <h6 className={"text-danger"}>Title</h6>,
    selector: (row) => row.title,
    cell: (row) => (
      <a
        className={"text-decoration-underline text-primary ellipsis max2"}
        href={row?.bookAttachment}
        target={"_blank"}
        rel="noreferrer"
      >
        {row?.title}
      </a>
    ),
  },
  {
    name: <h6 className={"text-danger"}>Author</h6>,
    selector: (row) => row.author,
  },
  {
    name: <h6 className={"text-danger"}>Publication Date</h6>,
    selector: (row) => row.publicationDate,
  },
  {
    name: <h6 className={"text-danger"}>Pages</h6>,
    selector: (row) => row.pages,
  },
  {
    name: <h6 className={"text-danger"}>ISBM</h6>,
    selector: (row) => row.ISBN,
  },
  {
    name: <h6 className={"text-danger"}>Price</h6>,
    selector: (row) => row.price,
    sortable: true,
    cell: (row) => (
      <NumberFormat
        value={row.price}
        thousandSeparator={"."}
        decimalSeparator={","}
        displayType={"text"}
        prefix={"Rp. "}
      />
    ),
  },
  {
    name: <h6 className={"text-danger"}>Thumbnail</h6>,
    selector: (row) => row.thumbnail,
    cell: (row) => <Thumbnailtable url={row.thumbnail} />,
  },
  {
    name: <h6 className={"text-danger"}>action</h6>,
    selector: (row) => row.thumbnail,
    cell: (row) => (
      <div>
        <Link to={"/"} className={"w-100 my-2 btn btn-warning"}>
          Edit
        </Link>
        <Button variant="danger" className={"w-100 mb-2"}>
          Delete
        </Button>
      </div>
    ),
  },
];

const ListBookPage = () => {
  const getBooks = async () => {
    const { data } = await API.get("/books/admin");
    return data?.data?.books;
  };

  const { data } = useQuery("booksChace", getBooks);

  return (
    <div>
      <Navbars isAdmin />
      <HeroLayer />
      <Container className={"my-5"}>
        <h3>List Book</h3>
        <div>
          <DataTable
            striped
            columns={columns}
            data={data}
            pagination
            theme="light"
            responsive
            expandableRows
            expandableRowsComponent={({ data }) => (
              <TableDescription description={data?.description} />
            )}
          />
        </div>
      </Container>
    </div>
  );
};

export default ListBookPage;
