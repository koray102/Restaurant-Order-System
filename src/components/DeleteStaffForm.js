import React from 'react';

function DeleteStaffForm({ deleteStaff, setDeleteStaff, onSubmit }) {
  return (
    <div className="admin-section">
      <h3 className="section-title">Delete Staff</h3>
      <input
        className="admin-input"
        placeholder="Username"
        value={deleteStaff.username}
        onChange={(e) => setDeleteStaff({ ...deleteStaff, username: e.target.value })}
      />
      <input
        className="admin-input"
        placeholder="Location"
        value={deleteStaff.location}
        onChange={(e) => setDeleteStaff({ ...deleteStaff, location: e.target.value })}
      />
      <button className="admin-button" onClick={onSubmit}>Delete</button>
    </div>
  );
}

export default DeleteStaffForm;
