import React from "react";
import Item from "./Item";
import Loading from "../AuxElements/Loading";

const ItemList = ({ products, isLoading, error }) => {
  if (isLoading) {
    return <Loading msj={"....Cargando...."} />;
  }

  if (error) {
    return <p className="text-center text-danger fw-bold mt-5">{error}</p>;
  }

  if (!products.length) {
    return (
      <p className="text-center text-secondary fw-bold mt-5">
        No encontramos productos para esta categoría.
      </p>
    );
  }

  return (
    <div className="d-flex justify-content-center flex-wrap container">
      {products.map((element) => (
        <Item items={element} key={element.id} />
      ))}
    </div>
  );
};

export default ItemList;
