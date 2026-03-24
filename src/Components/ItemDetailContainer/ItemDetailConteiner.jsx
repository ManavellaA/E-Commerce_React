import React, { useEffect, useState } from "react";
import ItemDetail from "./ItemDetail";
import Loading from "../AuxElements/Loading";
import { useParams } from "react-router-dom";
import { getFirestore } from "../FireBase/Firebase";

const ItemDetailConteiner = () => {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const dataBase = getFirestore();
    const collection = dataBase.collection("items");
    const itemRef = collection.doc(id);

    setIsLoading(true);
    setError("");

    itemRef
      .get()
      .then((doc) => {
        if (!doc.exists) {
          setError("El producto no existe o fue removido.");
          return;
        }

        setItem({ id: doc.id, ...doc.data() });
      })
      .catch(() => {
        setError("No pudimos cargar el producto. Intentá nuevamente.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [id]);

  if (isLoading) {
    return <Loading msj={"....Cargando...."} />;
  }

  if (error) {
    return <p className="text-center text-danger fw-bold mt-5">{error}</p>;
  }

  return (
    <div className="d-flex justify-content-center mt-5">
      <ItemDetail Item={item} />
    </div>
  );
};

export default ItemDetailConteiner;
