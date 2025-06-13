import React from 'react';

function AddStaffForm({ newStaff, setNewStaff, onSubmit }) {
  return (
    <div className="admin-section">
      <h3 className="section-title">Add New Staff</h3>
      <input
        className="admin-input"
        placeholder="Username"
        value={newStaff.username}
        onChange={(e) => setNewStaff({ ...newStaff, username: e.target.value })}
      />
      <input
        className="admin-input"
        placeholder="Password"
        value={newStaff.password}
        onChange={(e) => setNewStaff({ ...newStaff, password: e.target.value })}
      />
      <input
        className="admin-input"
        placeholder="Location"
        value={newStaff.location}
        onChange={(e) => setNewStaff({ ...newStaff, location: e.target.value })}
      />
      <input
        className="admin-input"
        placeholder="Role (kitchen/waiter)"
        value={newStaff.role}
        onChange={(e) => setNewStaff({ ...newStaff, role: e.target.value })}
      />
      <button className="admin-button" onClick={onSubmit}>Add</button>
    </div>
  );
}

export default AddStaffForm;
