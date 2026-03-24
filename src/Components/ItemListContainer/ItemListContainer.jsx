import React, { useState, useEffect } from "react";
import ItemList from "./ItemList";
import { useParams } from "react-router-dom";
import { getFirestore } from "../FireBase/Firebase";

const ItemListContainer = () => {
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const dataBase = getFirestore();
    const itemsRef = dataBase.collection("items");
    const query = category ? itemsRef.where("categoria", "==", category) : itemsRef;

    setIsLoading(true);
    setError("");

    query
      .get()
      .then((querySnapShot) => {
        const mappedProducts = querySnapShot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProducts(mappedProducts);
      })
      .catch(() => {
        setError("No pudimos cargar los productos. Intentá nuevamente en unos segundos.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [category]);

  return (
    <div className="ms-4 me-4 mt-5">
      <ItemList products={products} isLoading={isLoading} error={error} />
    </div>
  );
};

export default ItemListContainer;
