import React, { useState, useEffect, createContext, useContext } from "react";
const AppContext = createContext();
const jsonData = JSON.parse(localStorage.getItem("chatUser"));

const AppProvider = ({ children }) => {
  const [singleUsermessages, setSingleUsermessages] = useState([]);
  const [conversationUserName, setConversationUserName] = useState({});
  const [selectdConversation, SetSelectdConversation] = useState({});
  const [currentUser, setCurrentUser] = useState(jsonData || {});

  useEffect(() => {
    localStorage.setItem("chatUser", JSON.stringify(currentUser));
  }, [currentUser]);

  return (
    <AppContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        singleUsermessages,
        setSingleUsermessages,
        conversationUserName,
        setConversationUserName,
        selectdConversation,
        SetSelectdConversation,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppProvider };
