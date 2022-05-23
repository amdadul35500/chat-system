import React, { useEffect, useState, useRef } from "react";
import "./inbox.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Conversation from "../../component/conversation/Conversation";
import Messages from "../../component/messages/Messages";
import Nabvar from "../../component/navbar/Nabvar";
import { useGlobalContext } from "../../context/context";
import Button from "@mui/material/Button";
import io from "socket.io-client";
const ENDPOINT = "http://localhost:5000";
let socket;

const Inbox = () => {
  const [conversation, setConversation] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState({});
  const [forSocket, setForSocket] = useState(false);
  const navigate = useNavigate();
  const scrollRef = useRef();
  const {
    currentUser,
    singleUsermessages,
    conversationUserName,
    selectdConversation,
    setSingleUsermessages,
  } = useGlobalContext();

  // socket io
  useEffect(() => {
    socket = io(ENDPOINT);
  }, []);

  useEffect(() => {
    socket.on("sendFromBackend", (data) => {
      setArrivalMessage(data);
    });
  }, []);

  useEffect(() => {
    arrivalMessage &&
      setSingleUsermessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage]);

  // auth gurd
  useEffect(() => {
    const coockie = async () => {
      try {
        const { data } = await axios.get("/coockie");
      } catch (error) {
        console.log(error);
        navigate("/signin");
      }
    };
    coockie();
  }, []);

  // get all conversation
  useEffect(() => {
    const getConversation = async () => {
      try {
        const { data } = await axios.get(`/conversation/${currentUser._id}`);
        setConversation(data);
      } catch (error) {
        console.log(error);
      }
    };
    getConversation();
  }, [currentUser._id]);

  // get messages of selected conversation
  useEffect(() => {
    const getMsg = async () => {
      const { data } = await axios.get(`/message/${selectdConversation._id}`);
      setSingleUsermessages(data);
    };
    getMsg();
  }, [selectdConversation._id]);

  // send message
  const handleSubmit = async (e) => {
    e.preventDefault();
    const msgInfo = {
      text: inputValue,
      senderId: currentUser._id,
      receiverId: conversationUserName._id,
      conversationId: selectdConversation._id,
    };
    try {
      await axios.post(`/message`, msgInfo);
      setInputValue("");
    } catch (error) {
      console.log(error);
    }
  };

  // for smooth scroll
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [singleUsermessages]);

  return (
    <>
      <div className="inbox">
        <Nabvar />
        <div className="container">
          <div className="row inbox-row">
            <div className="col-3 inbox-col-4">
              <div className="username">
                <h5>{`${currentUser.firstname} ${
                  currentUser.middlename === undefined
                    ? ""
                    : currentUser.middlename
                } ${currentUser.lastname}`}</h5>
              </div>
              {conversation.length === 0 ? (
                <div style={{ textAlign: "center", marginTop: "30px" }}>
                  <Button variant="contained" style={{ fontSize: "12px" }}>
                    Add Conversation
                  </Button>
                </div>
              ) : (
                conversation.map((singleConversation) => (
                  <div key={singleConversation._id}>
                    <Conversation singleConversation={singleConversation} />
                  </div>
                ))
              )}
            </div>
            <div className="col-9 inbox-col-8">
              <div className="username">
                <h5>
                  {Object.entries(conversationUserName).length === 0
                    ? ""
                    : `${conversationUserName.firstname} ${
                        conversationUserName.middlename === undefined
                          ? ""
                          : conversationUserName.middlename
                      } ${conversationUserName.lastname}`}
                </h5>
              </div>
              <div className="messages">
                {Object.entries(conversationUserName).length === 0 ? (
                  <div className="not-show-msg">
                    <svg
                      aria-label="Direct"
                      className="_8-yf5 "
                      color="#262626"
                      fill="#262626"
                      height="80"
                      role="img"
                      viewBox="0 0 96 96"
                      width="80"
                    >
                      <circle
                        cx="48"
                        cy="48"
                        fill="none"
                        r="47"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                      ></circle>
                      <line
                        fill="none"
                        stroke="currentColor"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        x1="69.286"
                        x2="41.447"
                        y1="33.21"
                        y2="48.804"
                      ></line>
                      <polygon
                        fill="none"
                        points="47.254 73.123 71.376 31.998 24.546 32.002 41.448 48.805 47.254 73.123"
                        stroke="currentColor"
                        strokeLinejoin="round"
                        strokeWidth="2"
                      ></polygon>
                    </svg>
                    <h3>Your Messages</h3>
                    <h5>Send private messages to a friend or group.</h5>
                  </div>
                ) : (
                  singleUsermessages.map((msg) => (
                    <div ref={scrollRef} key={msg._id}>
                      <Messages
                        msg={msg}
                        own={msg.senderId === currentUser._id}
                      />
                    </div>
                  ))
                )}
              </div>

              {Object.entries(conversationUserName).length === 0 ? (
                ""
              ) : (
                <div className="msg-input">
                  <form
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      height: "45px",
                    }}
                    onSubmit={handleSubmit}
                  >
                    <svg
                      aria-label="Emoji"
                      className="_8-yf5 "
                      color="#262626"
                      fill="#262626"
                      height="24"
                      role="img"
                      viewBox="0 0 24 24"
                      width="24"
                    >
                      <path d="M15.83 10.997a1.167 1.167 0 101.167 1.167 1.167 1.167 0 00-1.167-1.167zm-6.5 1.167a1.167 1.167 0 10-1.166 1.167 1.167 1.167 0 001.166-1.167zm5.163 3.24a3.406 3.406 0 01-4.982.007 1 1 0 10-1.557 1.256 5.397 5.397 0 008.09 0 1 1 0 00-1.55-1.263zM12 .503a11.5 11.5 0 1011.5 11.5A11.513 11.513 0 0012 .503zm0 21a9.5 9.5 0 119.5-9.5 9.51 9.51 0 01-9.5 9.5z"></path>
                    </svg>
                    <input
                      type="text"
                      placeholder="Message..."
                      maxLength="144"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      style={{
                        width: "80%",
                        border: "none",
                        outline: "none",
                        marginLeft: "10px",
                      }}
                    />
                    <button
                      type="submit"
                      style={{
                        border: "none",
                        background: "transparent",
                        color: "#24ACF2",
                        fontWeight: "bold",
                      }}
                    >
                      Send
                    </button>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Inbox;
