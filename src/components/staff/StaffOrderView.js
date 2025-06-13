// src/components/staff/StaffOrderView.js
import './StaffOrderView.css';

function StaffOrderView({ location, staffRole, waiterCalls, onShowCalls, orders, onStatusUpdate }) {
  return (
    <div className="staff-page">
      <h2 className="staff-title">{location} - Incoming Orders</h2>

      <button className="call-button" onClick={onShowCalls}>
        Notifications
      </button>

      {waiterCalls.length > 0 && (
        <div className="call-section">
          <h4 className="call-title">Waiter Calls:</h4>
          {waiterCalls.map((call, i) => (
            <p className="call-item" key={i}>
              <strong>{call.tableNumber}. table</strong> is calling - reason: <em>{call.reason}</em> 
              ({new Date(call.timestamp).toLocaleTimeString()}).
            </p>
          ))}
        </div>
      )}

      {orders.length === 0 ? (
        <p className="empty-message">No orders yet.</p>
      ) : (
        orders.map((order, i) => (
            
          <div className="order-card" key={i}>
            <p><strong>Table Number:</strong> {order.tableNumber}</p>
            <p><strong>Note:</strong> {order.note || 'Yok'}</p>
            <p><strong>State:</strong> {order.status}</p>
            <p><strong>Orders:</strong> </p>
            <ul className="order-items">
              {(Array.isArray(order.cart)
                ? order.cart
                : order.cartJson
                  ? JSON.parse(order.cartJson)
                  : []).map((item, idx) => (
                <li key={idx}>
                  {item.name} - {item.price}₺
                  {item.rating && (
                    <span> | Rating: {item.rating} ⭐</span>
                  )}
                </li>
              ))}
            </ul>
            <p className="timestamp">
              <em>Time sent: {new Date(order.timestamp).toLocaleString()}</em>
            </p>

            {staffRole === "kitchen" && order.status === "siparis alindi" && (
              <button className="action-button" onClick={() => onStatusUpdate(order.id, "hazir")}>
                 Prepared
              </button>
            )}

            {staffRole === "waiter" && order.status === "hazir" && (
              <button className="action-button" onClick={() => onStatusUpdate(order.id, "teslim edildi")}>
                Delivered
              </button>
            )}
          </div>
        ))
      )}
    </div>
  );
}

export default StaffOrderView;
