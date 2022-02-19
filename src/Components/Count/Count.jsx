import React, { useState, useContext } from "react";
import { context } from "../Cart/CartContext";
import Alerts from "../AuxElements/Alerts";

const Count = ({ Items, CartUse }) => {
  const { onAdd, setShow, isInCart, AddItem, SubstractItem, RemoveItem } =
    useContext(context);

  const view = isInCart(Items) ? false : true;

  const [contador, setContador] = useState(Items.inicial);

  const ClickAdd = () => {
    if (isInCart(Items)) {
      let add = isInCart(Items).cantidad;
      add++;
      isInCart(Items).stock >= add
        ? AddItem(Items, add)
        : Alerts("warning", "Upss", "Limite de stock para este articulo", 2000);
    } else {
      if (contador < Items.stock) {
        setContador(contador + 1);
      } else {
        setContador(contador);
        Alerts("warning", "Upss", "Limite de stock para este articulo", 2000);
      }
    }
  };

  const ClickSubtract = () => {
    if (isInCart(Items)) {
      if (isInCart(Items).cantidad > isInCart(Items).inicial) {
        SubstractItem(Items, isInCart(Items).cantidad - 1);
      } else {
        Alerts(
          "warning",
          "Upss",
          `No puedes comprar menos de ${isInCart(Items).inicial} articulo`,
          2000
        );
      }
    } else {
      if (contador > Items.inicial) {
        setContador(contador - 1);
      } else {
        setContador(Items.inicial);
        Alerts(
          "warning",
          "Upss",
          `No puedes comprar menos de ${Items.inicial} articulo`,
          2000
        );
      }
    }
  };

  const Control =
    Items.stock <= 0
      ? "Sin Stock"
      : isInCart(Items)
      ? isInCart(Items).cantidad
      : contador;

  const ClickOnAdd = () => {
    onAdd(Items, contador);
    setContador(Items.inicial);
  };

  const ClickDelete = () => RemoveItem(Items);

  const disabledButton =
    Items.stock <= 0 ? "disabled btn btn-success w-50" : "btn btn-success w-50";

  const handleShow = () => setShow(true);

  console.log(CartUse);

  return (
    <>
      <div className="d-flex justify-content-center align-items-center">
        <button onClick={ClickSubtract} className="btn btn-success">
          -
        </button>
        <h2 className="text-center ms-4 me-4 mt-3 mb-3">{Control}</h2>
        <button onClick={ClickAdd} className="btn btn-success">
          +
        </button>
      </div>
      {CartUse === true ? (
        <button onClick={ClickDelete} className="btn btn-danger w-50">
          Quitar
        </button>
      ) : view ? (
        <button onClick={ClickOnAdd} className={disabledButton}>
          Comprar
        </button>
      ) : (
        <button
          className="text-white btn btn-success w-50"
          onClick={handleShow}
        >
          Ir al carrito
        </button>
      )}
    </>
  );
};
export default Count;
