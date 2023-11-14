import React from "react";

export default function Giphy(props) {

  return (
  <div>
    {/* the prop is the argument passed from App.jsx. Console.log of the gifSearch shows the image_url */}
    <img src={props.gifSearch.image_url} alt="" />
  </div>
  )
}
