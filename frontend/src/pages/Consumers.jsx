import { useEffect, useState } from "react";
import {
  getConsumers,
  createConsumer,
  deleteConsumer
} from "../services/consumers";

export default function Consumers() {

  const [consumers, setConsumers] = useState([]);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: ""
  });

  const loadData = async () => {
    const response = await getConsumers();
    setConsumers(response.data);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    await createConsumer(form);

    setForm({
      name: "",
      email: "",
      phone: ""
    });

    loadData();
  };

  const handleDelete = async (id) => {
    await deleteConsumer(id);
    loadData();
  };

  return (
    <div>
      <h2>Consumers</h2>

      <form onSubmit={handleSubmit}>
        <input
          placeholder="Name"
          value={form.name}
          onChange={(e) =>
            setForm({
              ...form,
              name: e.target.value
            })
          }
        />

        <input
          placeholder="Email"
          value={form.email}
          onChange={(e) =>
            setForm({
              ...form,
              email: e.target.value
            })
          }
        />

        <input
          placeholder="Phone"
          value={form.phone}
          onChange={(e) =>
            setForm({
              ...form,
              phone: e.target.value
            })
          }
        />

        <button type="submit">
          Create
        </button>
      </form>

      <ul>
        {consumers.map((consumer) => (
          <li key={consumer.id}>
            {consumer.name}

            <button
              onClick={() =>
                handleDelete(consumer.id)
              }
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}