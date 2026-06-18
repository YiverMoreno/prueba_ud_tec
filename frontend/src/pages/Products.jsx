import { useEffect, useState } from "react";
import {
  getProducts,
  createProduct,
  deleteProduct,
  updateProduct
} from "../services/products";


export default function Products() {
  const [products, setProducts] = useState([]);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

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

 
  const openEditModal = (product) => {
    setSelectedProduct({ ...product });
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setSelectedProduct(null);
    setIsEditModalOpen(false);
  };

  const handleEdit = (id) => {
    const product = products.find((p) => p.id === id);
    if (!product) return;

    openEditModal(product);
  };

  const handleUpdate = async (id) => {
    if (!selectedProduct) return;

    await updateProduct(id, {
      ...selectedProduct,
      price: Number(selectedProduct.price),
      stock: Number(selectedProduct.stock),
    });
    loadProducts();
    closeEditModal();
  };

  return (
  <div className="p-6 max-w-4xl mx-auto">
    <h2 className="text-xl font-medium text-gray-900 mb-6">Products</h2>

    
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
              <td className="px-4 py-3 text-right space-x-2">
                <button
                  onClick={() => handleEdit(product.id)}
                  className="text-blue-500 hover:text-blue-700 hover:bg-blue-50 p-1.5 rounded-lg transition-colors"
                  title="Edit product"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M11 4H7a2 2 0 00-2 2v11a2 2 0 002 2h10a2 2 0 002-2v-4M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"
                    />
                  </svg>
                </button>

                <button
                  onClick={() => handleDelete(product.id)}
                  className="text-red-500 hover:text-red-700 hover:bg-red-50 p-1.5 rounded-lg transition-colors"
                  title="Delete product"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </button>
              </td>          
            </tr>
          ))}
        </tbody>
      </table>
    </div>

  {isEditModalOpen && selectedProduct && (
  <div className="fixed inset-0 z-50 flex items-center justify-center">
    <div className="absolute inset-0 bg-black/50" onClick={closeEditModal} />

    <div className="relative bg-white w-full max-w-lg rounded-xl shadow-lg p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">
        Edit Product
      </h2>

      <div className="space-y-4">
        <div>
          <label className="text-sm text-gray-600">Name</label>
          <input
            type="text"
            value={selectedProduct.name}
            onChange={(e) =>
              setSelectedProduct({ ...selectedProduct, name: e.target.value })
            }
            className="w-full mt-1 border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="text-sm text-gray-600">Description</label>
          <textarea
            value={selectedProduct.description}
            onChange={(e) =>
              setSelectedProduct({ ...selectedProduct, description: e.target.value })
            }
            className="w-full mt-1 border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm text-gray-600">Price</label>
            <input
              type="number"
              value={selectedProduct.price}
              onChange={(e) =>
                setSelectedProduct({ ...selectedProduct, price: e.target.value })
              }
              className="w-full mt-1 border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="text-sm text-gray-600">Stock</label>
            <input
              type="number"
              value={selectedProduct.stock}
              onChange={(e) =>
                setSelectedProduct({ ...selectedProduct, stock: e.target.value })
              }
              className="w-full mt-1 border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>        
        <div className="flex justify-end gap-2 mt-6">
          <button
            onClick={closeEditModal}
            className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg"
          >Cancel</button>

          <button
            onClick={() => handleUpdate(selectedProduct.id)}
            className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >Save</button>
        </div>
      </div>
    </div>
  )}
  </div>
  
);
}