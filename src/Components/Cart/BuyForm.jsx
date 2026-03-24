import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import firebase from "firebase";
import { getFirestore } from "../FireBase/Firebase";
import { context } from "./CartContext";
import Alerts from "../AuxElements/Alerts";
import Loading from "../AuxElements/Loading";

const initialForm = {
  name: "",
  address: "",
  city: "",
  state: "",
  email: "",
  mobile: "",
};

function Form() {
  const { cart, clearCart, total, reStock } = useContext(context);
  const [orderId, setOrderId] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState(initialForm);

  const isValidEmail = (value) => /\S+@\S+\.\S+/.test(value);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const hasMissingFields = Object.values(formData).some((value) => !value.trim());

  const handleClick = async () => {
    if (!cart.length) {
      Alerts("warning", "Upss", "El carrito esta vacio, debes comprar algo!!", 4000);
      return;
    }

    if (hasMissingFields) {
      Alerts("error", "Upss", "Te falta completar campos del formulario", 4000);
      return;
    }

    if (!isValidEmail(formData.email)) {
      Alerts("warning", "Upss", "El correo ingresado no es valido", 4000);
      return;
    }

    setIsSubmitting(true);

    const dataBase = getFirestore();
    const orders = dataBase.collection("orders");

    const OC = {
      buyer: {
        ...formData,
      },
      date: firebase.firestore.Timestamp.fromDate(new Date()),
      items: cart,
      total,
    };

    try {
      const { id } = await orders.add(OC);
      await reStock(dataBase);
      setOrderId(id);
      setFormData(initialForm);
      clearCart();
    } catch (error) {
      Alerts("error", "Upss", "No pudimos registrar tu compra. Probá nuevamente.", 4000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {orderId ? (
        <div className="mt-5">
          <div className="text-center">
            <svg
              stroke="currentColor"
              fill="currentColor"
              version="1"
              viewBox="0 0 48 48"
              height="4em"
              width="4em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <polygon
                fill="#8BC34A"
                points="24,3 28.7,6.6 34.5,5.8 36.7,11.3 42.2,13.5 41.4,19.3 45,24 41.4,28.7 42.2,34.5 36.7,36.7 34.5,42.2 28.7,41.4 24,45 19.3,41.4 13.5,42.2 11.3,36.7 5.8,34.5 6.6,28.7 3,24 6.6,19.3 5.8,13.5 11.3,11.3 13.5,5.8 19.3,6.6"
              ></polygon>
              <polygon
                fill="#CCFF90"
                points="34.6,14.6 21,28.2 15.4,22.6 12.6,25.4 21,33.8 37.4,17.4"
              ></polygon>
            </svg>
          </div>
          <h2 className="text-center mt-3">Reserva Exitosa!</h2>
          <div style={{ color: "green" }}>
            <h3 className="text-center mt-5">Ticket id</h3>
            <h3 className="text-center">"{orderId}"</h3>
          </div>
          <h5 className="text-center mt-5">
            Te enviamos un correo con la información para finalizar tu compra.
          </h5>
          <h5 className="text-center">Gracias!!</h5>
          <div className="text-center mt-5">
            <Link to="/">
              <button className="btn btn-success">Volver al inicio</button>
            </Link>
          </div>
        </div>
      ) : isSubmitting ? (
        <Loading msj={"....Enviando...."} />
      ) : (
        <>
          <h2 className="text-center mt-5">Datos de la Compra</h2>
          <div className=" mt-5 flex-wrap container col-8 col-sm-6 col-md-5 col-lg-4 col-xl-3">
            <input
              placeholder="Nombre y Apellido"
              type="text"
              className="mt-3 form-control"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
            />
            <input
              placeholder="Dirección"
              type="text"
              className="mt-3 form-control"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
            />
            <input
              placeholder="Ciudad"
              type="text"
              className="mt-3 form-control"
              name="city"
              value={formData.city}
              onChange={handleInputChange}
            />
            <input
              placeholder="Provincia"
              type="text"
              className="mt-3 form-control"
              name="state"
              value={formData.state}
              onChange={handleInputChange}
            />
            <input
              placeholder="Email"
              type="email"
              className="mt-3 form-control"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />
            <input
              placeholder="Celular"
              type="tel"
              className="mt-3 form-control"
              name="mobile"
              value={formData.mobile}
              onChange={handleInputChange}
            />
          </div>
          <div className="text-center mt-4 mb-5">
            <button className="btn btn-success" onClick={handleClick}>
              Reservar compra!!
            </button>
          </div>
        </>
      )}
    </>
  );
}

export default Form;
