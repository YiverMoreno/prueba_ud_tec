import { useEffect, useState } from "react";
import {
  getProducts,
  createProduct,
  deleteProduct,
} from "../services/products";

export default function Products() {
  const [products, setProducts] = useState([]);

  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
  });

  const loadProducts = async () => {
    const response = await getProducts();
    setProducts(response.data);
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    await createProduct({
      ...form,
      price: Number(form.price),
      stock: Number(form.stock),
    });

    setForm({
      name: "",
      description: "",
      price: "",
      stock: "",
    });

    loadProducts();
  };

  const handleDelete = async (id) => {
    await deleteProduct(id);
    loadProducts();
  };

  return (
  <div className="p-6 max-w-4xl mx-auto">
    <h2 className="text-xl font-medium text-gray-900 mb-6">Products</h2>

    {/* Formulario */}
    <div className="bg-white border border-gray-200 rounded-xl p-5 mb-6">
      <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-3">
        New product
      </p>
      <div className="grid grid-cols-2 gap-3 mb-3">
        <input
          className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />
      </div>
      <div className="grid grid-cols-2 gap-3 mb-4">
        <input
          className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="number"
          placeholder="Price"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
        />
        <input
          className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="number"
          placeholder="Stock"
          value={form.stock}
          onChange={(e) => setForm({ ...form, stock: e.target.value })}
        />
      </div>
      <button
        type="button"
        onClick={handleSubmit}
        className="flex items-center gap-1.5 bg-gray-900 text-white text-sm px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
        Create
      </button>
    </div>

    {/* Tabla */}
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-gray-50 border-b border-gray-200 text-xs font-medium text-gray-500 uppercase tracking-wide">
            <th className="text-left px-4 py-3">Name</th>
            <th className="text-left px-4 py-3">Description</th>
            <th className="text-right px-4 py-3">Price</th>
            <th className="text-right px-4 py-3">Stock</th>
            <th className="px-4 py-3" />
          </tr>
        </thead>
        <tbody>
          {products.map((product, i) => (
            <tr
              key={product.id}
              className={`border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors`}
            >
              <td className="px-4 py-3 font-medium text-gray-900">{product.name}</td>
              <td className="px-4 py-3 text-gray-500 truncate max-w-xs">{product.description}</td>
              <td className="px-4 py-3 text-right text-gray-900">${product.price}</td>
              <td className="px-4 py-3 text-right">
                <span className={`text-xs px-2.5 py-1 rounded-md font-medium ${
                  product.stock <= 5
                    ? "bg-amber-50 text-amber-700"
                    : "bg-green-50 text-green-700"
                }`}>
                  {product.stock}
                </span>
              </td>
              <td className="px-4 py-3 text-right">
                <button
                  onClick={() => handleDelete(product.id)}
                  className="text-red-500 hover:text-red-700 hover:bg-red-50 p-1.5 rounded-lg transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);
}