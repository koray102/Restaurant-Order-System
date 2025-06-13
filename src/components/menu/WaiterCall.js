// src/components/menu/WaiterCall.js
import React, { useState } from 'react';

function WaiterCall() {
  const [callStep, setCallStep] = useState(0); // 0 = gizli, 1 = masa sor, 2 = sebep sor
  const [callTable, setCallTable] = useState('');

  const handleStartCall = () => {
    setCallStep(1);
  };

  const handleTableSubmit = () => {
    if (!callTable) {
      alert("Lütfen masa numarası girin.");
      return;
    }
    setCallStep(2);
  };

  const handleSendCall = (reason) => {
    const calls = JSON.parse(localStorage.getItem('waiterCalls')) || [];

    const newCall = {
      tableNumber: callTable,
      reason,
      timestamp: Date.now(),
    };

    calls.push(newCall);
    localStorage.setItem('waiterCalls', JSON.stringify(calls));
    alert(`Garson çağrıldı - ${reason}`);
    setCallStep(0);
    setCallTable('');
  };

  return (
    <div style={{ marginTop: '20px' }}>
      <button
        className="call-waiter-btn"
        onClick={handleStartCall}
        style={{
          backgroundColor: '#ff9800',
          color: 'white',
          padding: '10px',
          border: 'none',
          borderRadius: '5px',
        }}
      >
        Garsonu Çağır
      </button>

      {callStep === 1 && (
        <div style={{ marginTop: '10px' }}>
          <input
            type="text"
            placeholder="Masa numaranız"
            value={callTable}
            onChange={(e) => setCallTable(e.target.value)}
            style={{ padding: '8px', borderRadius: '5px', marginRight: '10px' }}
          />
          <button
            onClick={handleTableSubmit}
            style={{
              backgroundColor: '#2196f3',
              color: 'white',
              padding: '8px',
              border: 'none',
              borderRadius: '5px',
            }}
          >
            Devam Et
          </button>
        </div>
      )}

      {callStep === 2 && (
        <div style={{ marginTop: '10px' }}>
          <p>Hangi sebeple garson çağırıyorsunuz?</p>
          {['Temizlik', 'Teknik Aksaklık', 'Yemekle ilgili', 'Diğer'].map((reason) => (
            <button
              key={reason}
              onClick={() => handleSendCall(reason)}
              style={{
                margin: '5px',
                padding: '8px',
                borderRadius: '5px',
                backgroundColor: '#4caf50',
                color: 'white',
                border: 'none',
              }}
            >
              {reason}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default WaiterCall;
