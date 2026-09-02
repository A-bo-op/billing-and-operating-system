import React, { useState } from 'react';
import { X, Plus, Trash2, CheckCircle2 } from 'lucide-react';
import { useAppState } from '../../context/AppStateContext';

export const RecipeModal = ({ dish, isOpen, onClose }) => {
  const { ingredients, showToast } = useAppState();

  if (!isOpen || !dish) return null;

  const [recipeLines, setRecipeLines] = useState(dish.recipe || [
    { ingredientId: ingredients[0]?.id || '', name: ingredients[0]?.name || '', quantity: 100, unit: ingredients[0]?.unit || 'g' }
  ]);

  const handleAddLine = () => {
    const first = ingredients[0];
    setRecipeLines(prev => [
      ...prev,
      { ingredientId: first?.id || '', name: first?.name || '', quantity: 50, unit: first?.unit || 'g' }
    ]);
  };

  const handleRemoveLine = (idx) => {
    setRecipeLines(prev => prev.filter((_, i) => i !== idx));
  };

  const handleSave = () => {
    dish.recipe = recipeLines;
    dish.recipeLinked = recipeLines.length > 0;
    showToast(`Recipe updated for ${dish.name}`, 'success');
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
        width: '540px',
        maxWidth: '92vw',
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
            <div style={{ fontSize: '16px', fontWeight: '700', color: '#111827' }}>Ingredient Recipe — {dish.name}</div>
            <div style={{ fontSize: '12px', color: '#64748B' }}>Specify raw ingredient consumption per portion</div>
          </div>
          <button onClick={onClose} style={{ border: 'none', background: 'transparent', cursor: 'pointer' }}>
            <X size={20} color="#64748B" />
          </button>
        </div>

        <div style={{ padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <label style={{ fontSize: '13px', fontWeight: '600', color: '#475569' }}>
              Ingredients Used ({recipeLines.length})
            </label>
            <button className="btn btn-secondary btn-sm" onClick={handleAddLine}>
              <Plus size={14} /> Add Ingredient
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '280px', overflowY: 'auto' }}>
            {recipeLines.map((line, idx) => (
              <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '8px', border: '1px solid #E2E8F0', borderRadius: '6px' }}>
                <select
                  className="input-field"
                  style={{ flex: 2, height: '36px', fontSize: '13px' }}
                  value={line.ingredientId}
                  onChange={(e) => {
                    const sel = ingredients.find(i => i.id === e.target.value);
                    const updated = [...recipeLines];
                    updated[idx] = { ...line, ingredientId: e.target.value, name: sel ? sel.name : '', unit: sel ? sel.unit : 'g' };
                    setRecipeLines(updated);
                  }}
                >
                  {ingredients.map(ing => (
                    <option key={ing.id} value={ing.id}>{ing.name}</option>
                  ))}
                </select>

                <input
                  type="number"
                  className="input-field"
                  style={{ flex: 1, height: '36px', fontSize: '13px' }}
                  placeholder="Qty"
                  value={line.quantity}
                  onChange={(e) => {
                    const updated = [...recipeLines];
                    updated[idx] = { ...line, quantity: parseFloat(e.target.value) || 0 };
                    setRecipeLines(updated);
                  }}
                />

                <span style={{ fontSize: '12px', fontWeight: '600', color: '#64748B', width: '40px' }}>{line.unit}</span>

                <button
                  onClick={() => handleRemoveLine(idx)}
                  style={{ border: 'none', background: 'transparent', cursor: 'pointer', color: '#DC2626' }}
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div style={{ padding: '16px 20px', borderTop: '1px solid #E2E8F0', backgroundColor: '#F8FAFC', display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
          <button className="btn btn-secondary" onClick={onClose}>Cancel</button>
          <button className="btn btn-primary" onClick={handleSave}>
            <CheckCircle2 size={16} /> Save Recipe Link
          </button>
        </div>
      </div>
    </div>
  );
};
