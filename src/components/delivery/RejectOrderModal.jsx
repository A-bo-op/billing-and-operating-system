import React, { useState } from 'react';
import { X, AlertTriangle, ShieldAlert } from 'lucide-react';
import { useAppState } from '../../context/AppStateContext';

export const RejectOrderModal = ({ order, isOpen, onClose }) => {
  const { rejectOnlineOrder } = useAppState();
  const [selectedReason, setSelectedReason] = useState('Kitchen at peak capacity');
  const [customReason, setCustomReason] = useState('');

  if (!isOpen || !order) return null;

  const reasons = [
    'Kitchen at peak capacity',
    'Item(s) out of stock',
    'Closing for the day',
    'Delivery address unserviceable',
    'Other reason'
  ];

  const handleConfirm = () => {
    const finalReason = selectedReason === 'Other reason' && customReason.trim()
      ? customReason
      : selectedReason;
    rejectOnlineOrder(order.id, finalReason);
    onClose();
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      backgroundColor: 'rgba(15, 23, 42, 0.6)',
      backdropFilter: 'blur(4px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 9999
    }}>
      <div style={{
        backgroundColor: '#FFFFFF',
        borderRadius: '16px',
        width: '420px',
        maxWidth: '92vw',
        border: '1px solid #E2E8F0',
        boxShadow: '0 25px 50px -12px rgba(15, 23, 42, 0.25)',
        overflow: 'hidden'
      }} className="animate-slide-up">
        <div style={{
          padding: '18px 24px',
          borderBottom: '1px solid #E2E8F0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: '#FEF2F2'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <AlertTriangle size={18} color="#E11D48" />
            <h3 style={{ fontSize: '16px', fontWeight: '800', color: '#9F1239' }}>
              Reject {order.platform.toUpperCase()} Order {order.orderNo}
            </h3>
          </div>
          <button onClick={onClose} style={{ border: 'none', background: 'transparent', cursor: 'pointer' }}>
            <X size={18} color="#64748B" />
          </button>
        </div>

        <div style={{ padding: '20px 24px' }}>
          <p style={{ fontSize: '13px', color: '#64748B', marginBottom: '14px' }}>
            Please select the cancellation reason reported to {order.platform.toUpperCase()} aggregator:
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '16px' }}>
            {reasons.map((r) => (
              <label
                key={r}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '10px 12px',
                  borderRadius: '8px',
                  border: selectedReason === r ? '1px solid #E11D48' : '1px solid #E2E8F0',
                  backgroundColor: selectedReason === r ? '#FEF2F2' : '#FFFFFF',
                  cursor: 'pointer',
                  fontSize: '13.5px',
                  fontWeight: selectedReason === r ? '700' : '500',
                  color: selectedReason === r ? '#9F1239' : '#334155'
                }}
              >
                <input
                  type="radio"
                  name="rejectReason"
                  checked={selectedReason === r}
                  onChange={() => setSelectedReason(r)}
                />
                <span>{r}</span>
              </label>
            ))}
          </div>

          {selectedReason === 'Other reason' && (
            <input
              type="text"
              className="input-field"
              placeholder="Specify cancellation reason..."
              value={customReason}
              onChange={(e) => setCustomReason(e.target.value)}
              style={{ marginBottom: '12px' }}
              autoFocus
            />
          )}
        </div>

        <div style={{
          padding: '16px 24px',
          borderTop: '1px solid #E2E8F0',
          backgroundColor: '#F8FAFC',
          display: 'flex',
          justifyContent: 'flex-end',
          gap: '10px'
        }}>
          <button className="btn btn-secondary btn-sm" onClick={onClose}>Cancel</button>
          <button className="btn btn-danger btn-sm" onClick={handleConfirm}>
            Confirm Rejection
          </button>
        </div>
      </div>
    </div>
  );
};
