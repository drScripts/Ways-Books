import React from "react";
import { Container, Form, Card } from "react-bootstrap";
import { Navbars, HeroLayer } from "../../containers";
import profile from "../../assets/images/profile.jpg";
import styles from "./ComplainPage.module.css";
import sendLogo from "../../assets/icons/send_logo.png";

const ComplainPage = ({ isAdmin = false }) => {
  return (
    <div>
      <Navbars isAdmin={isAdmin} />
      <HeroLayer />
      <Container>
        {isAdmin && <h4>Customer Complain</h4>}
        <div className="d-flex gap-3">
          {isAdmin && (
            <div className="left-side">
              <Card className={styles.costumerField}>
                <Card.Body>
                  <div
                    className={`${styles.profileItem} d-flex align-items-center gap-3`}
                  >
                    <img
                      src={profile}
                      alt="User Profile"
                      className={styles.profile}
                      width={45}
                      height={45}
                    />
                    <p className={"m-none"}>Radif Ganteng</p>
                  </div>
                </Card.Body>
              </Card>
            </div>
          )}
          <div className="right-side flex-fill">
            <div className={`${styles.header} d-flex gap-3`}>
              <img
                src={profile}
                alt="Profile Recipient"
                className={`${styles.profile}`}
                width={48}
                height={48}
              />
              <div>
                <h6 className={`m-none`}>Admin Si Paling Cepat</h6>
                <div className={"m-none d-flex align-items-center gap-1"}>
                  <div className={`${styles.indicator} ${styles.greens}`}></div>

                  <div className={`${styles.indicatorText} `}>offline</div>
                </div>
              </div>
            </div>
            <div
              className={`${styles.chatField} ${
                !isAdmin ? styles.fullSize : ""
              } d-flex flex-column`}
            >
              <div className={`${styles.chatFields}`}>
                <div className={`${styles.right}`}>
                  <Card className={`${styles.messages}`}>
                    <Card.Body>This is some text within a card body.</Card.Body>
                  </Card>
                </div>
                <div>
                  <Card className={`${styles.messages}`}>
                    <Card.Body>This is some text within a card body.</Card.Body>
                  </Card>
                </div>
                <div className={`${styles.right}`}>
                  <Card className={`${styles.messages}`}>
                    <Card.Body>This is some text within a card body.</Card.Body>
                  </Card>
                </div>
                <div>
                  <Card className={`${styles.messages}`}>
                    <Card.Body>This is some text within a card body.</Card.Body>
                  </Card>
                </div>
                <div className={`${styles.right}`}>
                  <Card className={`${styles.messages}`}>
                    <Card.Body>This is some text within a card body.</Card.Body>
                  </Card>
                </div>
                <div>
                  <Card className={`${styles.messages}`}>
                    <Card.Body>This is some text within a card body.</Card.Body>
                  </Card>
                </div>
                <div className={`${styles.right}`}>
                  <Card className={`${styles.messages}`}>
                    <Card.Body>This is some text within a card body.</Card.Body>
                  </Card>
                </div>
                <div>
                  <Card className={`${styles.messages}`}>
                    <Card.Body>This is some text within a card body.</Card.Body>
                  </Card>
                </div>
                <div className={`${styles.right}`}>
                  <Card className={`${styles.messages}`}>
                    <Card.Body>This is some text within a card body.</Card.Body>
                  </Card>
                </div>
              </div>
              <div className={"d-flex p-2 gap-3"}>
                <Form.Group
                  controlId="exampleForm.ControlInput1"
                  className={`flex-fill`}
                >
                  <Form.Control
                    className={`${styles.formMessage}`}
                    type="email"
                    placeholder="Write your message here ..."
                  />
                </Form.Group>
                <button className={`${styles.btnSend}`}>
                  <img src={sendLogo} alt="Send Logo" width={16} height={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default ComplainPage;
