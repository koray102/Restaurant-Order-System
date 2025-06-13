// src/components/rating/RatingView.js
import './RatingView.css';

function RatingView({ order, ratings, setRatings, handleSubmit }) {
  if (!order) return null;

  return (
    <div className="rating-page">
      <h2 className="rating-title">Yemeklerinizi Puanlayın</h2>
      <ul className="rating-list">
        {order.cart.map((item, index) => (
          <li key={index} className="rating-item">
            <div className="item-info">
              {item.name} - {item.price}₺
            </div>
            <select
              className="rating-select"
              value={ratings[index] || ''}
              onChange={(e) =>
                setRatings({ ...ratings, [index]: Number(e.target.value) })
              }
            >
              <option value="">Puan seçin</option>
              {[1, 2, 3, 4, 5].map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>
          </li>
        ))}
      </ul>
      <button className="rating-button" onClick={handleSubmit}>
        Puanları Kaydet
      </button>
    </div>
  );
}

export default RatingView;
