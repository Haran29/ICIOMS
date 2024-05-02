import React, { useState, useEffect } from "react";
import axios from "axios";

const AdminPage = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [newMenuItem, setNewMenuItem] = useState({
    name: "",
    price: "",
    image: "",
  });
  const [showForm, setShowForm] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null);

  useEffect(() => {
    fetchMenuItems();
  }, []);

  const fetchMenuItems = async () => {
    try {
      const response = await axios.get("/get-menuItem");
      setMenuItems(response.data);
    } catch (error) {
      console.error("Failed to fetch menu items:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewMenuItem({ ...newMenuItem, [name]: value });
  };

  const handleAddMenuItem = async () => {
    try {
      const response = await axios.post("/add-item", newMenuItem);
      setMenuItems([...menuItems, response.data.newItem]);
      setNewMenuItem({ name: "", price: "", image: "" });
      setShowForm(false);
    } catch (error) {
      console.error("Failed to add menu item:", error);
    }
  };

  const handleDeleteMenuItem = async (item) => {
    try {
      await axios.delete(`/delete-item/${item._id}`);
      setMenuItems(menuItems.filter((menuItem) => menuItem._id !== item._id));
    } catch (error) {
      console.error("Failed to delete menu item:", error);
    }
  };

  const handleUpdateMenuItem = (id) => {
    setSelectedItemId(id);
    const selectedItem = menuItems.find((item) => item._id === id);
    setNewMenuItem(selectedItem);
    setShowForm(true);
  };

  const handleUpdateMenuItemBackEnd = async () => {
    try {
      const response = await axios.put(
        `/update-item/${selectedItemId}`,
        newMenuItem
      );
      const updatedItemIndex = menuItems.findIndex(
        (item) => item.id === selectedItemId
      );
      const updatedMenuItems = [...menuItems];
      updatedMenuItems[updatedItemIndex] = response.data.updatedItem;
      setMenuItems(updatedMenuItems);
      setShowForm(false);
      setSelectedItemId(false);
    } catch (error) {
      console.error("Failed to update menu item:", error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Admin Page</h1>
      <div>
        <h2 className="text-2xl font-bold mb-2">Menu Items</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {menuItems.map((item) => (
            <div key={item._id} className="border p-4">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-auto mb-2"
              />
              <p className="text-lg font-bold">{item.name}</p>
              <p className="text-gray-600">{item.price}</p>
              <div className="flex mt-2">
                <button
                  onClick={() => handleDeleteMenuItem(item)}
                  className="mr-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
                >
                  Delete
                </button>

                <button
                  onClick={() => handleUpdateMenuItem(item._id)}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                >
                  Update
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-8">
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
        >
          Add New Item
        </button>
        {showForm && (
          <div className="mt-4">
            <h2 className="text-2xl font-bold mb-2">
              {selectedItemId ? "Update Item" : "Add New Item"}
            </h2>

            <form
              onSubmit={
                selectedItemId ? handleUpdateMenuItemBackEnd : handleAddMenuItem
              }
              className="flex flex-col md:w-1/2"
            >
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={newMenuItem.name}
                onChange={handleChange}
                className="px-4 py-2 mb-2 border"
              />
              <input
                type="text"
                name="price"
                placeholder="Price"
                value={newMenuItem.price}
                onChange={handleChange}
                className="px-4 py-2 mb-2 border"
              />
              <input
                type="text"
                name="image"
                placeholder="Image URL"
                value={newMenuItem.image}
                onChange={handleChange}
                className="px-4 py-2 mb-2 border"
              />
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
              >
                {selectedItemId ? "Update" : "Add"}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPage;
