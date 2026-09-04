import React, { useState, useEffect } from 'react';
import { X, Plus, Trash2, CheckCircle2, Sparkles, BookOpen, Layers } from 'lucide-react';
import { useAppState } from '../../context/AppStateContext';

export const RecipeModal = ({ dish, isOpen, onClose }) => {
  const { ingredients, updateDishRecipe } = useAppState();

  const [recipeLines, setRecipeLines] = useState([]);

  useEffect(() => {
    if (dish && dish.recipe) {
      setRecipeLines(dish.recipe);
    } else if (ingredients.length > 0) {
      setRecipeLines([
        { ingredientId: ingredients[0].id, name: ingredients[0].name, quantity: 100, unit: ingredients[0].unit }
      ]);
    }
  }, [dish, ingredients]);

  if (!isOpen || !dish) return null;

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
    updateDishRecipe(dish.id, recipeLines);
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
        width: '560px',
        maxWidth: '92vw',
        border: '1px solid #E2E8F0',
        boxShadow: '0 25px 50px -12px rgba(15, 23, 42, 0.25)',
        overflow: 'hidden'
      }} className="animate-slide-up">
        {/* Header */}
        <div style={{
          padding: '18px 24px',
          borderBottom: '1px solid #E2E8F0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: '#F8FAFC'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{
                width: '28px',
                height: '28px',
                borderRadius: '8px',
                backgroundColor: '#EFF6FF',
                color: '#2563EB',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <BookOpen size={16} />
              </div>
              <div style={{ fontSize: '17px', fontWeight: '800', color: '#0F172A', letterSpacing: '-0.02em' }}>
                Recipe Matrix &bull; {dish.name}
              </div>
            </div>
            <div style={{ fontSize: '12.5px', color: '#64748B', marginTop: '2px', marginLeft: '36px' }}>
              Raw ingredients automatically deducted per portion billed
            </div>
          </div>
          <button
            onClick={onClose}
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '8px',
              border: 'none',
              backgroundColor: '#F1F5F9',
              color: '#64748B',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer'
            }}
          >
            <X size={18} />
          </button>
        </div>

        <div style={{ padding: '22px 24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
            <label style={{ fontSize: '13px', fontWeight: '700', color: '#334155' }}>
              Ingredients In This Dish ({recipeLines.length})
            </label>
            <button className="btn btn-secondary btn-sm" onClick={handleAddLine} style={{ height: '32px', fontSize: '12.5px' }}>
              <Plus size={14} color="#3B82F6" /> Add Ingredient
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxHeight: '300px', overflowY: 'auto', paddingRight: '4px' }}>
            {recipeLines.map((line, idx) => (
              <div key={idx} style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '10px 12px',
                border: '1px solid #E2E8F0',
                borderRadius: '10px',
                backgroundColor: '#F8FAFC'
              }}>
                <select
                  className="input-field"
                  style={{ flex: 2, height: '38px', fontSize: '13.5px', borderRadius: '8px' }}
                  value={line.ingredientId}
                  onChange={(e) => {
                    const sel = ingredients.find(i => i.id === e.target.value);
                    const updated = [...recipeLines];
                    updated[idx] = { ...line, ingredientId: e.target.value, name: sel ? sel.name : '', unit: sel ? sel.unit : 'g' };
                    setRecipeLines(updated);
                  }}
                >
                  {ingredients.map(ing => (
                    <option key={ing.id} value={ing.id}>{ing.name} ({ing.unit})</option>
                  ))}
                </select>

                <input
                  type="number"
                  className="input-field"
                  style={{ flex: 1, height: '38px', fontSize: '13.5px', borderRadius: '8px' }}
                  placeholder="Qty"
                  value={line.quantity}
                  onChange={(e) => {
                    const updated = [...recipeLines];
                    updated[idx] = { ...line, quantity: parseFloat(e.target.value) || 0 };
                    setRecipeLines(updated);
                  }}
                />

                <span style={{ fontSize: '12.5px', fontWeight: '700', color: '#64748B', width: '36px', textAlign: 'center' }}>
                  {line.unit}
                </span>

                <button
                  onClick={() => handleRemoveLine(idx)}
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '8px',
                    border: 'none',
                    backgroundColor: '#FEF2F2',
                    color: '#E11D48',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer'
                  }}
                  title="Remove ingredient"
                >
                  <Trash2 size={15} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div style={{
          padding: '16px 24px',
          borderTop: '1px solid #E2E8F0',
          backgroundColor: '#F8FAFC',
          display: 'flex',
          justifyContent: 'flex-end',
          gap: '10px'
        }}>
          <button className="btn btn-secondary" onClick={onClose}>Cancel</button>
          <button className="btn btn-primary" onClick={handleSave}>
            <CheckCircle2 size={16} /> Save Recipe
          </button>
        </div>
      </div>
    </div>
  );
};
