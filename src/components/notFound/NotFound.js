import { Link } from "react-router-dom";
import Header from "../header/Header";

import "./styles.scss";

const NotFound = () => {
  return (
    <div className="NotFound">
      <Header />
      <div className="NotFound__wrapper">
        <h1 className="NotFound__title">Oopsie!!!</h1>
        <p className="NotFound__text">the aliens took your page</p>
        <Link to="/" className="NotFound__link btn-purple">
          go back
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
