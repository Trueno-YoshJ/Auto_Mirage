import { useState, useEffect } from 'react';
import '../Sources/Maintenance.css';
import axios from 'axios';

export default function Maintenance() {
  const [records, setRecords] = useState([]);

  const [editData, setEditData] = useState({
    vehicleNumber: '',
    ownerName: '',
    servicePackage: '',
    paidValue: '',
    dateTime: '',
  });

  const [newData, setNewData] = useState({
    vehicleNumber: '',
    ownerName: '',
    servicePackage: '',
    paidValue: '',
    dateTime: '',
  });

  useEffect(() => {
    axios.get('https://test1-i5ew.onrender.com/users')
      .then(response => {
        setRecords(response.data);
      })
      .catch(error => {
        console.error('Error fetching maintenance records:', error);
      });
  }, []);

const handleDelete = (id) => {
  axios.delete(`https://test1-i5ew.onrender.com/user/${id}`)
    .then(() => {
      setRecords(records.filter(record => record.id !== id));
    })
    .catch(err => console.error(err));
};

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditData(prev => ({ ...prev, [name]: value }));
  };

  const handleNewInputChange = (e) => {
    const { name, value } = e.target;
    setNewData(prev => ({ ...prev, [name]: value }));
  };

  const handleEditLoad = () => {
    const rec = records.find(
      r => r.vehicleNumber.toLowerCase() === editData.vehicleNumber.trim().toLowerCase()
    );
    if (rec) {
      setEditData({
        id: rec.id,
        vehicleNumber: rec.vehicleNumber,
        ownerName: rec.ownerName,
        servicePackage: rec.servicePackage,
        paidValue: rec.paidValue,
        dateTime: rec.dateTime.split('T')[0], 
      });
    } else {
      alert('Vehicle not found');
    }
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    axios.put(`https://test1-i5ew.onrender.com/user/${editData.id}`, editData)
      .then(() => {
        axios.get('https://test1-i5ew.onrender.com/users')
          .then(getRes => {
            setRecords(getRes.data);
            setEditData({
              vehicleNumber: '',
              ownerName: '',
              servicePackage: '',
              paidValue: '',
              dateTime: '',
            });
          })
          .catch(getErr => {
            console.error('Error fetching updated records:', getErr);
            alert('Record updated, but failed to refresh table.');
          });
      })
      .catch(error => {
        console.error('Error updating record:', error);
        alert('Failed to update record.');
      });
  };

  const handleNewSubmit = (e) => {
    e.preventDefault();
    const exists = records.some(r => r.vehicleNumber === newData.vehicleNumber);
    if (exists) {
      alert('Vehicle with this number already exists.');
      return;
    }
    axios.post('https://test1-i5ew.onrender.com/user', {
      ...newData,
      paidValue: Number(newData.paidValue) || 0,
    })
      .then(() => {
        axios.get('https://test1-i5ew.onrender.com/users')
          .then(getRes => {
            setRecords(getRes.data);
            setNewData({
              vehicleNumber: '',
              ownerName: '',
              servicePackage: '',
              paidValue: '',
              dateTime: '',
            });
          })
          .catch(getErr => {
            console.error('Error fetching updated records:', getErr);
            alert('Record added, but failed to refresh table.');
          });
      })
      .catch(error => {
        console.error('Error adding record:', error);
        alert('Failed to add record.');
      });
  };
  

  return (
    <div className="maintenance-container">
      <h2>Vehicle Maintenance History</h2>

      <table className="maintenance-table">
        <thead>
          <tr>
            <th>Vehicle Number</th>
            <th>Owner Name</th>
            <th>Service Package</th>
            <th>Paid Value (Rs)</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {records.map((rec) => (
            <tr key={rec.vehicleNumber}>
              <td>{rec.vehicleNumber}</td>
              <td>{rec.ownerName}</td>
              <td>{rec.servicePackage}</td>
              <td>{rec.paidValue.toLocaleString()}</td>
              <td>{rec.dateTime.split('T')[0]}</td>
              <td>
                <button onClick={() => handleDelete(rec.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className='form-section'>
        <div className='form-wrapper'>
          <form onSubmit={handleEditSubmit} className="maintenance-form">
            <div>
              <label>Vehicle Number:</label>
              <input
                type="text"
                name="vehicleNumber"
                value={editData.vehicleNumber}
                onChange={handleEditInputChange}
                required
              />
              <button type="button" onClick={handleEditLoad}>Load</button>
            </div>
            <div>
              <label>Owner Name:</label>
              <input
                type="text"
                name="ownerName"
                value={editData.ownerName}
                onChange={handleEditInputChange}
                required
              />
            </div>
            <div>
              <label>Service Package:</label>
              <input
                type="text"
                name="servicePackage"
                value={editData.servicePackage}
                onChange={handleEditInputChange}
                required
              />
            </div>
            <div>
              <label>Paid Value (Rs):</label>
              <input
                type="number"
                name="paidValue"
                value={editData.paidValue}
                onChange={handleEditInputChange}
                required
              />
            </div>
            <div>
              <label>Date:</label>
              <input
                type="date"
                name="dateTime"
                value={editData.dateTime}
                onChange={handleEditInputChange}
                required
              />
            </div>

            <button type="submit">Update Record</button>
          </form>
        </div>

        <div className='form-wrapper'>
          <form onSubmit={handleNewSubmit} className="maintenance-form">
            <div>
              <label>Vehicle Number:</label>
              <input
                type="text"
                name="vehicleNumber"
                value={newData.vehicleNumber}
                onChange={handleNewInputChange}
                required
              />
            </div>
            <div>
              <label>Owner Name:</label>
              <input
                type="text"
                name="ownerName"
                value={newData.ownerName}
                onChange={handleNewInputChange}
                required
              />
            </div>
            <div>
              <label>Service Package:</label>
              <input
                type="text"
                name="servicePackage"
                value={newData.servicePackage}
                onChange={handleNewInputChange}
                required
              />
            </div>
            <div>
              <label>Paid Value (Rs):</label>
              <input
                type="number"
                name="paidValue"
                value={newData.paidValue}
                onChange={handleNewInputChange}
                required
              />
            </div>
            <div>
              <label>Date:</label>
              <input
                type="date"
                name="dateTime"
                value={newData.dateTime}
                onChange={handleNewInputChange}
                required
              />
            </div>
            <button type="submit">Add Record</button>
          </form>
        </div>
      </div>
    </div>
  );
}
