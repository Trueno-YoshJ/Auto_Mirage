import { useState } from 'react';
import '../Sources/Services.css';

export default function Services() {
  const [services, setServices] = useState([
    { id: 1, name: 'Oil Change', cost: 2500 },
    { id: 2, name: 'Battery Replacement', cost: 12000 },
    { id: 3, name: 'Brake Repair', cost: 8000 },
  ]);

  const [newName, setNewName] = useState('');
  const [newCost, setNewCost] = useState('');

  const addService = (e) => {
    e.preventDefault();
    if (!newName.trim() || !newCost) return;

    const newService = {
      id: Date.now(),
      name: newName.trim(),
      cost: Number(newCost),
    };
    setServices([...services, newService]);
    setNewName('');
    setNewCost('');
  };

  const deleteService = (id) => {
    setServices(services.filter(service => service.id !== id));
  };

  return (
    <div className="services-container">
      <h2>Service Packages</h2>

      <ol className="services-list">
        {services.map((service, index) => (
          <li key={service.id} className="service-item">
            <span>{service.name} - LKR {service.cost.toLocaleString()}</span>
            <button onClick={() => deleteService(service.id)} className="delete-btn">
              Delete
            </button>
          </li>
        ))}
      </ol>

      <form onSubmit={addService} className="service-form">
        <input
          type="text"
          placeholder="Service name"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          required
          className="input-text"
        />
        <input
          type="number"
          placeholder="Cost"
          value={newCost}
          onChange={(e) => setNewCost(e.target.value)}
          required
          min="0"
          className="input-number"
        />
        <button type="submit" className="add-btn">
          Add Service
        </button>
      </form>
    </div>
  );
}
