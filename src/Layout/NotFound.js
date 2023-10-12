import React from "react";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <>
      <Link to="/">Home</Link>
      <div className="NotFound">
        <h1>Not Found</h1>
      </div>
    </>
  );
}

export default NotFound;
