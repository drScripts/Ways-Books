import { Navbars, HeroLayer, BookList } from "../../containers";
import { PromoCard } from "../../components";
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
      <BookList />
    </div>
  );
};

export default LandingPage;
