// src/components/staff/StaffOrderView.js
import './StaffOrderView.css';

function StaffOrderView({ location, staffRole, waiterCalls, onShowCalls, orders, onStatusUpdate }) {
  return (
    <div className="staff-page">
      <h2 className="staff-title">{location} - Gelen Siparişler</h2>

      <button className="call-button" onClick={onShowCalls}>
        Bildirimler
      </button>

      {waiterCalls.length > 0 && (
        <div className="call-section">
          <h4 className="call-title">Garson Çağrıları:</h4>
          {waiterCalls.map((call, i) => (
            <p className="call-item" key={i}>
              <strong>{call.tableNumber}. masa</strong> seni çağırıyor - <em>{call.reason}</em> nedeniyle
              ({new Date(call.timestamp).toLocaleTimeString()}).
            </p>
          ))}
        </div>
      )}

      {orders.length === 0 ? (
        <p className="empty-message">Henüz sipariş yok.</p>
      ) : (
        orders.map((order, i) => (
          <div className="order-card" key={i}>
            <p><strong>Masa No:</strong> {order.tableNumber}</p>
            <p><strong>Not:</strong> {order.note || 'Yok'}</p>
            <p><strong>Durum:</strong> {order.status}</p>
            <p><strong>Siparişler:</strong></p>
            <ul className="order-items">
              {(Array.isArray(order.cart)
                ? order.cart
                : order.cartJson
                  ? JSON.parse(order.cartJson)
                  : []).map((item, idx) => (
                <li key={idx}>
                  {item.name} - {item.price}₺
                  {item.rating && (
                    <span> | Puan: {item.rating} ⭐</span>
                  )}
                </li>
              ))}
            </ul>
            <p className="timestamp">
              <em>Gönderilme zamanı: {new Date(order.timestamp).toLocaleString()}</em>
            </p>

            {staffRole === "kitchen" && order.status === "siparis alindi" && (
              <button className="action-button" onClick={() => onStatusUpdate(order.id, "hazir")}>
                ✅ Hazırlandı
              </button>
            )}

            {staffRole === "waiter" && order.status === "hazir" && (
              <button className="action-button" onClick={() => onStatusUpdate(order.id, "teslim edildi")}>
                🛵 Teslim Edildi
              </button>
            )}
          </div>
        ))
      )}
    </div>
  );
}

export default StaffOrderView;
