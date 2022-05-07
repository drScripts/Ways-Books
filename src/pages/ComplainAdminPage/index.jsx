import React, { useEffect, useRef, useState } from "react";
import { Card, Container, Form } from "react-bootstrap";
import { HeroLayer, Navbars } from "../../containers";
import styles from "./ComplainAdminPage.module.css";
import sendLogo from "../../assets/icons/send_logo.png";
import profile from "../../assets/images/profile.jpg";
import io from "socket.io-client";
import { UserContact } from "../../components";
import ChatItem from "../../components/ChatItem";

let socket;

export default function ComplainAdminPage() {
  document.title = "WaysBook Admin | Complain";
  const [contact, setContact] = useState({});
  const [contacts, setContacts] = useState([]);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [recipientIsOnline, setRecipientIsOnline] = useState(false);
  const [userConnected, setUserConnected] = useState([]);

  const messageRef = useRef();

  const loadUserContacts = () => {
    if (!contact?.sender) {
      socket.emit("load user contact");

      socket.on("user contact loaded", (value) => {
        if (value?.length > 0) {
          setContact(value[0]);
        }
        setContacts(value);
      });
    }
  };

  const messageWatcher = () => {
    socket.on("message loaded", (value) => {
      setMessages(value);
    });
  };

  const onNewMessage = () => {
    socket.on("new message", () => {
      socket.emit("load message", contact?.sender?.id);
    });
  };

  const submitHandler = () => {
    if (message) {
      socket.emit("send message", contact?.sender?.id, message);
    }

    setMessage("");
  };

  const onKeyPressed = (e) => {
    if (e.code === "Enter") {
      submitHandler();
    }
  };

  const userConnectedchange = () => {
    socket.emit("get connected user");
    socket.on("user connected update", (value) => {
      setUserConnected(value);
    });
  };

  useEffect(() => {
    socket = io(process.env.REACT_APP_SERVER_URL, {
      auth: {
        token: localStorage.getItem("usrtkn"),
      },
    });

    onNewMessage();
    loadUserContacts();
    messageWatcher();
    userConnectedchange();

    if (messageRef.current) {
      messageRef.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
        inline: "nearest",
      });
    }
    return () => {
      socket.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messages]);

  useEffect(() => {
    if (contact?.sender?.id) {
      socket.emit("load message", contact?.sender?.id);
    }
  }, [contact?.sender?.id]);

  useEffect(() => {
    if (userConnected.length < contact?.sender?.id) {
      setRecipientIsOnline(false);
    } else {
      if (userConnected[contact?.sender?.id]) {
        setRecipientIsOnline(true);
      } else {
        setRecipientIsOnline(false);
      }
    }
  }, [userConnected, contact]);

  const onContactChange = (contact) => {
    setContact(contact);
  };

  return (
    <div>
      <Navbars isAdmin />
      <HeroLayer />
      <Container>
        <h4>Customer Complain</h4>
        <div className="d-flex gap-3">
          <div className="left-side">
            <Card className={`${styles.costumerField} `}>
              {contacts?.length > 0 ? (
                contacts?.map((contactuser) => (
                  <UserContact
                    contact={contactuser}
                    key={contactuser?.id}
                    isActive={contact?.id === contactuser?.id}
                    onItemClick={onContactChange}
                  />
                ))
              ) : (
                <h5 className="text-center py-5">No Chat Available</h5>
              )}
            </Card>
          </div>
          <div className="right-side flex-fill">
            {contact?.sender ? (
              <>
                <div className={`${styles.header} d-flex gap-3`}>
                  <img
                    src={contact?.sender?.profile?.profilePict || profile}
                    alt="Profile Recipient"
                    className={`${styles.profile}`}
                    width={48}
                    height={48}
                  />
                  <div>
                    <h6 className={`m-none`}>{contact?.sender?.name}</h6>
                    <div className={"m-none d-flex align-items-center gap-1"}>
                      <div
                        className={`${styles.indicator} ${
                          recipientIsOnline ? styles.greens : ""
                        }`}
                      ></div>
                      <div className={`${styles.indicatorText} `}>
                        {recipientIsOnline ? "online" : "offline"}
                      </div>
                    </div>
                  </div>
                </div>
                <div className={`${styles.chatField} d-flex flex-column`}>
                  <div className={`${styles.chatFields}`}>
                    {messages?.map((message) => (
                      <ChatItem
                        key={message?.id}
                        isCurrent={contact?.sender?.id !== message?.senderId}
                        message={message}
                      />
                    ))}
                    <div ref={messageRef}></div>
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
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyDown={onKeyPressed}
                      />
                    </Form.Group>
                    <button
                      className={`${styles.btnSend}`}
                      onClick={submitHandler}
                    >
                      <img
                        src={sendLogo}
                        alt="Send Logo"
                        width={16}
                        height={16}
                      />
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div
                className={`${styles.chatField} d-flex flex-column align-items-center justify-content-center`}
              >
                <h3>No Chat Available</h3>
              </div>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
}
