import { useState, useEffect } from 'react';
import './App.css';
import iceCreamImage from './assets/ice-cream.png';

const IceCreamApp = () => {
  const [flavors, setFlavors] = useState([
    'Vanilla',
    'Chocolate',
    'Strawberry',
    'Mint Chip',
    'Cookies and Cream',
  ]);
  const [selectedFlavor, setSelectedFlavor] = useState('');
  const [flavorOfTheDay, setFlavorOfTheDay] = useState('');
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    setFlavorOfTheDay(flavors[Math.floor(Math.random() * flavors.length)]);
  }, [flavors]);

  const handleFlavorChange = (event) => {
    setSelectedFlavor(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (selectedFlavor) {
      const newOrder = {
        id: Date.now(),
        flavor: selectedFlavor,
        createdAt: new Date().toISOString(),
      };
      setOrders([newOrder, ...orders]);
      alert(`Order placed successfully! Flavor: ${selectedFlavor}`);
      setSelectedFlavor('');
    } else {
      alert('Please select a flavor before placing an order.');
    }
  };

  return (
    <div className="ice-cream-app">
      <h1>Ice Cream Shop</h1>
      <img src={iceCreamImage} className="ice-cream-image" alt="Ice Cream Shop" />
      <h2 className="flavor-of-the-day">Flavor of the Day: {flavorOfTheDay}</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Select a flavor:
          <select value={selectedFlavor} onChange={handleFlavorChange}>
            <option value="">-- Select a flavor --</option>
            {flavors.map((flavor) => (
              <option key={flavor} value={flavor}>
                {flavor}
              </option>
            ))}
          </select>
        </label>
        <button type="submit">Purchase</button>
      </form>
      <h2>Current Orders:</h2>
      {orders.length > 0 ? (
        <ul className="orders-list">
          {orders.map((order) => (
            <li key={order.id}>
              {order.flavor} - {new Date(order.createdAt).toLocaleString()}
            </li>
          ))}
        </ul>
      ) : (
        <p>No orders yet.</p>
      )}
    </div>
  );
};

export default IceCreamApp;
