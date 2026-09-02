import React, { useState } from 'react';
import { Search, ArrowLeft, Utensils, Check, AlertCircle } from 'lucide-react';
import { useAppState } from '../../context/AppStateContext';
import { CATEGORIES } from '../../data/demoData';
import { DishVariantModal } from './DishVariantModal';

export const MenuGrid = () => {
  const {
    dishes,
    currentTab,
    setCurrentTab,
    activeOrder,
    activeTable,
    addDishToOrder,
  } = useAppState();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedDishForVariant, setSelectedDishForVariant] = useState(null);

  const filteredDishes = dishes.filter(dish => {
    const matchesSearch = dish.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = selectedCategory === 'All' || dish.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  const handleDishClick = (dish) => {
    if (!dish.isAvailable) return;
    if (dish.hasVariants) {
      setSelectedDishForVariant(dish);
    } else {
      addDishToOrder(dish);
    }
  };

  return (
    <div style={{ flex: 1, height: '100%', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      {/* Top Header Controls */}
      <div style={{
        padding: '16px 24px',
        backgroundColor: '#FFFFFF',
        borderBottom: '1px solid #E2E8F0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <button className="btn btn-secondary btn-sm" onClick={() => setCurrentTab('tables')}>
            <ArrowLeft size={16} />
            <span>Back to Tables</span>
          </button>

          {activeOrder && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span className="badge badge-blue" style={{ fontSize: '13px', padding: '4px 10px' }}>
                Context: {activeOrder.tableName} ({activeOrder.orderType.toUpperCase()})
              </span>
            </div>
          )}
        </div>

        <div style={{ fontSize: '13px', color: '#64748B', fontWeight: '500' }}>
          Menu Items ({filteredDishes.length})
        </div>
      </div>

      {/* Search & Category Filter Section */}
      <div style={{ padding: '16px 24px', backgroundColor: '#FFFFFF', borderBottom: '1px solid #E2E8F0' }}>
        {/* Instant Search input */}
        <div style={{ position: 'relative', marginBottom: '14px' }}>
          <Search size={18} color="#64748B" style={{ position: 'absolute', left: '14px', top: '12px' }} />
          <input
            type="text"
            className="input-field"
            style={{ paddingLeft: '42px', height: '44px', fontSize: '15px' }}
            placeholder="Search a dish by name (e.g. Paneer, Biryani, Naan)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            autoFocus
          />
        </div>

        {/* Category Pills */}
        <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '4px' }}>
          {CATEGORIES.map((cat) => {
            const isSel = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                style={{
                  padding: '8px 16px',
                  borderRadius: '20px',
                  border: isSel ? '1px solid #3366FF' : '1px solid #E2E8F0',
                  backgroundColor: isSel ? '#3366FF' : '#F8FAFC',
                  color: isSel ? '#FFFFFF' : '#475569',
                  fontWeight: isSel ? '600' : '500',
                  fontSize: '13px',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  transition: 'all 0.15s ease'
                }}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Dish Grid Area */}
      <div style={{ flex: 1, padding: '20px 24px', overflowY: 'auto', backgroundColor: '#F8FAFC' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
          gap: '14px'
        }}>
          {filteredDishes.map((dish) => (
            <div
              key={dish.id}
              onClick={() => handleDishClick(dish)}
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '8px',
                border: dish.isAvailable ? '1px solid #E2E8F0' : '1px dashed #CBD5E1',
                padding: '14px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                cursor: dish.isAvailable ? 'pointer' : 'not-allowed',
                opacity: dish.isAvailable ? 1 : 0.6,
                transition: 'border-color 0.15s ease, box-shadow 0.15s ease',
                position: 'relative'
              }}
            >
              {/* Veg / Non-Veg Indicator */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                <div style={{
                  width: '14px',
                  height: '14px',
                  border: dish.isVeg ? '1px solid #16A34A' : '1px solid #DC2626',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '2px'
                }}>
                  <div style={{
                    width: '6px',
                    height: '6px',
                    borderRadius: dish.isVeg ? '50%' : '0',
                    backgroundColor: dish.isVeg ? '#16A34A' : '#DC2626'
                  }} />
                </div>

                {!dish.isAvailable ? (
                  <span className="badge badge-red" style={{ fontSize: '10px' }}>Out of Stock</span>
                ) : dish.hasVariants ? (
                  <span className="badge badge-blue" style={{ fontSize: '10px' }}>Variants</span>
                ) : null}
              </div>

              {/* Title & Price */}
              <div>
                <div style={{ fontSize: '15px', fontWeight: '700', color: '#111827', marginBottom: '4px' }}>
                  {dish.name}
                </div>
                <div style={{ fontSize: '12px', color: '#64748B' }}>
                  {dish.category}
                </div>
              </div>

              <div style={{ marginTop: '14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '18px', fontWeight: '700', color: '#111827' }}>
                  ₹{dish.price}
                </span>

                <span style={{ fontSize: '12px', color: '#3366FF', fontWeight: '600' }}>
                  + Add
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Variant Modal */}
      <DishVariantModal
        dish={selectedDishForVariant}
        isOpen={Boolean(selectedDishForVariant)}
        onClose={() => setSelectedDishForVariant(null)}
        onAdd={(d, varItem, notes) => addDishToOrder(d, varItem, notes)}
      />
    </div>
  );
};
