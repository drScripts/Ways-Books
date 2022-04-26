import { Navbar, Nav, Container, Badge } from "react-bootstrap";
import logo from "../../assets/images/logo.png";
import { NavbarButton, DropDownProfile } from "../../components";
import { UserContext } from "../../context/UserContext";
import { useContext, useState } from "react";
import cartLogo from "../../assets/icons/cart.png";
import { Link } from "react-router-dom";
import styles from "./Navbars.module.css";

const Navbars = ({ isAdmin = false }) => {
  const [state] = useContext(UserContext);
  const [isLogin, setIsLogin] = useState(true);
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
  };

  const handleShow = ({ type }) => {
    setIsLogin(type);
    setShow(true);
  };

  return (
    <Navbar expand="lg">
      <Container>
        <Navbar.Brand>
          <Link to={"/"}>
            <img
              src={logo}
              width="120"
              height="60"
              className="d-inline-block align-top"
              alt="React Bootstrap logo"
            />
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto gap-3 align-items-md-center">
            {state?.isLogin ? (
              <>
                <Link to={"/"} className={`${styles.wrapper}`}>
                  <div>
                    <img
                      src={cartLogo}
                      alt="Cart Logo"
                      width={35}
                      height={35}
                    />
                    <Badge bg="" pill className={styles.cartCount}>
                      {state.cart > 9 ? "+9" : state?.cart}
                    </Badge>
                  </div>
                </Link>
                <DropDownProfile isAdmin={isAdmin} />
              </>
            ) : (
              <>
                <NavbarButton
                  title={"Login"}
                  isLogin={isLogin}
                  handleClose={handleClose}
                  handleShow={handleShow}
                  show={show}
                />
                <NavbarButton
                  title={"Register"}
                  outlineOnly={false}
                  isLogin={isLogin}
                  handleClose={handleClose}
                  handleShow={handleShow}
                  show={show}
                />{" "}
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navbars;
