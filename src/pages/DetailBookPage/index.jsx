import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { Navbars, HeroLayer } from "../../containers";
import thumbnail from "../../assets/images/mock_thumbnail.jpg";
import styles from "./DetailBookPage.module.css";
import whiteCart from "../../assets/icons/white-cart.png";

const DetailBookPage = () => {
  const { id } = useParams();
  console.log(id);
  return (
    <div className={"mb-3"}>
      <Navbars />
      <HeroLayer />
      <Container className={"px-md-5"}>
        <Row xs={1} md={2} className={"mb-4"}>
          <Col>
            <img src={thumbnail} alt="Thumbnail" className={styles.thumbnail} />
          </Col>
          <Col>
            <h1>My Own Private Mr Cool</h1>
            <p className={styles.author}>By. Indah Hanaco</p>

            <div className={"mt-5"}>
              <h4>Publication Date</h4>
              <p className={styles.published}>August 2018</p>
            </div>
            <div>
              <h4>Pages</h4>
              <p className={styles.pages}>264</p>
            </div>
            <div>
              <h4 className="text-danger">ISBN</h4>
              <p className={styles.isbn}>9786020395227</p>
            </div>
            <div>
              <h4>Price</h4>
              <p className={styles.price}>Rp. 75.000</p>
            </div>
          </Col>
        </Row>
        <h1 className={"mb-3"}>About This Book</h1>
        <p className={styles.description}>
          {`Bagi Heidy Theapila, latar belakang keluarga membuatnya tak mudah menemukan pasangan sejiwa. Tapi, ceritanya berbeda dengan Mirza. Heidy meyakini lelaki itu mencintainya dengan tulus. Namun, keyakinannya tumbang. Pertemuan mereka bukan cuma karena campur tangan Allah semata. Melainkan karena skenario rapi yang berkaitan dengan materi. Marah sekaligus patah hati, Heidy membatalkan rencana masa depannya  dan memilih kabur ke Italia. Langkahnya mungkin tak dewasa, tapi Heidy butuh ruang untuk meninjau ulang semua rencana dalam hidupnya. Lalu, Allah memberinya kejutan.\n\n\n Dalam pelayaran menyusuri Venesia, Heidy  bertemu raksasa bermata biru. Graeme MacLeod, pria yang mencuri napasnya di pertemuan pertama mereka. Meski ketertarikan di antara mereka begitu besar, Heidy tidak berniat menjalin asmara singkat. Graeme harus dilupakan. Ketika apa yang terjadi di Venesia tidak bisa tetap ditinggal di Venesia, Heidy mulai goyah. Apalagi Graeme ternyata lelaki gigih yang mengejarnya hingga ke Jakarta dan tak putus asa tatkala ditolak. Meski akhirnya satu per satu rahasia kelam lelaki itu terbuka, Heidy justru kian jatuh cinta. Pertanyaannya, apakah cinta memang benar-benar mampu menyatukan mereka?`}
        </p>
        <div className="text-end">
          <button className={styles.button}>
            Add Cart{" "}
            <img
              src={whiteCart}
              alt="Add to cart"
              width={20}
              height={20}
              className={"ms-2"}
            />
          </button>
        </div>
      </Container>
    </div>
  );
};

export default DetailBookPage;
