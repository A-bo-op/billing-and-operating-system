import React, { useState } from 'react';
import { UtensilsCrossed, Plus, Search, Check, X, BookOpen, Layers } from 'lucide-react';
import { useAppState } from '../../context/AppStateContext';
import { AddDishModal } from './AddDishModal';
import { RecipeModal } from './RecipeModal';
import { CATEGORIES } from '../../data/demoData';

export const MenuView = () => {
  const { dishes, toggleDishAvailability } = useAppState();

  const [activeTab, setActiveTab] = useState('dishes'); // dishes | categories | modifiers
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
    <div style={{ padding: '24px', maxWidth: '1400px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
        <div>
          <h1 className="title-page">Menu Management</h1>
          <div style={{ fontSize: '13px', color: '#64748B', marginTop: '2px' }}>
            Sellable dishes, portion pricing, stock availability & ingredient recipe linking
          </div>
        </div>

        <button className="btn btn-primary" onClick={() => setIsAddDishModalOpen(true)}>
          <Plus size={16} />
          <span>Add Dish</span>
        </button>
      </div>

      {/* Sub Tabs */}
      <div style={{ display: 'flex', borderBottom: '1px solid #E2E8F0', marginBottom: '20px', gap: '20px' }}>
        <button
          onClick={() => setActiveTab('dishes')}
          style={{
            padding: '10px 4px',
            border: 'none',
            background: 'transparent',
            borderBottom: activeTab === 'dishes' ? '2px solid #3366FF' : '2px solid transparent',
            color: activeTab === 'dishes' ? '#3366FF' : '#64748B',
            fontWeight: activeTab === 'dishes' ? '700' : '500',
            fontSize: '14px',
            cursor: 'pointer'
          }}
        >
          Dishes ({dishes.length})
        </button>

        <button
          onClick={() => setActiveTab('categories')}
          style={{
            padding: '10px 4px',
            border: 'none',
            background: 'transparent',
            borderBottom: activeTab === 'categories' ? '2px solid #3366FF' : '2px solid transparent',
            color: activeTab === 'categories' ? '#3366FF' : '#64748B',
            fontWeight: activeTab === 'categories' ? '700' : '500',
            fontSize: '14px',
            cursor: 'pointer'
          }}
        >
          Categories ({CATEGORIES.length - 1})
        </button>
      </div>

      {/* Filter Bar */}
      <div className="card-panel" style={{ marginBottom: '16px', display: 'flex', gap: '16px' }}>
        <div style={{ position: 'relative', flex: 1 }}>
          <Search size={16} color="#64748B" style={{ position: 'absolute', left: '12px', top: '13px' }} />
          <input
            type="text"
            className="input-field"
            style={{ paddingLeft: '38px' }}
            placeholder="Search dish by name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <select className="input-field" style={{ width: '200px' }} value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
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
              <th>Type</th>
              <th>Dish Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Availability Toggle</th>
              <th>Recipe Link</th>
              <th style={{ textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredDishes.map((dish) => (
              <tr key={dish.id}>
                <td>
                  <div style={{
                    width: '14px',
                    height: '14px',
                    border: dish.isVeg ? '1px solid #16A34A' : '1px solid #DC2626',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <div style={{
                      width: '6px',
                      height: '6px',
                      borderRadius: dish.isVeg ? '50%' : '0',
                      backgroundColor: dish.isVeg ? '#16A34A' : '#DC2626'
                    }} />
                  </div>
                </td>

                <td>
                  <div style={{ fontWeight: '700', color: '#111827' }}>{dish.name}</div>
                  {dish.hasVariants && <span style={{ fontSize: '11px', color: '#3366FF' }}>Has Portion Variants</span>}
                </td>

                <td>
                  <span style={{ fontSize: '13px', color: '#64748B' }}>{dish.category}</span>
                </td>

                <td>
                  <span style={{ fontSize: '15px', fontWeight: '700', color: '#111827' }}>₹{dish.price}</span>
                </td>

                <td>
                  <button
                    onClick={() => toggleDishAvailability(dish.id)}
                    className={`badge ${dish.isAvailable ? 'badge-green' : 'badge-red'}`}
                    style={{ cursor: 'pointer', border: 'none' }}
                  >
                    {dish.isAvailable ? '✓ Available' : '✕ Out of Stock'}
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
                    <BookOpen size={14} color="#3366FF" />
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
