import React, { useEffect, useRef, useState } from "react";
import { Container, Form } from "react-bootstrap";
import { Navbars, HeroLayer } from "../../containers";
import profile from "../../assets/images/profile.jpg";
import styles from "./ComplainPage.module.css";
import sendLogo from "../../assets/icons/send_logo.png";
import io from "socket.io-client";
import ChatItem from "../../components/ChatItem";

let socket;

const ComplainPage = () => {
  const [contact, setContact] = useState({});
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [connectedUsers, setConnectedUsers] = useState([]);
  const [isRecipientOnline, setIsRecipientOnline] = useState(false);

  const messageRef = useRef();

  const loadAdminContact = () => {
    socket.emit("load admin contact");

    socket.on("admin contact loaded", (value) => {
      setContact(value);
    });
  };

  const messageWatcher = () => {
    socket.on("message loaded", (value) => {
      setMessages(value);
    });
  };

  const messageOnNewMessage = () => {
    socket.on("new message", () => {
      socket.emit("load message", contact?.id);
    });
  };

  const onSubmitHandler = () => {
    if (message) {
      socket.emit("send message", contact?.id, message);
    }

    setMessage("");
  };

  const onKeyPressed = (e) => {
    if (e.code === "Enter") {
      onSubmitHandler();
    }
  };

  const userConnectedUpdate = () => {
    socket.emit("get connected user");
    socket.on("user connected update", (value) => {
      setConnectedUsers(value);
    });
  };

  useEffect(() => {
    socket = io(process.env.REACT_APP_SERVER_URL, {
      auth: {
        token: localStorage.getItem("usrtkn"),
      },
    });
    loadAdminContact();
    messageWatcher();
    messageOnNewMessage();
    userConnectedUpdate();
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
    if (contact?.id) {
      socket.emit("load message", contact?.id);
    }
  }, [contact?.id]);

  useEffect(() => {
    if (connectedUsers.length - 1 < contact?.id) {
      setIsRecipientOnline(false);
    } else {
      if (connectedUsers[contact?.id]) {
        setIsRecipientOnline(true);
      } else {
        setIsRecipientOnline(false);
      }
    }
  }, [connectedUsers, contact]);

  return (
    <div>
      <Navbars />
      <HeroLayer />
      <Container>
        <div className="d-flex gap-3">
          <div className="right-side flex-fill">
            <div className={`${styles.header} d-flex gap-3`}>
              <img
                src={contact?.profile?.profilePict || profile}
                alt="Profile Recipient"
                className={`${styles.profile}`}
                width={48}
                height={48}
              />
              <div>
                <h6 className={`m-none`}>{contact?.name}</h6>
                <div className={"m-none d-flex align-items-center gap-1"}>
                  <div
                    className={`${styles.indicator} ${
                      isRecipientOnline ? styles.greens : ""
                    }`}
                  ></div>
                  <div className={`${styles.indicatorText} `}>
                    {isRecipientOnline ? "online" : "offline"}
                  </div>
                </div>
              </div>
            </div>
            <div
              className={`${styles.chatField} ${styles.fullSize} d-flex flex-column`}
            >
              <div className={`${styles.chatFields}`}>
                {messages?.map((message) => (
                  <ChatItem
                    isCurrent={contact?.id === message?.recipientId}
                    key={message?.id}
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
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={onKeyPressed}
                    value={message}
                  />
                </Form.Group>
                <button
                  className={`${styles.btnSend}`}
                  onClick={onSubmitHandler}
                >
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
