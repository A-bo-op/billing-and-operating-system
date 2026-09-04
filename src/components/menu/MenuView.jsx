import React, { useState } from 'react';
import { UtensilsCrossed, Plus, Search, Check, X, BookOpen, Layers, Sparkles } from 'lucide-react';
import { useAppState } from '../../context/AppStateContext';
import { AddDishModal } from './AddDishModal';
import { RecipeModal } from './RecipeModal';
import { CATEGORIES } from '../../data/demoData';

export const MenuView = () => {
  const { dishes, toggleDishAvailability } = useAppState();

  const [activeTab, setActiveTab] = useState('dishes'); // dishes | categories
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isAddDishModalOpen, setIsAddDishModalOpen] = useState(false);
  const [activeRecipeDish, setActiveRecipeDish] = useState(null);

  const filteredDishes = dishes.filter(d => {
    const matchesSearch = d.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = selectedCategory === 'All' || d.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  return (
    <div style={{ padding: '28px 32px', maxWidth: '1440px', margin: '0 auto' }} className="animate-fade-in">
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <h1 className="title-page">Menu Catalog & Recipes</h1>
            <span style={{
              fontSize: '12px',
              fontWeight: '700',
              padding: '3px 10px',
              backgroundColor: '#EFF6FF',
              color: '#2563EB',
              borderRadius: '99px',
              border: '1px solid #DBEAFE'
            }}>
              {dishes.length} Items
            </span>
          </div>
          <div style={{ fontSize: '13.5px', color: '#64748B', marginTop: '4px' }}>
            Sellable dishes, portion pricing, stock availability & ingredient BOM linking
          </div>
        </div>

        <button className="btn btn-primary" onClick={() => setIsAddDishModalOpen(true)}>
          <Plus size={16} />
          <span>Add New Dish</span>
        </button>
      </div>

      {/* Sub Tabs */}
      <div style={{ display: 'flex', borderBottom: '1px solid #E2E8F0', marginBottom: '20px', gap: '24px' }}>
        <button
          onClick={() => setActiveTab('dishes')}
          style={{
            padding: '10px 4px',
            border: 'none',
            background: 'transparent',
            borderBottom: activeTab === 'dishes' ? '2.5px solid #3B82F6' : '2.5px solid transparent',
            color: activeTab === 'dishes' ? '#2563EB' : '#64748B',
            fontWeight: activeTab === 'dishes' ? '800' : '600',
            fontSize: '14px',
            cursor: 'pointer',
            transition: 'all 0.15s ease'
          }}
        >
          All Dishes ({dishes.length})
        </button>

        <button
          onClick={() => setActiveTab('categories')}
          style={{
            padding: '10px 4px',
            border: 'none',
            background: 'transparent',
            borderBottom: activeTab === 'categories' ? '2.5px solid #3B82F6' : '2.5px solid transparent',
            color: activeTab === 'categories' ? '#2563EB' : '#64748B',
            fontWeight: activeTab === 'categories' ? '800' : '600',
            fontSize: '14px',
            cursor: 'pointer',
            transition: 'all 0.15s ease'
          }}
        >
          Categories ({CATEGORIES.length - 1})
        </button>
      </div>

      {/* Filter Bar */}
      <div className="card-panel" style={{ marginBottom: '18px', display: 'flex', gap: '16px', padding: '14px 18px', alignItems: 'center' }}>
        <div style={{ position: 'relative', flex: 1 }}>
          <Search size={17} color="#94A3B8" style={{ position: 'absolute', left: '14px', top: '12px' }} />
          <input
            type="text"
            className="input-field"
            style={{ paddingLeft: '42px', height: '40px' }}
            placeholder="Filter dishes by name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <select className="input-field" style={{ width: '220px', height: '40px' }} value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
          {CATEGORIES.map(c => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>

      {/* Main Table */}
      <div className="card-panel" style={{ padding: 0, overflow: 'hidden' }}>
        <table className="data-table">
          <thead>
            <tr>
              <th style={{ width: '50px' }}>Type</th>
              <th>Dish Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Availability</th>
              <th>Recipe BOM</th>
              <th style={{ textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredDishes.map((dish) => (
              <tr key={dish.id}>
                <td>
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
                </td>

                <td>
                  <div style={{ fontWeight: '700', color: '#0F172A', fontSize: '14px' }}>{dish.name}</div>
                  {dish.hasVariants && <span style={{ fontSize: '11px', color: '#2563EB', fontWeight: '600' }}>Portion Variants Configured</span>}
                </td>

                <td>
                  <span style={{ fontSize: '13px', color: '#64748B', fontWeight: '500' }}>{dish.category}</span>
                </td>

                <td>
                  <span style={{ fontSize: '15px', fontWeight: '800', color: '#0F172A' }}>₹{dish.price}</span>
                </td>

                <td>
                  <button
                    onClick={() => toggleDishAvailability(dish.id)}
                    className={`badge ${dish.isAvailable ? 'badge-green' : 'badge-red'}`}
                    style={{ cursor: 'pointer', border: 'none', padding: '4px 10px' }}
                  >
                    {dish.isAvailable ? '✓ In Stock' : '✕ Out of Stock'}
                  </button>
                </td>

                <td>
                  {dish.recipeLinked ? (
                    <span className="badge badge-green">
                      <BookOpen size={11} /> Recipe Linked
                    </span>
                  ) : (
                    <span className="badge badge-gray">No Recipe</span>
                  )}
                </td>

                <td style={{ textAlign: 'right' }}>
                  <button
                    className="btn btn-secondary btn-sm"
                    onClick={() => setActiveRecipeDish(dish)}
                  >
                    <BookOpen size={14} color="#3B82F6" />
                    <span>Manage Recipe</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modals */}
      <AddDishModal
        isOpen={isAddDishModalOpen}
        onClose={() => setIsAddDishModalOpen(false)}
      />

      <RecipeModal
        dish={activeRecipeDish}
        isOpen={Boolean(activeRecipeDish)}
        onClose={() => setActiveRecipeDish(null)}
      />
    </div>
  );
};
