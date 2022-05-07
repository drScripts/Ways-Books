import { Navbars, HeroLayer, BookList, PromoBookList } from "../../containers";

const LandingPage = () => {
  document.title = "WaysBook | Home";
  return (
    <div>
      <Navbars />
      <HeroLayer backgroundWhite />
      <h1 className="text-center text-vollkorn mt-5 mb-5">
        With us, you can shop online & help <br /> save your high street at the
        same time
      </h1>

      <PromoBookList />
      <BookList />
    </div>
  );
};

export default LandingPage;
