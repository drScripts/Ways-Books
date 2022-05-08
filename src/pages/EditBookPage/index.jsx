import { useEffect, useState } from "react";
import { Container, Form } from "react-bootstrap";
import { Navbars, HeroLayer, LoadingApp } from "../../containers";
import { InputFileButton } from "../../components";
import NumberFormat from "react-number-format";
import attachment from "../../assets/icons/attachment.png";
import styles from "./EditBookPage.module.css";
import addBookWhite from "../../assets/icons/white-add-book.png";
import { toast } from "react-toastify";
import API from "../../services";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "react-query";

const EditBookPage = () => {
  document.title = "WaysBook Admin | Edit Book";
  const navigate = useNavigate();
  const [state, setState] = useState({
    title: "",
    publicationDate: "",
    page: "",
    ISBN: "",
    price: "",
    description: "",
    attachment: null,
    attachment_url: null,
    thumbnail: null,
    thumbnail_url: "",
    author: "",
  });
  const [publicationType, setPublicationType] = useState("text");
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();

  const getBook = async () => {
    const { data } = await API.get(`/book/${id}`);
    return data?.data?.book;
  };
  const { data, isLoading: bookLoading } = useQuery("bookChace", getBook);

  const onChangeHandler = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const onFileChange = ({ url, file, name }) => {
    setState({
      ...state,
      [name]: file,
      [name + "_url"]: url,
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const formBody = new FormData();

    const {
      attachment,
      thumbnail,
      description,
      title,
      page,
      price,
      publicationDate,
      ISBN,
      author,
    } = state;
    const newPrice = parseInt(
      price?.toString()?.split("Rp. ")[1]?.replace(".", "")
    );

    if (thumbnail?.type) {
      formBody.append("image", thumbnail);
    }
    if (attachment?.type) {
      formBody.append("pdf", attachment);
    }
    formBody.append("description", description);
    formBody.append("title", title);
    formBody.append("pages", page);
    formBody.append("price", newPrice || price);
    formBody.append("publicationDate", publicationDate);
    formBody.append("ISBN", ISBN);
    formBody.append("author", author);

    const { status, data } = await API.patch(`/book/${id}`, formBody).catch(
      (err) => err?.response
    );

    setIsLoading(false);
    if (status !== 201) {
      toast.error(data?.message);
    } else {
      navigate("/admin/books");
    }
  };

  useEffect(() => {
    if (data) {
      const thumbnailName = data?.thumbnail?.split("/").pop();
      const attachmentName = data?.bookAttachment?.split("/").pop();
      setState({
        ISBN: data?.ISBN,
        attachment_url: data?.bookAttachment,
        thumbnail_url: data?.thumbnail,
        author: data?.author,
        price: data?.price,
        description: data?.description,
        page: data?.pages,
        publicationDate: data?.publicationDate,
        title: data?.title,
        attachment: { name: attachmentName },
        thumbnail: { name: thumbnailName },
      });
    }
  }, [data]);

  return (
    <div>
      <LoadingApp isLoading={bookLoading || isLoading} />
      <Navbars isAdmin />
      <HeroLayer />
      <Container className={"px-md-5 my-5"}>
        <h3>Edit Book</h3>

        <Form onSubmit={onSubmit}>
          <Form.Group className="mb-3" controlId="title">
            <Form.Control
              name="title"
              type="text"
              placeholder="Title"
              required
              onChange={onChangeHandler}
              className={`${styles.overrideInput}`}
              value={state?.title}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="author">
            <Form.Control
              name="author"
              type="text"
              placeholder="Author"
              required
              onChange={onChangeHandler}
              className={`${styles.overrideInput}`}
              value={state?.author}
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
              value={state?.publicationDate}
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
              value={state?.page}
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
              value={state?.ISBN}
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
              value={state?.price}
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
              value={state?.description}
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
            <button className={`${styles.customBtn} mt-3`}>
              Edit Book
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

export default EditBookPage;
