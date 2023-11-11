import React from "react";

export default function Giphy(props) {

  return (
  <div className="gif-row">
    <img src={props.gifSearch.image_url} alt="" />
  </div>
  )
}
