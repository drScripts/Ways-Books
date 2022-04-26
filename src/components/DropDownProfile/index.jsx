import React from "react";
import { Dropdown } from "react-bootstrap";
import profile from "../../assets/images/profile.jpg";
import styles from "./DropDownProfile.module.css";
import profileIcon from "../../assets/icons/profile.png";
import complain from "../../assets/icons/complain.png";
import logout from "../../assets/icons/logout.png";
import { Link } from "react-router-dom";

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

const DropDownProfile = () => {
  return (
    <Dropdown align={"end"}>
      <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
        <img
          className={styles.profile}
          src={profile}
          alt="Profile"
          width={45}
          height={45}
        />
      </Dropdown.Toggle>

      <Dropdown.Menu className={`${styles.menus} shadow`}>
        <div className={styles.arrow}>
          <div className={styles.arrowUp}></div>
        </div>
        <Dropdown.Item className={"align-items-center d-flex gap-2"}>
          <img src={profileIcon} alt="Profile" width={20} height={20} />
          Profile
        </Dropdown.Item>
        <Dropdown.Item>
          <Link to={"/complain"} className={"align-items-center d-flex gap-2"}>
            <img src={complain} alt="Complain" width={20} height={20} />
            Complain
          </Link>
        </Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item className={"align-items-center d-flex gap-2"}>
          <img src={logout} alt="Logout" width={20} height={20} />
          Log out
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default DropDownProfile;
