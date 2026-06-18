import { useEffect, useState } from "react";
import { getOrders, createOrder } from "../services/orders";
import { getConsumers } from "../services/consumers";
import { getProducts } from "../services/products";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [consumers, setConsumers] = useState([]);
  const [products, setProducts] = useState([]);

  const [form, setForm] = useState({
    consumerId: "",
    productId: "",
    quantity: 1,
  });

  const loadData = async () => {
    const [
      ordersResponse,
      consumersResponse,
      productsResponse,
    ] = await Promise.all([
      getOrders(),
      getConsumers(),
      getProducts(),
    ]);

    setOrders(ordersResponse.data);
    setConsumers(consumersResponse.data);
    setProducts(productsResponse.data);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    await createOrder({
      consumerId: Number(form.consumerId),
      items: [
        {
          productId: Number(form.productId),
          quantity: Number(form.quantity),
        },
      ],
    });

    setForm({
      consumerId: "",
      productId: "",
      quantity: 1,
    });

    loadData();
  };

  return (
  <div className="min-h-screen bg-slate-100 py-10">
    <div className="mx-auto max-w-6xl px-4">
      <h1 className="mb-8 text-center text-4xl font-bold text-slate-800">
        Orders Management
      </h1>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Formulario */}
        <div className="rounded-xl bg-white p-6 shadow-lg">
          <h2 className="mb-4 text-xl font-semibold text-slate-700">
            Create Order
          </h2>

          <form
            onSubmit={handleSubmit}
            className="space-y-4"
          >
            <select
              value={form.consumerId}
              onChange={(e) =>
                setForm({
                  ...form,
                  consumerId: e.target.value,
                })
              }
              className="w-full rounded-lg border border-slate-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
            >
              <option value="">
                Select Consumer
              </option>

              {consumers.map((consumer) => (
                <option
                  key={consumer.id}
                  value={consumer.id}
                >
                  {consumer.name}
                </option>
              ))}
            </select>

            <select
              value={form.productId}
              onChange={(e) =>
                setForm({
                  ...form,
                  productId: e.target.value,
                })
              }
              className="w-full rounded-lg border border-slate-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
            >
              <option value="">
                Select Product
              </option>

              {products.map((product) => (
                <option
                  key={product.id}
                  value={product.id}
                >
                  {product.name} ({product.stock} available)
                </option>
              ))}
            </select>

            <input
              type="number"
              min="1"
              placeholder="Quantity"
              value={form.quantity}
              onChange={(e) =>
                setForm({
                  ...form,
                  quantity: e.target.value,
                })
              }
              className="w-full rounded-lg border border-slate-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
            />

            <button
              type="submit"
              className="w-full rounded-lg bg-blue-600 py-2 font-medium text-white transition hover:bg-blue-700"
            >
              Create Order
            </button>
          </form>
        </div>

        {/* Lista */}
        <div className="lg:col-span-2 rounded-xl bg-white p-6 shadow-lg">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-xl font-semibold text-slate-700">
              Orders List
            </h2>

            <span className="rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-600">
              {orders.length} orders
            </span>
          </div>

          <div className="space-y-4">
            {orders.length === 0 ? (
              <div className="rounded-lg border border-dashed border-slate-300 p-8 text-center text-slate-500">
                No orders found
              </div>
            ) : (
              orders.map((order) => (
                <div
                  key={order.id}
                  className="rounded-xl border border-slate-200 p-5 transition hover:shadow-md"
                >
                  <div className="mb-4 flex items-center justify-between">
                    <div>
                      <h3 className="font-bold text-slate-800">
                        Order #{order.id}
                      </h3>

                      <p className="text-sm text-slate-500">
                        {order.consumer?.name}
                      </p>
                    </div>

                    <div className="rounded-lg bg-green-100 px-3 py-2 font-semibold text-green-700">
                      ${order.total}
                    </div>
                  </div>

                  <div>
                    <h4 className="mb-2 font-medium text-slate-700">
                      Products
                    </h4>

                    <ul className="space-y-2">
                      {order.items?.map((item) => (
                        <li
                          key={item.id}
                          className="flex items-center justify-between rounded-lg bg-slate-50 px-3 py-2"
                        >
                          <span>
                            {item.product?.name}
                          </span>

                          <span className="rounded-full bg-blue-100 px-2 py-1 text-sm font-medium text-blue-700">
                            Qty: {item.quantity}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  </div>
);
}