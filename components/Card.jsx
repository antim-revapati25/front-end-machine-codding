import React from "react";
import "../css/index.css";
const Card = ({ data }) => {
  const { id, title, thumbnail } = data;

  return (
    <div className="general">
      <h1> {id}</h1>
      <img src={thumbnail} alt={title} className="image"></img>
      <p>{title}</p>
    </div>
  );
};

export default Card;
