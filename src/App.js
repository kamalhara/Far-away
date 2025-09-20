import { useState } from "react";

// const initialItems = [
//   { id: 1, description: "Passports", quantity: 2, packed: true },
//   { id: 2, description: "Socks", quantity: 12, packed: true },
//   { id: 3, description: "Charger", quantity: 1, packed: false },
// ];

export default function App() {
  const [items, setItems] = useState([]);

  function handleAddItems(item) {
    setItems((items) => [...items, item]);
  }
  function handleDel(id) {
    setItems((items) => items.filter((items) => items.id !== id));
  }
  function handleCheck(id) {
    setItems((items) =>
      items.map((item) =>
        id === item.id ? { ...item, packed: !item.packed } : item
      )
    );
  }
  function clearAll() {
    const confirmed = window.confirm(
      "Are you sure you want to delete all items ?"
    );
    if (confirmed) setItems([]);
  }
  return (
    <div className="app">
      <Logo />
      <Form handleAddItems={handleAddItems} />
      <PackingList
        items={items}
        handleDel={handleDel}
        handleCheck={handleCheck}
        clearAll={clearAll}
      />
      <Stats items={items} />
    </div>
  );
}
function Logo() {
  return <h1>🏝️Far Away💼</h1>;
}
function Form({ handleAddItems }) {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  function handleSubmit(e) {
    e.preventDefault();
    const newItem = { description, quantity, packed: false, id: Date.now() };
    if (!description) return;
    console.log(newItem);

    handleAddItems(newItem);
    setDescription("");
    setQuantity(1);
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for your 😍 trip?</h3>
      <select
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
      >
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Item..."
        value={description}
        onChange={(e) => {
          setDescription(e.target.value);
        }}
      />
      <button>Add</button>
    </form>
  );
}
function PackingList({ items, handleDel, handleCheck, clearAll }) {
  return (
    <div className="list">
      <ul>
        {items.map((item) => (
          <Items
            item={item}
            key={item.id}
            handleDel={handleDel}
            handleCheck={handleCheck}
          />
        ))}
      </ul>
      <div className="actions">
        <select>
          <option value="description">Sort By Description</option>
          <option value="input ">Sort By Input Order </option>
          <option value="packed">Sort By Packed </option>
        </select>
        <button onClick={clearAll}>Clear</button>
      </div>
    </div>
  );
}
function Items({ item, handleDel, handleCheck }) {
  return (
    <li>
      <input
        type="checkbox"
        value={item.packed}
        onChange={() => handleCheck(item.id)}
      ></input>
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity}.{item.description}
        <button onClick={() => handleDel(item.id)}>❌</button>
      </span>
    </li>
  );
}
function Stats({ items }) {
  const numItems = items.length;
  const numPacked = items.filter((items) => items.packed).length;
  const percentage = Math.round((numPacked / numItems) * 100);
  return (
    <footer className="stats">
      <em>
        {percentage === 100
          ? "You are Ready to go ✈️"
          : ` You have ${numItems} items on the list, and you already packed
        ${numPacked} (${percentage}%)`}
      </em>
    </footer>
  );
}
