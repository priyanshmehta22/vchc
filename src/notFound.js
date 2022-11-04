import { Link } from "react-router-dom";
import React from "react";

const NotFound = () => {
  return (
    <div className="notfound">
      <Link to="/">
        {/* <p>HOME</p> */}
        <img id="notfound"
          src="https://img.freepik.com/free-vector/404-error-abstract-concept-illustration_335657-2243.jpg?size=338&ext=jpg"
          alt="not found"
        />
      </Link>
    </div>
  );
};

export default NotFound;
