import React from 'react';

function BranchSection({ location, staffList, menu }) {
  return (
    <div className="admin-section">
      <h3 className="section-title">{location} Branch</h3>

      <h4 className="subsection-title">Staff List</h4>
      <ul className="data-list">
        {staffList.map((s, i) => (
          <li key={i}>
            {s.username} - {s.role}
          </li>
        ))}
      </ul>

      <h4 className="subsection-title">Menu</h4>
      <ul className="data-list">
        {menu.map((m, i) => (
          <li key={i}>
            {m.name} - {m.price}₺
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BranchSection;
