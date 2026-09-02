import React, { useState } from 'react';
import { X, Plus } from 'lucide-react';
import { useAppState } from '../../context/AppStateContext';

export const AddIngredientModal = ({ isOpen, onClose }) => {
  const { addIngredient } = useAppState();

  const [name, setName] = useState('');
  const [category, setCategory] = useState('Dairy');
  const [stock, setStock] = useState('');
  const [minStock, setMinStock] = useState('');
  const [unit, setUnit] = useState('kg');
  const [costPerUnit, setCostPerUnit] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !stock || !minStock) return;

    addIngredient({
      name,
      category,
      stock,
      minStock,
      unit,
      costPerUnit,
    });

    setName('');
    setStock('');
    setMinStock('');
    setCostPerUnit('');
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
        width: '500px',
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
          <div style={{ fontSize: '16px', fontWeight: '700', color: '#111827' }}>Add New Raw Ingredient</div>
          <button onClick={onClose} style={{ border: 'none', background: 'transparent', cursor: 'pointer' }}>
            <X size={20} color="#64748B" />
          </button>
        </div>

        <form onSubmit={handleSubmit} style={{ padding: '20px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#475569', marginBottom: '4px' }}>
                Ingredient Name <span style={{ color: '#DC2626' }}>*</span>
              </label>
              <input
                type="text"
                className="input-field"
                placeholder="e.g. Cream, Garlic, Mozzarella Cheese"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div style={{ display: 'flex', gap: '12px' }}>
              <div style={{ flex: 1 }}>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#475569', marginBottom: '4px' }}>Category</label>
                <select className="input-field" value={category} onChange={(e) => setCategory(e.target.value)}>
                  <option value="Dairy">Dairy</option>
                  <option value="Vegetables">Vegetables</option>
                  <option value="Meat">Meat</option>
                  <option value="Grains">Grains</option>
                  <option value="Oils">Oils & Fats</option>
                  <option value="Spices">Spices & Sauces</option>
                  <option value="Flour">Flour & Bakery</option>
                </select>
              </div>

              <div style={{ flex: 1 }}>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#475569', marginBottom: '4px' }}>Base Unit</label>
                <select className="input-field" value={unit} onChange={(e) => setUnit(e.target.value)}>
                  <option value="kg">kg (Kilograms)</option>
                  <option value="g">g (Grams)</option>
                  <option value="L">L (Liters)</option>
                  <option value="ml">ml (Milliliters)</option>
                  <option value="piece">piece (Units)</option>
                  <option value="pack">pack (Packets)</option>
                  <option value="box">box</option>
                </select>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '12px' }}>
              <div style={{ flex: 1 }}>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#475569', marginBottom: '4px' }}>Initial Stock</label>
                <input
                  type="number"
                  step="0.01"
                  className="input-field"
                  placeholder="0.0"
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                  required
                />
              </div>

              <div style={{ flex: 1 }}>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#475569', marginBottom: '4px' }}>Low Stock Alert Min</label>
                <input
                  type="number"
                  step="0.01"
                  className="input-field"
                  placeholder="Alert threshold"
                  value={minStock}
                  onChange={(e) => setMinStock(e.target.value)}
                  required
                />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#475569', marginBottom: '4px' }}>Est. Cost per Unit (₹)</label>
              <input
                type="number"
                step="0.01"
                className="input-field"
                placeholder="Cost rate (Optional)"
                value={costPerUnit}
                onChange={(e) => setCostPerUnit(e.target.value)}
              />
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '20px' }}>
            <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn btn-primary">Save Ingredient</button>
          </div>
        </form>
      </div>
    </div>
  );
};
