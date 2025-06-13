import { useEffect, useState } from 'react';
import { getLocations, addStaff, deleteStaff, getStaffByLocation } from '../services/staffService';
import { getAllFoods } from '../services/foodService';
import AddStaffForm from '../components/AddStaffForm';
import DeleteStaffForm from '../components/DeleteStaffForm';
import BranchSection from '../components/BranchSection';
import './AdminPage.css';

function AdminPage() {
  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState('');
  const [staffList, setStaffList] = useState([]);
  const [menu, setMenu] = useState([]);

  const [newStaff, setNewStaff] = useState({ username: '', password: '', location: '', role: '' });
  const [deleteInfo, setDeleteInfo] = useState({ username: '', location: '' });

  useEffect(() => {
    const role = localStorage.getItem('staffRole');
    if (role !== 'admin') {
      alert("Bu sayfaya yalnızca admin erişebilir.");
      window.location.href = '/';
      return;
    }

    getLocations()
      .then(res => setLocations(res.data))
      .catch(err => console.error("Lokasyonlar alınamadı:", err));
  }, []);

  const handleAddStaff = () => {
    addStaff(newStaff)
      .then(() => {
        alert("Yeni staff eklendi!");
        setNewStaff({ username: '', password: '', location: '', role: '' });
      })
      .catch(err => alert("Eklenemedi: " + err.message));
  };

  const handleDeleteStaff = () => {
    deleteStaff(deleteInfo.username, deleteInfo.location)
      .then(() => {
        alert("Staff silindi.");
        setDeleteInfo({ username: '', location: '' });
      })
      .catch(err => alert("Silinemedi: " + err.message));
  };

  const handleSelectLocation = (loc) => {
    setSelectedLocation(loc);

    getStaffByLocation(loc)
      .then(res => setStaffList(res.data))
      .catch(err => console.error("Staff alınamadı:", err));

    getAllFoods()
      .then(res => setMenu(res.data))
      .catch(err => console.error("Menü alınamadı:", err));
  };

  return (
    <div className="admin-page">
      <h2 className="admin-title">Admin Paneli</h2>

      <AddStaffForm
        newStaff={newStaff}
        setNewStaff={setNewStaff}
        onSubmit={handleAddStaff}
      />

      <DeleteStaffForm
        deleteStaff={deleteInfo}
        setDeleteStaff={setDeleteInfo}
        onSubmit={handleDeleteStaff}
      />

      <div className="admin-section">
        <h3 className="section-title">Şubeler</h3>
        <div className="location-buttons">
          {locations.map(loc => (
            <button key={loc} className="location-button" onClick={() => handleSelectLocation(loc)}>
              {loc}
            </button>
          ))}
        </div>
      </div>

      {selectedLocation && (
        <BranchSection location={selectedLocation} staffList={staffList} menu={menu} />
      )}
    </div>
  );
}

export default AdminPage;
