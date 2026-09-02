import React, { useState } from 'react';
import { AlertOctagon, X } from 'lucide-react';

export const SentItemCancelModal = ({ item, isOpen, onClose, onConfirm }) => {
  if (!isOpen || !item) return null;

  const [reason, setReason] = useState('Guest changed order');
  const [customReason, setCustomReason] = useState('');

  const reasons = [
    'Guest changed order',
    'Kitchen out of stock / ingredient',
    'Duplicate item entered by mistake',
    'Preparation delay / Guest left',
  ];

  const handleConfirm = () => {
    const finalReason = reason === 'Other' ? customReason || 'Other' : reason;
    onConfirm(item.id, finalReason);
    onClose();
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      backgroundColor: 'rgba(17, 24, 39, 0.5)',
      backdropFilter: 'blur(2px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 9999
    }}>
      <div style={{
        backgroundColor: '#FFFFFF',
        borderRadius: '12px',
        width: '460px',
        maxWidth: '90vw',
        border: '1px solid #FCA5A5',
        boxShadow: '0 20px 25px -5px rgba(220,38,38,0.1)',
        overflow: 'hidden'
      }}>
        {/* Header */}
        <div style={{
          padding: '16px 20px',
          borderBottom: '1px solid #FEE2E2',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          backgroundColor: '#FEF2F2'
        }}>
          <AlertOctagon size={24} color="#DC2626" />
          <div>
            <div style={{ fontSize: '16px', fontWeight: '700', color: '#991B1B' }}>
              Cancel Sent Kitchen Item?
            </div>
            <div style={{ fontSize: '12px', color: '#B91C1C' }}>
              {item.name} (Qty: {item.quantity}) was already sent to Kitchen
            </div>
          </div>
        </div>

        {/* Content */}
        <div style={{ padding: '20px' }}>
          <p style={{ fontSize: '13px', color: '#475569', marginBottom: '14px' }}>
            To prevent kitchen waste and inventory discrepancies, removing sent items requires selecting an audit reason:
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '14px' }}>
            {reasons.map((r) => (
              <label
                key={r}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '10px 14px',
                  borderRadius: '6px',
                  border: reason === r ? '1px solid #DC2626' : '1px solid #E2E8F0',
                  backgroundColor: reason === r ? '#FEF2F2' : '#FFFFFF',
                  cursor: 'pointer',
                  fontSize: '13px',
                  fontWeight: reason === r ? '600' : '400',
                  color: '#111827'
                }}
              >
                <input
                  type="radio"
                  name="cancelReason"
                  checked={reason === r}
                  onChange={() => setReason(r)}
                  style={{ accentColor: '#DC2626' }}
                />
                <span>{r}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div style={{ padding: '16px 20px', borderTop: '1px solid #E2E8F0', backgroundColor: '#F8FAFC', display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
          <button className="btn btn-secondary" onClick={onClose}>
            Keep Item in Order
          </button>
          <button className="btn btn-danger" onClick={handleConfirm}>
            Confirm Item Cancellation
          </button>
        </div>
      </div>
    </div>
  );
};
