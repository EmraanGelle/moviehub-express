import React from "react";

const Message = ({ type, text }) => {
  const style = {
    padding: "0.5rem 1rem",
    margin: "1rem 0",
    color: type === "error" ? "#721c24" : "#155724",
    background: type === "error" ? "#f8d7da" : "#d4edda",
    border: "1px solid " + (type === "error" ? "#f5c6cb" : "#c3e6cb"),
    borderRadius: "5px",
  };
  return <div style={style}>{text}</div>;
};

export default Message;
