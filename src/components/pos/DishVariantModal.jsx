import React, { useState } from 'react';
import { X, Check } from 'lucide-react';

export const DishVariantModal = ({ dish, isOpen, onClose, onAdd }) => {
  if (!isOpen || !dish) return null;

  const [selectedVariant, setSelectedVariant] = useState(dish.variants ? dish.variants[0] : null);
  const [kitchenNote, setKitchenNote] = useState('');

  const handleConfirm = () => {
    onAdd(dish, selectedVariant, kitchenNote);
    onClose();
    setKitchenNote('');
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
          <div>
            <div style={{ fontSize: '18px', fontWeight: '700', color: '#111827' }}>Customize {dish.name}</div>
            <div style={{ fontSize: '12px', color: '#64748B' }}>Select portion size & kitchen notes</div>
          </div>
          <button onClick={onClose} style={{ border: 'none', background: 'transparent', cursor: 'pointer' }}>
            <X size={20} color="#64748B" />
          </button>
        </div>

        {/* Options */}
        <div style={{ padding: '20px' }}>
          {/* Variants radio list */}
          {dish.variants && (
            <div style={{ marginBottom: '20px' }}>
              <div style={{ fontSize: '13px', fontWeight: '600', color: '#475569', marginBottom: '10px' }}>
                Select Portion / Variant
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {dish.variants.map((varItem) => {
                  const isSel = selectedVariant?.id === varItem.id;
                  return (
                    <div
                      key={varItem.id}
                      onClick={() => setSelectedVariant(varItem)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '12px 16px',
                        borderRadius: '8px',
                        border: isSel ? '2px solid #3366FF' : '1px solid #E2E8F0',
                        backgroundColor: isSel ? '#EFF6FF' : '#FFFFFF',
                        cursor: 'pointer'
                      }}
                    >
                      <span style={{ fontSize: '14px', fontWeight: '600', color: '#111827' }}>{varItem.name}</span>
                      <span style={{ fontSize: '15px', fontWeight: '700', color: '#3366FF' }}>₹{varItem.price}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Kitchen Note */}
          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#475569', marginBottom: '6px' }}>
              Special Kitchen Instruction (KOT Note)
            </label>
            <input
              type="text"
              className="input-field"
              placeholder="e.g. Less spicy, Extra crispy, No onions"
              value={kitchenNote}
              onChange={(e) => setKitchenNote(e.target.value)}
            />
          </div>
        </div>

        {/* Footer */}
        <div style={{ padding: '16px 20px', borderTop: '1px solid #E2E8F0', backgroundColor: '#F8FAFC', display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
          <button className="btn btn-secondary" onClick={onClose}>Cancel</button>
          <button className="btn btn-primary" onClick={handleConfirm}>
            Add Item — ₹{selectedVariant ? selectedVariant.price : dish.price}
          </button>
        </div>
      </div>
    </div>
  );
};
