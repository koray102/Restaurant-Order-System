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
        <label className="masa-numarasi">Table Number:</label>
        <input
          className="login-input"
          type="text"
          value={tableNumber}
          onChange={(e) => setTableNumber(e.target.value)}
          placeholder="Enter table number"
        />
      </div>

      <div>
        <label className="masa-numarasi">Add a Note to Your Order (optional):</label>
        <textarea
          className="login-input"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Add note"
        />
      </div>

      <div>
        <label className="masa-numarasi">Card Info (simulation):</label>
        <input
          className="login-input"
          type="text"
          value={cardInfo}
          onChange={(e) => setCardInfo(e.target.value)}
          placeholder="Enter card information"
        />
      </div>

      <h3 className="sepetiniz">Your Cart</h3>
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
        Pay
      </button>
    </div>
  );
}

export default OrderView;
