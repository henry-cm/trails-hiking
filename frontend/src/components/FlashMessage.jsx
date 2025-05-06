import React, { useEffect } from "react";

const FlashMessage = ({ message, type, clearMessage, fixed = false }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      clearMessage();
    }, 3000);
    return () => clearTimeout(timer);
  }, [clearMessage]);

  const styles = {
    padding: "12px 20px",
    borderRadius: "6px",
    marginBottom: "16px",
    color: "#fff",
    backgroundColor: type === "danger" ? "#d9534f" : "#5cb85c",
    ...(fixed && {
      position: "fixed",
      top: "20px",
      left: "50%",
      transform: "translateX(-50%)",
      zIndex: 1000,
    }),
  };

  return <div style={styles}>{message}</div>;
};

export default FlashMessage;
