import React from "react";
import { Container } from "react-bootstrap";
import { Navbars, HeroLayer } from "../../containers";
import DataTable, { createTheme } from "react-data-table-component";
import NumberFormat from "react-number-format";
import { Thumbnailtable, TableDescription } from "../../components";

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
    name: <th className={"text-danger"}>Title</th>,
    selector: (row) => row.title,
    cell: (row) => (
      <a
        className={"text-decoration-underline text-primary ellipsis max2"}
        href={row?.attachment}
        target={"_blank"}
        rel="noreferrer"
      >
        {row?.title}
      </a>
    ),
  },
  {
    name: <th className={"text-danger"}>Author</th>,
    selector: (row) => row.author,
  },
  {
    name: <th className={"text-danger"}>Publication Date</th>,
    selector: (row) => row.publicationDate,
  },
  {
    name: <th className={"text-danger"}>Pages</th>,
    selector: (row) => row.pages,
  },
  {
    name: <th className={"text-danger"}>ISBM</th>,
    selector: (row) => row.ISBN,
  },
  {
    name: <th className={"text-danger"}>Price</th>,
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
    name: <th className={"text-danger"}>Thumbnail</th>,
    selector: (row) => row.thumbnail,
    cell: (row) => <Thumbnailtable url={row.thumbnail} />,
  },
];

const data = [
  {
    id: 1,
    no: 1,
    title: "Sebuah Seni untuk bersikap Bodo Amat",
    author: "Mark Manson",
    publicationDate: "12 August 2018",
    pages: 264,
    ISBN: 9786020395227,
    price: 75000,
    description:
      "Bagi Heidy Theapila, latar belakang keluarga membuatnya tak mudah menemukan pasangan sejiwa. Tapi, ceritanya berbeda dengan Mirza. Heidy meyakini lelaki itu mencintainya dengan tulus. Namun, keyakinannya tumbang. Pertemuan mereka bukan cuma karena campur tangan Allah semata. Melainkan karena skenario rapi yang berkaitan dengan materi. Marah sekaligus patah hati, Heidy membatalkan rencana masa depannya dan memilih kabur ke Italia. Langkahnya mungkin tak dewasa, tapi Heidy butuh ruang untuk meninjau ulang semua rencana dalam hidupnya. Lalu, Allah memberinya kejutan.",
    thumbnail:
      "https://0.academia-photos.com/attachment_thumbnails/59329148/mini_magick20190520-30523-2845pp.png?1558367964",
    attachment:
      "http://badanbahasa.kemdikbud.go.id/lamanbahasa/sites/default/files/SD-Cerita%20dari%20Tanah%20Papua.pdf",
  },
  {
    id: 1,
    no: 1,
    title: "Sebuah Seni untuk bersikap Bodo Amat",
    author: "Mark Manson",
    publicationDate: "12 August 2018",
    pages: 264,
    ISBN: 9786020395227,
    price: 75000,
    description:
      "Bagi Heidy Theapila, latar belakang keluarga membuatnya tak mudah menemukan pasangan sejiwa. Tapi, ceritanya berbeda dengan Mirza. Heidy meyakini lelaki itu mencintainya dengan tulus. Namun, keyakinannya tumbang. Pertemuan mereka bukan cuma karena campur tangan Allah semata. Melainkan karena skenario rapi yang berkaitan dengan materi. Marah sekaligus patah hati, Heidy membatalkan rencana masa depannya dan memilih kabur ke Italia. Langkahnya mungkin tak dewasa, tapi Heidy butuh ruang untuk meninjau ulang semua rencana dalam hidupnya. Lalu, Allah memberinya kejutan.",
    thumbnail:
      "https://0.academia-photos.com/attachment_thumbnails/59329148/mini_magick20190520-30523-2845pp.png?1558367964",
    attachment:
      "http://badanbahasa.kemdikbud.go.id/lamanbahasa/sites/default/files/SD-Cerita%20dari%20Tanah%20Papua.pdf",
  },
];

const ListBookPage = () => {
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
