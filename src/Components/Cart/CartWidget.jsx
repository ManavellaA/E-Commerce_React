import React, { useContext } from "react";
import Cart from "./Cart";
import { context } from "./CartContext";
import "./CartWidget.css";

const CartWidget = () => {
  const { cart, setShow } = useContext(context);

  const handleShow = () => setShow(true);

  return (
    <>
      <div
        className="icon-container text-center"
        variant="primary"
        onClick={handleShow}
        type="button"
      >
        <div className="icon">
          <p className="d-inline"> {cart.length > 0 ? cart.length : ""} </p>
          <h3 className="d-inline ">
            <svg
              stroke="currentColor"
              fill="currentColor"
              viewBox="0 0 24 24"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M21.822 7.431A1 1 0 0 0 21 7H7.333L6.179 4.23A1.994 1.994 0 0 0 4.333 3H2v2h2.333l4.744 11.385A1 1 0 0 0 10 17h8c.417 0 .79-.259.937-.648l3-8a1 1 0 0 0-.115-.921zM17.307 15h-6.64l-2.5-6h11.39l-2.25 6z"></path>
              <circle cx="10.5" cy="19.5" r="1.5"></circle>
              <circle cx="17.5" cy="19.5" r="1.5"></circle>
            </svg>
          </h3>
        </div>
      </div>
      <Cart />
    </>
  );
};

export default CartWidget;