import { useState } from "react";
import { Container, Form } from "react-bootstrap";
import { Navbars, HeroLayer } from "../../containers";
import { InputFileButton } from "../../components";
import NumberFormat from "react-number-format";
import attachment from "../../assets/icons/attachment.png";
import styles from "./AddBookPage.module.css";
import addBookWhite from "../../assets/icons/white-add-book.png";

const AddBookPage = () => {
  const [state, setState] = useState({
    title: "",
    publicationDate: "",
    page: null,
    ISBN: null,
    price: "",
    description: "",
    attachment: null,
    thumbnail: null,
    thumbnail_url: "",
  });
  const [publicationType, setPublicationType] = useState("text");

  const onChangeHandler = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const onFileChange = ({ url, file, name }) => {
    console.log(name);
    setState({
      ...state,
      [name]: file,
      [name + "_url"]: url,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const newPrice = parseInt(state?.price?.split("Rp. ")[1].replace(".", ""));
    console.log(newPrice);
    console.log(state);
  };

  return (
    <div>
      <Navbars isAdmin />
      <HeroLayer />
      <Container className={"px-md-5 my-5"}>
        <h3>Add Book</h3>

        <Form onSubmit={onSubmit}>
          <Form.Group className="mb-3" controlId="title">
            <Form.Control
              name="title"
              type="text"
              placeholder="Title"
              required
              onChange={onChangeHandler}
              className={`${styles.overrideInput}`}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="publicationDate">
            <Form.Control
              name="publicationDate"
              type={publicationType}
              placeholder="Publication Date"
              required
              onFocus={() => setPublicationType("date")}
              onChange={onChangeHandler}
              className={`${styles.overrideInput}`}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="pages">
            <Form.Control
              name="page"
              type="number"
              placeholder="Pages"
              required
              onChange={onChangeHandler}
              className={`${styles.overrideInput}`}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="isbn">
            <Form.Control
              name="ISBN"
              type="number"
              placeholder="ISBN"
              required
              onChange={onChangeHandler}
              className={`${styles.overrideInput}`}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="price">
            <NumberFormat
              prefix={"Rp. "}
              thousandSeparator={"."}
              decimalSeparator={","}
              type={"text"}
              name={"price"}
              placeholder={"Price"}
              onChange={onChangeHandler}
              className={`${styles.overrideInput} form-control`}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="description">
            <Form.Control
              required
              placeholder="About This Book"
              name="description"
              as="textarea"
              rows={4}
              onChange={onChangeHandler}
              className={`${styles.overrideInput}`}
            />
          </Form.Group>
          <InputFileButton
            src={attachment}
            id={"attachment"}
            accept={"application/pdf"}
            alt={"Book Attachent"}
            onChangeHandler={onFileChange}
            fileName={state?.attachment?.name}
          />
          <div className="mt-3">
            {state?.thumbnail_url && (
              <img
                src={state?.thumbnail_url}
                width={200}
                height={100}
                alt={"Thumbnail"}
                className={"rounded mb-3"}
              />
            )}
            <InputFileButton
              src={attachment}
              id={"thumbnail"}
              accept={"image/*"}
              alt={"Book Thumbnail"}
              onChangeHandler={onFileChange}
              fileName={state?.thumbnail?.name}
            />
          </div>
          <div className="text-end">
            <button className={`${styles.customBtn}`}>
              Add Book
              <img
                src={addBookWhite}
                alt="Add Book White"
                width={25}
                height={25}
                className={"ms-2"}
              />
            </button>
          </div>
        </Form>
      </Container>
    </div>
  );
};

export default AddBookPage;
