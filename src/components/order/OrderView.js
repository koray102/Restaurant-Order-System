// src/components/order/OrderView.js
import './OrderView.css';

function OrderView({
  cart,
  tableNumber,
  setTableNumber,
  note,
  setNote,
  cardInfo,
  setCardInfo,
  handlePayment,
  location
}) {
  return (
    <div className="order-page">
      <h2 className="titleorder">Place Your Order - {location}</h2>

      <div>
        <label className="masa-numarasi">Masa Numarası:</label>
        <input
          className="login-input"
          type="text"
          value={tableNumber}
          onChange={(e) => setTableNumber(e.target.value)}
          placeholder="Masa numarasını girin"
        />
      </div>

      <div>
        <label className="masa-numarasi">Sipariş Notu (isteğe bağlı):</label>
        <textarea
          className="login-input"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Sipariş notu ekleyin"
        />
      </div>

      <div>
        <label className="masa-numarasi">Kart Bilgisi (simülasyon):</label>
        <input
          className="login-input"
          type="text"
          value={cardInfo}
          onChange={(e) => setCardInfo(e.target.value)}
          placeholder="Kart numarası girin"
        />
      </div>

      <h3 className="sepetiniz">Sepetiniz</h3>
      {cart.length === 0 ? (
        <p>Sepetiniz boş.</p>
      ) : (
        <ul className="itemler">
          {cart.map((item, index) => (
            <li key={index}>
              {item.name} - {item.price}₺
            </li>
          ))}
        </ul>
      )}

      <button className="ode-button" onClick={handlePayment}>
        Öde
      </button>
    </div>
  );
}

export default OrderView;
