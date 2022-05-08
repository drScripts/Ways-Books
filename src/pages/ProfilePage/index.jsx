import React, { useContext, useState } from "react";
import { Container, Card, Row, Col } from "react-bootstrap";
import {
  Navbars,
  HeroLayer,
  ProfileHistoryTab,
  ProfileTabController,
  LoadingApp,
} from "../../containers";
import { ProfileItem } from "../../components";
import { Link } from "react-router-dom";
import styles from "./ProfilePage.module.css";
import envelope from "../../assets/icons/envelope.png";
import gender from "../../assets/icons/gender.png";
import phone from "../../assets/icons/phone.png";
import marker from "../../assets/icons/place.png";
import profile from "../../assets/images/profile.jpg";
import { UserContext } from "../../context/UserContext";
import { useQuery } from "react-query";
import API from "../../services";
import { toast } from "react-toastify";

const ProfilePage = () => {
  document.title = "WaysBook | Profile";
  const [state, dispatch] = useContext(UserContext);
  const [tabs, setTabs] = useState("purchased");
  const [purchasedBooks, setPurchasedBooks] = useState([]);

  const getProfile = async () => {
    const { data } = await API.get("/profile");
    const user = data?.data?.user;
    dispatch({
      type: "USER_UPDATE",
      payload: { user },
    });

    const books = [];

    user?.transaction?.forEach((transaction) => {
      transaction?.transactionItems?.forEach((item) => {
        let isFound = false;
        books.forEach((book) => {
          if (book?.book?.id === item?.book?.id) {
            isFound = true;
          }
        });

        if (!isFound) {
          books.push(item);
        }
      });
    });

    setPurchasedBooks(books);
  };

  const { isLoading } = useQuery("profileChace", getProfile, {
    onError: (err) => {
      const message = err?.response?.data?.message || err?.message;
      toast.error(message);
    },
  });

  return (
    <div>
      <LoadingApp isLoading={isLoading} />
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
        <ProfileHistoryTab onChange={setTabs} className={"my-3"} />
        <ProfileTabController tabName={tabs} purchasedBook={purchasedBooks} />
      </Container>
    </div>
  );
};

export default ProfilePage;
