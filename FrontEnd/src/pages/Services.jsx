import { useState, useEffect } from 'react';
import axios from 'axios';
import '../Sources/Services.css';

export default function Services() {
  const [services, setServices] = useState([]);
  const [newName, setNewName] = useState('');
  const [newCost, setNewCost] = useState('');


  useEffect(() => {
    axios.get('https://test1-i5ew.onrender.com/services')
      .then(res => setServices(res.data))
      .catch(err => console.error('Error fetching services:', err));
  }, []);

  const addService = async (e) => {
    e.preventDefault();
    if (!newName.trim() || !newCost) return;

    try {
      const res = await axios.post('https://test1-i5ew.onrender.com/service', {
        service: newName.trim(),
        paidValue: newCost.trim(),
      });

      setServices([...services, res.data]);
      setNewName('');
      setNewCost('');
    } catch (err) {
      console.error('Error adding service:', err);
    }
  };


  const deleteService = async (id) => {
    try {
      await axios.delete(`https://test1-i5ew.onrender.com/services/${id}`);
      setServices(services.filter(service => service.id !== id));
    } catch (err) {
      console.error('Error deleting service:', err);
    }
  };

  return (
    <div className="services-container">
      <h2>Service Packages</h2>

      <ol className="services-list">
        {services.map((service) => (
          <li key={service.id} className="service-item">
            <span>{service.service} - LKR {Number(service.paidValue).toLocaleString()}</span>
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
