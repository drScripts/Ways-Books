import React, { useContext } from "react";
import { Dropdown } from "react-bootstrap";
import profile from "../../assets/images/profile.jpg";
import styles from "./DropDownProfile.module.css";
import profileIcon from "../../assets/icons/profile.png";
import complain from "../../assets/icons/complain.png";
import logout from "../../assets/icons/logout.png";
import addBook from "../../assets/icons/add-book.png";
import listBook from "../../assets/icons/list-book.png";
import { Link } from "react-router-dom";
import { UserContext } from "../../context/UserContext";

const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
  <a
    href="/"
    ref={ref}
    onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}
  >
    {children}
  </a>
));

const DropdownItemAdmin = () => {
  return (
    <div className="px-3">
      <Link to={"/admin/books"} className={"align-items-center d-flex gap-2"}>
        <img src={listBook} alt="List Books" width={20} height={20} />
        List Book
      </Link>
      <Link
        to={"/admin/add-book"}
        className={"align-items-center d-flex gap-2 mt-2"}
      >
        <img src={addBook} alt="Add Books" width={20} height={20} />
        Add Book
      </Link>
      <Link
        to={"/admin/complain"}
        className={"align-items-center d-flex gap-2 mt-2"}
      >
        <img src={complain} alt="Complain" width={20} height={20} />
        Complain
      </Link>
    </div>
  );
};

const DropdownItem = () => {
  return (
    <div className={"px-3"}>
      <Link to={"/profile"} className={"align-items-center d-flex gap-2"}>
        <img src={profileIcon} alt="Profile" width={20} height={20} />
        Profile
      </Link>
      <Link to={"/complain"} className={"align-items-center d-flex gap-2 mt-2"}>
        <img src={complain} alt="Complain" width={20} height={20} />
        Complain
      </Link>
    </div>
  );
};

const DropDownProfile = ({ isAdmin }) => {
  const [state, dispatch] = useContext(UserContext);
  const logoutHandler = () => {
    dispatch({
      type: "USER_LOGOUT",
    });
  };

  return (
    <Dropdown align={"end"}>
      <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
        <img
          className={styles.profile}
          src={state?.user?.profile?.profilePict || profile}
          alt="Profile"
          width={45}
          height={45}
        />
      </Dropdown.Toggle>

      <Dropdown.Menu className={`${styles.menus} shadow`}>
        <div className={styles.arrow}>
          <div className={styles.arrowUp}></div>
        </div>
        {isAdmin ? <DropdownItemAdmin /> : <DropdownItem />}
        <Dropdown.Divider />
        <div
          className={"align-items-center d-flex gap-2 px-3"}
          onClick={logoutHandler}
        >
          <img src={logout} alt="Logout" width={20} height={20} />
          Log out
        </div>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default DropDownProfile;
