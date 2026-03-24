import React, { useState, useContext } from "react";
import { context } from "../Cart/CartContext";
import Alerts from "../AuxElements/Alerts";
import "./Count.css";

const Count = ({ Item, CartUse }) => {
  const { onAdd, setShow, isInCart, addItem, substractItem, removeItem } =
    useContext(context);

  const view = isInCart(Item) ? false : true;

  const [contador, setContador] = useState(Item.inicial);

  const clickAdd = () => {
    let msj = () =>
      Alerts("warning", "Upss", "Limite de stock para este articulo", 2000);
    if (isInCart(Item)) {
      Item.stock > isInCart(Item).cantidad ? addItem(Item) : msj();
    } else {
      if (contador < Item.stock) {
        setContador(contador + 1);
      } else {
        setContador(contador);
        msj();
      }
    }
  };

  const clickSubtract = () => {
    let msj = (e) =>
      Alerts("warning","Upss",`No puedes comprar menos de ${e} articulo`,2000);
    if (isInCart(Item)) {
      isInCart(Item).cantidad > Item.inicial
        ? substractItem(Item)
        : msj(isInCart(Item).inicial);
    } else {
      if (contador > Item.inicial) {
        setContador(contador - 1);
      } else {
        setContador(Item.inicial);
        msj(Item.inicial);
      }
    }
  };

  const control =
    Item.stock <= 0
      ? "Sin Stock"
      : isInCart(Item)
      ? isInCart(Item).cantidad
      : contador;

  const clickOnAdd = () => {
    onAdd(Item, contador);
    setContador(Item.inicial);
  };

  const clickDelete = () => removeItem(Item);

  const disabledButton =
    Item.stock <= 0 ? "disabled btn btn-success" : "btn btn-success";

  const handleShow = () => setShow(true);

  return (
    <div className="div_container">
      <div className="div_buttons">
        <button onClick={clickSubtract} className={`${disabledButton} count-button`}>
          -
        </button>
        <h2 className="text-center ms-4 me-4 mt-3 mb-3">{control}</h2>
        <button onClick={clickAdd} className={`${disabledButton} count-button`}>
          +
        </button>
      </div>
      {CartUse === true ? (
        <button
          onClick={clickDelete}
          className="text-danger btn btn-danger w-50"
        >
          Quitar
        </button>
      ) : view ? (
        <button onClick={clickOnAdd} className={`${disabledButton} count-button`}>
          Comprar
        </button>
      ) : (
        <button className="btn btn-success count-button" onClick={handleShow}>
          Ir al carrito
        </button>
      )}
    </div>
  );
};
export default Count;
