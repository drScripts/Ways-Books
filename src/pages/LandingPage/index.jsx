import { Navbars, HeroLayer } from "../../containers";
import { PromoCard, BookCard } from "../../components";
import { Container, Row } from "react-bootstrap";
import styles from "./LandingPage.module.css";

const LandingPage = () => {
  return (
    <div>
      <Navbars />
      <HeroLayer backgroundWhite />
      <h1 className="text-center text-vollkorn mt-5 mb-5">
        With us, you can shop online & help <br /> save your high street at the
        same time
      </h1>

      <div className={`${styles.promo} mt-5`}>
        <PromoCard />
        <PromoCard />
        <PromoCard />
        <PromoCard />
      </div>

      <Container className="mt-5 mb-4">
        <h1>List Book</h1>

        <Row md={5} sm={2} xs={2}>
          <BookCard />
          <BookCard />
          <BookCard />
          <BookCard />
          <BookCard />
          <BookCard />
          <BookCard />
          <BookCard />
          <BookCard />
          <BookCard />
        </Row>
      </Container>
    </div>
  );
};

export default LandingPage;
