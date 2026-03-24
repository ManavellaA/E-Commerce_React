import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import CartContext from "./Components/Cart/CartContext";
import NavBar from "./Components/NavBar/NavBar";
import Footer from "./Components/Footer/Footer";
import ItemDetailContainer from "./Components/ItemDetailContainer/ItemDetailConteiner";
import ItemListContainer from "./Components/ItemListContainer/ItemListContainer";
import BuyForm from "./Components/Cart/BuyForm";
import CartWidget from "./Components/Cart/CartWidget";
import AdminPanel from "./Components/Admin/AdminPanel";
import { NAV_ITEMS, BRAND_NAME } from "./constants/navigation";

function App() {
  return (
    <CartContext>
      <BrowserRouter>
        <NavBar arrayElementsNavBar={NAV_ITEMS} brand={BRAND_NAME} />
        <Switch>
          <Route exact path="/">
            <ItemListContainer />
          </Route>

          <Route exact path="/Tienda/:category">
            <ItemListContainer />
          </Route>

          <Route exact path="/Tienda/Item/:id">
            <ItemDetailContainer />
          </Route>

          <Route exact path="/Compra">
            <BuyForm />
          </Route>

          <Route exact path="/Admin">
            <AdminPanel />
          </Route>

          <Route path="*">
            <Redirect to="/" />
          </Route>
        </Switch>
        <Footer />
        <CartWidget />
      </BrowserRouter>
    </CartContext>
  );
}

export default App;
