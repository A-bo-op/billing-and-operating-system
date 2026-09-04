import React, { useState } from 'react';
import { Search, ArrowLeft, Utensils, Check, AlertCircle, Plus, Sparkles } from 'lucide-react';
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
    <div style={{ flex: 1, height: '100%', display: 'flex', flexDirection: 'column', overflow: 'hidden' }} className="animate-fade-in">
      {/* Top Header Controls */}
      <div style={{
        padding: '14px 24px',
        backgroundColor: '#FFFFFF',
        borderBottom: '1px solid #E2E8F0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        boxShadow: '0 1px 2px rgba(15, 23, 42, 0.02)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <button className="btn btn-secondary btn-sm" onClick={() => setCurrentTab('tables')}>
            <ArrowLeft size={15} />
            <span>Floor View</span>
          </button>

          {activeOrder && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span className="badge badge-blue" style={{ fontSize: '13px', padding: '5px 12px', fontWeight: '700' }}>
                {activeOrder.tableName} &bull; {activeOrder.orderType.toUpperCase()}
              </span>
            </div>
          )}
        </div>

        <div style={{ fontSize: '13px', color: '#64748B', fontWeight: '600' }}>
          Showing <span style={{ color: '#0F172A', fontWeight: '700' }}>{filteredDishes.length}</span> items
        </div>
      </div>

      {/* Search & Category Filter Section */}
      <div style={{ padding: '16px 24px', backgroundColor: '#FFFFFF', borderBottom: '1px solid #E2E8F0' }}>
        {/* Instant Search input */}
        <div style={{ position: 'relative', marginBottom: '14px' }}>
          <Search size={18} color="#94A3B8" style={{ position: 'absolute', left: '14px', top: '13px' }} />
          <input
            type="text"
            className="input-field"
            style={{ paddingLeft: '44px', height: '44px', fontSize: '14.5px', borderRadius: '10px' }}
            placeholder="Search menu (e.g. Paneer, Biryani, Butter Chicken, Naan)..."
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
                  padding: '7px 16px',
                  borderRadius: '999px',
                  border: isSel ? '1px solid #3B82F6' : '1px solid #E2E8F0',
                  background: isSel ? 'linear-gradient(135deg, #3B82F6 0%, #6366F1 100%)' : '#FFFFFF',
                  color: isSel ? '#FFFFFF' : '#475569',
                  fontWeight: isSel ? '700' : '600',
                  fontSize: '13px',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  transition: 'all 0.18s cubic-bezier(0.16, 1, 0.3, 1)',
                  boxShadow: isSel ? '0 2px 8px rgba(59, 130, 246, 0.3)' : '0 1px 2px rgba(15, 23, 42, 0.03)'
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
          gridTemplateColumns: 'repeat(auto-fill, minmax(210px, 1fr))',
          gap: '16px'
        }}>
          {filteredDishes.map((dish) => (
            <div
              key={dish.id}
              onClick={() => handleDishClick(dish)}
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '12px',
                border: dish.isAvailable ? '1px solid #E2E8F0' : '1px dashed #CBD5E1',
                padding: '16px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                cursor: dish.isAvailable ? 'pointer' : 'not-allowed',
                opacity: dish.isAvailable ? 1 : 0.6,
                transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
                position: 'relative',
                boxShadow: '0 1px 3px rgba(15, 23, 42, 0.04)',
                minHeight: '140px'
              }}
              onMouseEnter={(e) => {
                if (dish.isAvailable) {
                  e.currentTarget.style.transform = 'translateY(-3px)';
                  e.currentTarget.style.boxShadow = '0 8px 16px rgba(15, 23, 42, 0.08)';
                  e.currentTarget.style.borderColor = '#93C5FD';
                }
              }}
              onMouseLeave={(e) => {
                if (dish.isAvailable) {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 1px 3px rgba(15, 23, 42, 0.04)';
                  e.currentTarget.style.borderColor = '#E2E8F0';
                }
              }}
            >
              {/* Veg / Non-Veg Indicator */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                <div style={{
                  width: '16px',
                  height: '16px',
                  border: dish.isVeg ? '1.5px solid #10B981' : '1.5px solid #EF4444',
                  borderRadius: '3px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '2px'
                }}>
                  <div style={{
                    width: '7px',
                    height: '7px',
                    borderRadius: dish.isVeg ? '50%' : '0',
                    backgroundColor: dish.isVeg ? '#10B981' : '#EF4444'
                  }} />
                </div>

                {!dish.isAvailable ? (
                  <span className="badge badge-red" style={{ fontSize: '10.5px', padding: '2px 7px' }}>Out of Stock</span>
                ) : dish.hasVariants ? (
                  <span className="badge badge-purple" style={{ fontSize: '10.5px', padding: '2px 7px' }}>Variants</span>
                ) : null}
              </div>

              {/* Title & Category */}
              <div>
                <div style={{ fontSize: '15px', fontWeight: '700', color: '#0F172A', marginBottom: '4px', lineHeight: 1.25 }}>
                  {dish.name}
                </div>
                <div style={{ fontSize: '12px', color: '#64748B', fontWeight: '500' }}>
                  {dish.category}
                </div>
              </div>

              <div style={{ marginTop: '14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '10px', borderTop: '1px solid #F1F5F9' }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '2px' }}>
                  <span style={{ fontSize: '13px', fontWeight: '600', color: '#64748B' }}>₹</span>
                  <span style={{ fontSize: '18px', fontWeight: '800', color: '#0F172A' }}>
                    {dish.price}
                  </span>
                </div>

                <span style={{
                  fontSize: '12px',
                  color: '#2563EB',
                  fontWeight: '700',
                  backgroundColor: '#EFF6FF',
                  padding: '4px 10px',
                  borderRadius: '6px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '3px'
                }}>
                  <Plus size={13} strokeWidth={2.5} /> Add
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
