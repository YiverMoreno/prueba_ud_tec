import { useEffect, useState } from "react";
import {
  getConsumers,
  createConsumer,
  updateConsumer,
  deleteConsumer
} from "../services/consumers";

export default function Consumers() {

  const [consumers, setConsumers] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedConsumer, setSelectedConsumer] = useState(null);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: ""
  });

  const loadData = async () => {
    const response = await getConsumers();
    setConsumers(Array.isArray(response.data.data) ? response.data.data : []);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !form.name ||
      !form.email ||
      !form.phone
    ) {
      alert("All fields are required");
      return;
    }

    if (form.phone.replace(/\D/g, "").length < 8) {
      alert("Phone number must have at least 8 digits");
      return;
    }
    try {
      const response = await createConsumer(form);

      alert(response.data.message || "Consumer created successfully");

      setForm({
        name: "",
        email: "",
        phone: ""
      });

      loadData();
    } catch (error) {
      alert(
        error.response?.data?.message ||
        "Error creating consumer"
      );
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await deleteConsumer(id);

      alert(response.data.message);

      loadData();
    } catch (error) {
      alert(
        error.response?.data?.message
      );
    }
  };

  const openEditModal = (consumer) => {
    setSelectedConsumer({ ...consumer });
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setSelectedConsumer(null);
    setIsEditModalOpen(false);
  };

  const handleEdit = (id) => {
    const consumer = consumers.find((c) => c.id === id);
    if (!consumer) return;
    openEditModal(consumer);
  };

  const handleUpdate = async (id) => {
    if (!selectedConsumer) return;

    try {
      const response = await updateConsumer(id, selectedConsumer);

      alert(response.data.message || "Consumer updated successfully");

      loadData();
      closeEditModal();
    } catch (error) {
      alert(error.response?.data?.message || "Error updating consumer");
    }
  };

  return (
  <div className="min-h-screen bg-slate-100 py-10">
    <div className="mx-auto max-w-5xl px-4">
      <h1 className="mb-8 text-center text-4xl font-bold text-slate-800">
        Consumer Management
      </h1>

      <div className="grid gap-6 md:grid-cols-3">
        
        <div className="rounded-xl bg-white p-6 shadow-lg">
          <h2 className="mb-4 text-xl font-semibold text-slate-700">
            Create Consumer
          </h2>

          <form
            onSubmit={handleSubmit}
            className="space-y-4"
          >
            <input
              type="text"
              placeholder="Name"
              value={form.name}
              onChange={(e) =>
                setForm({
                  ...form,
                  name: e.target.value
                })
              }
              className="w-full rounded-lg border border-slate-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
            />

            <input
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={(e) =>
                setForm({
                  ...form,
                  email: e.target.value
                })
              }
              className="w-full rounded-lg border border-slate-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
            />

            <input
              type="text"
              placeholder="Phone"
              value={form.phone}
              onChange={(e) =>
                setForm({
                  ...form,
                  phone: e.target.value
                })
              }
              className="w-full rounded-lg border border-slate-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
            />

            <button
              type="submit"
              className="w-full rounded-lg bg-blue-600 py-2 font-medium text-white transition hover:bg-blue-700"
            >
              Create Consumer
            </button>
          </form>
        </div>

      
        <div className="md:col-span-2 rounded-xl bg-white p-6 shadow-lg">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-semibold text-slate-700">
              Consumers
            </h2>

            <span className="rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-600">
              {consumers.length} records
            </span>
          </div>

          <div className="space-y-3">
            {consumers.length === 0 ? (
              <div className="rounded-lg border border-dashed p-8 text-center text-slate-500">
                No consumers found
              </div>
            ) : (
              consumers.map((consumer) => (
                <div
                  key={consumer.id}
                  className="flex items-center justify-between rounded-lg border border-slate-200 p-4 transition hover:bg-slate-50"
                >
                  <div>
                    <h3 className="font-semibold text-slate-800">
                      {consumer.name}
                    </h3>

                    <p className="text-sm text-slate-500">
                      {consumer.email}
                    </p>

                    <p className="text-sm text-slate-500">
                      {consumer.phone}
                    </p>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(consumer.id)}
                      className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() =>
                        handleDelete(consumer.id)
                      }
                      className="rounded-lg bg-red-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {isEditModalOpen && selectedConsumer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-black/50" onClick={closeEditModal} />

          <div className="relative w-full max-w-md rounded-xl bg-white p-6 shadow-lg">
            <h2 className="text-xl font-semibold text-slate-800 mb-4">Edit Consumer</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700">Name</label>
                <input
                  type="text"
                  value={selectedConsumer.name}
                  onChange={(e) =>
                    setSelectedConsumer({ ...selectedConsumer, name: e.target.value })
                  }
                  className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700">Email</label>
                <input
                  type="email"
                  value={selectedConsumer.email}
                  onChange={(e) =>
                    setSelectedConsumer({ ...selectedConsumer, email: e.target.value })
                  }
                  className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700">Phone</label>
                <input
                  type="text"
                  value={selectedConsumer.phone}
                  onChange={(e) =>
                    setSelectedConsumer({ ...selectedConsumer, phone: e.target.value })
                  }
                  className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
                />
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={closeEditModal}
                className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => handleUpdate(selectedConsumer.id)}
                className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  </div>
);
}