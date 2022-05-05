import React, { useContext } from "react";
import { Container, Card, Row, Col } from "react-bootstrap";
import { Navbars, HeroLayer } from "../../containers";
import { ProfileItem, PurchasedBookCard } from "../../components";
import { Link } from "react-router-dom";
import styles from "./ProfilePage.module.css";
import envelope from "../../assets/icons/envelope.png";
import gender from "../../assets/icons/gender.png";
import phone from "../../assets/icons/phone.png";
import marker from "../../assets/icons/place.png";
import profile from "../../assets/images/profile.jpg";
import { UserContext } from "../../context/UserContext";

const ProfilePage = () => {
  const [state] = useContext(UserContext);

  return (
    <div>
      <Navbars />
      <HeroLayer />
      <Container className={"px-md-5 mt-5"}>
        <h3>Profile</h3>
        <Card className={`${styles.profileCard} mb-5`}>
          <Card.Body>
            <Row>
              <Col md={9}>
                <ProfileItem
                  src={envelope}
                  title={"Email"}
                  value={state?.user?.email}
                />
                <ProfileItem
                  src={gender}
                  title={"Gender"}
                  value={state?.user?.profile?.gender}
                />
                <ProfileItem
                  src={phone}
                  title={"Mobile Phone"}
                  value={state?.user?.profile?.phoneNumber}
                />
                <ProfileItem
                  src={marker}
                  title={"Address"}
                  value={state?.user?.profile?.address}
                />
              </Col>
              <Col md={3}>
                <img
                  src={state?.user?.profile?.profilePict || profile}
                  alt="Profile User"
                  className={`${styles.profile} rounded-3`}
                />
                <Link to={"/profile/edit"}>
                  <button className={`${styles.button} mt-3`}>
                    Edit Profile
                  </button>
                </Link>
              </Col>
            </Row>
          </Card.Body>
        </Card>
        <h3>My Books</h3>
        <Row md={5} xs={2}>
          <PurchasedBookCard />
          <PurchasedBookCard />
          <PurchasedBookCard />
        </Row>
      </Container>
    </div>
  );
};

export default ProfilePage;
