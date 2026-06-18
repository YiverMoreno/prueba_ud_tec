import {
  BrowserRouter,
  Routes,
  Route,
  Link
} from "react-router-dom";

import Consumers from "./pages/Consumers";
import Products from "./pages/Products";
import Orders from "./pages/Orders";

function App() {
  return (
    <BrowserRouter>

      <nav>
        <Link to="/">
          Consumers
        </Link>

        {" | "}

        <Link to="/products">
          Products
        </Link>

        {" | "}

        <Link to="/orders">
          Orders
        </Link>
      </nav>

      <Routes>
        <Route
          path="/"
          element={<Consumers />}
        />

        <Route
          path="/products"
          element={<Products />}
        />

        <Route
          path="/orders"
          element={<Orders />}
        />
      </Routes>

    </BrowserRouter>
  );
}

export default App;