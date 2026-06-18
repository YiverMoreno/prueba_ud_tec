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
    <div className="min-h-screen bg-slate-100">
      {/* NAVBAR */}
      <nav className="sticky top-0 z-50 border-b border-slate-200 bg-white shadow-sm">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <h1 className="text-lg font-bold text-slate-800">
            Admin Panel
          </h1>

          <div className="flex gap-2">
            <Link
              to="/"
              className="rounded-lg px-4 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-900"
            >
              Consumers
            </Link>

            <Link
              to="/products"
              className="rounded-lg px-4 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-900"
            >
              Products
            </Link>

            <Link
              to="/orders"
              className="rounded-lg px-4 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-900"
            >
              Orders
            </Link>
          </div>
        </div>
      </nav>

      {/* CONTENT */}
      <main className="mx-auto max-w-6xl px-4 py-8">
        <Routes>
          <Route path="/" element={<Consumers />} />
          <Route path="/products" element={<Products />} />
          <Route path="/orders" element={<Orders />} />
        </Routes>
      </main>
    </div>
  </BrowserRouter>
);
}

export default App;