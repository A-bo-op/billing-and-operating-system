import React, { useState } from 'react';
import { X, Sliders, AlertTriangle } from 'lucide-react';
import { useAppState } from '../../context/AppStateContext';

export const StockAdjustmentModal = ({ ingredient, isOpen, onClose }) => {
  const { adjustStock } = useAppState();

  const [type, setType] = useState('Add Stock'); // Add Stock | Remove Stock | Wastage | Physical Audit Correction
  const [quantity, setQuantity] = useState('');
  const [reason, setReason] = useState('');

  if (!isOpen || !ingredient) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const qtyNum = parseFloat(quantity);
    if (isNaN(qtyNum) || qtyNum <= 0) {
      alert('Please enter a valid positive quantity');
      return;
    }
    if (!reason.trim()) {
      alert('Please enter an adjustment reason for audit tracking');
      return;
    }

    adjustStock(ingredient.id, qtyNum, type, reason);
    setQuantity('');
    setReason('');
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
        width: '480px',
        maxWidth: '90vw',
        border: '1px solid #E2E8F0',
        boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)',
        overflow: 'hidden'
      }}>
        {/* Header */}
        <div style={{
          padding: '16px 20px',
          borderBottom: '1px solid #E2E8F0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: '#F8FAFC'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Sliders size={20} color="#3366FF" />
            <div>
              <div style={{ fontSize: '16px', fontWeight: '700', color: '#111827' }}>
                Stock Adjustment — {ingredient.name}
              </div>
              <div style={{ fontSize: '12px', color: '#64748B' }}>
                Current Stock: <strong>{ingredient.stock} {ingredient.unit}</strong>
              </div>
            </div>
          </div>
          <button onClick={onClose} style={{ border: 'none', background: 'transparent', cursor: 'pointer' }}>
            <X size={20} color="#64748B" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ padding: '20px' }}>
          {/* Adjustment Type Radio */}
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#475569', marginBottom: '8px' }}>
              Adjustment Type
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
              {['Add Stock', 'Remove Stock', 'Wastage', 'Physical Audit Correction'].map((t) => (
                <button
                  type="button"
                  key={t}
                  onClick={() => setType(t)}
                  style={{
                    padding: '10px',
                    borderRadius: '6px',
                    border: type === t ? '1px solid #3366FF' : '1px solid #E2E8F0',
                    backgroundColor: type === t ? '#EFF6FF' : '#FFFFFF',
                    color: type === t ? '#3366FF' : '#475569',
                    fontSize: '12px',
                    fontWeight: '600',
                    cursor: 'pointer'
                  }}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity */}
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#475569', marginBottom: '6px' }}>
              Quantity ({ingredient.unit})
            </label>
            <input
              type="number"
              step="0.01"
              className="input-field"
              placeholder={`Enter quantity in ${ingredient.unit}`}
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              required
            />
          </div>

          {/* Audit Reason Input */}
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#475569', marginBottom: '6px' }}>
              Reason for Adjustment <span style={{ color: '#DC2626' }}>*</span>
            </label>
            <input
              type="text"
              className="input-field"
              placeholder="e.g. Prep loss, Kitchen spill, Physical count audit, Received shipment"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              required
            />
            <span style={{ fontSize: '11px', color: '#64748B', display: 'block', marginTop: '4px' }}>
              Audit rule: Every manual stock change must include a clear explanation.
            </span>
          </div>

          {/* Footer */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '24px' }}>
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Save Adjustment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
