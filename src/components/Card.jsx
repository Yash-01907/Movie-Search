import React from "react";
import { useSelector } from "react-redux";

function Card() {
  const selectedData = useSelector((state) => state.movieData);
  if (selectedData) console.log(selectedData);
  return <div>Card</div>;
}

export default Card;
