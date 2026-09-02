import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useAppState } from '../../context/AppStateContext';
import { CATEGORIES } from '../../data/demoData';

export const AddDishModal = ({ isOpen, onClose }) => {
  const { addDish } = useAppState();

  const [name, setName] = useState('');
  const [category, setCategory] = useState('Starters');
  const [price, setPrice] = useState('');
  const [isVeg, setIsVeg] = useState(true);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !price) return;

    addDish({
      name,
      category,
      price,
      isVeg,
      isAvailable: true,
      hasVariants: false,
    });

    setName('');
    setPrice('');
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
        border: '1px solid #E2E8F0',
        boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)',
        overflow: 'hidden'
      }}>
        <div style={{
          padding: '16px 20px',
          borderBottom: '1px solid #E2E8F0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: '#F8FAFC'
        }}>
          <div style={{ fontSize: '16px', fontWeight: '700', color: '#111827' }}>Add New Dish</div>
          <button onClick={onClose} style={{ border: 'none', background: 'transparent', cursor: 'pointer' }}>
            <X size={20} color="#64748B" />
          </button>
        </div>

        <form onSubmit={handleSubmit} style={{ padding: '20px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#475569', marginBottom: '4px' }}>
                Dish Name <span style={{ color: '#DC2626' }}>*</span>
              </label>
              <input
                type="text"
                className="input-field"
                placeholder="e.g. Malai Kofta, Mango Lassi"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div style={{ display: 'flex', gap: '12px' }}>
              <div style={{ flex: 1 }}>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#475569', marginBottom: '4px' }}>Category</label>
                <select className="input-field" value={category} onChange={(e) => setCategory(e.target.value)}>
                  {CATEGORIES.filter(c => c !== 'All').map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div style={{ flex: 1 }}>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#475569', marginBottom: '4px' }}>Selling Price (₹)</label>
                <input
                  type="number"
                  className="input-field"
                  placeholder="220"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  required
                />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#475569', marginBottom: '6px' }}>Dietary Type</label>
              <div style={{ display: 'flex', gap: '12px' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', fontSize: '13px' }}>
                  <input type="radio" name="vegType" checked={isVeg} onChange={() => setIsVeg(true)} />
                  <span>Vegetarian (Green Dot)</span>
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', fontSize: '13px' }}>
                  <input type="radio" name="vegType" checked={!isVeg} onChange={() => setIsVeg(false)} />
                  <span>Non-Vegetarian (Red Dot)</span>
                </label>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '20px' }}>
            <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn btn-primary">Save Dish</button>
          </div>
        </form>
      </div>
    </div>
  );
};
