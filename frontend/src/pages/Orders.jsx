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
    <div>
      <h2>Orders</h2>

      <form onSubmit={handleSubmit}>
        <select
          value={form.consumerId}
          onChange={(e) =>
            setForm({
              ...form,
              consumerId: e.target.value,
            })
          }
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
        >
          <option value="">
            Select Product
          </option>

          {products.map((product) => (
            <option
              key={product.id}
              value={product.id}
            >
              {product.name} ({product.stock})
            </option>
          ))}
        </select>

        <input
          type="number"
          min="1"
          value={form.quantity}
          onChange={(e) =>
            setForm({
              ...form,
              quantity: e.target.value,
            })
          }
        />

        <button type="submit">
          Create Order
        </button>
      </form>

      <hr />

      <h3>Orders List</h3>

      {orders.map((order) => (
        <div
          key={order.id}
          style={{
            border: "1px solid gray",
            padding: "10px",
            marginBottom: "10px",
          }}
        >
          <p>
            <strong>Order:</strong> {order.id}
          </p>

          <p>
            <strong>Consumer:</strong>{" "}
            {order.consumer?.name}
          </p>

          <p>
            <strong>Total:</strong> $
            {order.total}
          </p>

          <ul>
            {order.items?.map((item) => (
              <li key={item.id}>
                {item.product?.name} -
                Quantity: {item.quantity}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}