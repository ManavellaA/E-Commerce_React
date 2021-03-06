import React, { useEffect, useState } from "react";
import ItemDetail from "./ItemDetail";
import Loading from "../AuxElements/Loading";
import { useParams } from "react-router-dom";
import { getFirestore } from "../FireBase/Firebase";

const ItemDetailConteiner = () => {
  const { id } = useParams();
  const [getItem, setGetItem] = useState([]);

  useEffect(() => {
    const dataBase = getFirestore();

    const collecion = dataBase.collection("items");

    const item = collecion.doc(id);

    item
      .get()
      .then((doc) => {
        setGetItem({ id: doc.id, ...doc.data() });
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  return (
    <>
      {getItem.length === 0 ? (
        <Loading msj={'....Cargando....'} />
      ) : (
        <div className="d-flex justify-content-center mt-5">
          <ItemDetail Item={getItem} />
        </div>
      )}
    </>
  );
};
export default ItemDetailConteiner;