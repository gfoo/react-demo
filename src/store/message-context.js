import React, { useState } from "react";

const MessageContext = React.createContext({
  showMessageRef: null,
  setShowMessageRef: (ref) => {},
});

export const MessageContextProvider = ({ children }) => {
  const [showMessageRef, setShowMessageRef] = useState(null);
  const contextValue = {
    showMessageRef,
    setShowMessageRef,
  };

  return (
    <MessageContext.Provider value={contextValue}>
      {children}
    </MessageContext.Provider>
  );
};

export default MessageContext;
