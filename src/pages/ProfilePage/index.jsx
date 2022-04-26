import React from "react";
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

const ProfilePage = () => {
  return (
    <div>
      <Navbars />
      <HeroLayer />
      <Container className={"px-5 mt-5"}>
        <h3>Profile</h3>
        <Card className={`${styles.profileCard} mb-5`}>
          <Card.Body>
            <Row>
              <Col md={9}>
                <ProfileItem
                  src={envelope}
                  title={"Email"}
                  value={"egigans@gmail.com"}
                />
                <ProfileItem src={gender} title={"Gender"} value={"Male"} />
                <ProfileItem
                  src={phone}
                  title={"Mobile Phone"}
                  value={"0812-8623-8911"}
                />
                <ProfileItem
                  src={marker}
                  title={"Address"}
                  value={"Perumahan Permata Bintaro Residence C-3"}
                />
              </Col>
              <Col md={3}>
                <img
                  src={profile}
                  alt="Profile User"
                  className={`${styles.profile} rounded-3`}
                />
                <Link to={"/"}>
                  <button className={`${styles.button} mt-3`}>
                    Edit Profile
                  </button>
                </Link>
              </Col>
            </Row>
          </Card.Body>
        </Card>
        <h3>My Books</h3>
        <Row md={5}>
          <PurchasedBookCard />
          <PurchasedBookCard />
          <PurchasedBookCard />
        </Row>
      </Container>
    </div>
  );
};

export default ProfilePage;
