import React, { useState } from 'react';
import { Package, AlertTriangle, Plus, Search, Sliders, History, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { useAppState } from '../../context/AppStateContext';
import { StockAdjustmentModal } from './StockAdjustmentModal';
import { AddIngredientModal } from './AddIngredientModal';

export const InventoryView = () => {
  const { ingredients, stockLogs, lowStockIngredients, setCurrentTab } = useAppState();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [activeAdjustIngredient, setActiveAdjustIngredient] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [showLogDrawer, setShowLogDrawer] = useState(false);

  const outOfStockCount = ingredients.filter(i => i.stock === 0).length;
  const totalValue = ingredients.reduce((sum, i) => sum + i.stock * (i.costPerUnit || 0), 0);

  const filteredIngredients = ingredients.filter(i => {
    const matchesSearch = i.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = selectedCategory === 'All' || i.category === selectedCategory;
    const isLow = i.stock <= i.minStock;
    const matchesStatus =
      selectedStatus === 'All' ||
      (selectedStatus === 'Low Stock' && isLow) ||
      (selectedStatus === 'In Stock' && !isLow);
    return matchesSearch && matchesCat && matchesStatus;
  });

  return (
    <div style={{ padding: '24px', maxWidth: '1400px', margin: '0 auto' }}>
      {/* Header & Actions */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
        <div>
          <h1 className="title-page">Inventory & Raw Ingredients</h1>
          <div style={{ fontSize: '13px', color: '#64748B', marginTop: '2px' }}>
            Safe ingredient stock tracking, low-stock threshold alerts & audit history
          </div>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button className="btn btn-secondary" onClick={() => setShowLogDrawer(!showLogDrawer)}>
            <History size={16} color="#3366FF" />
            <span>{showLogDrawer ? 'Hide Audit Log' : 'View Audit Log'}</span>
          </button>

          <button className="btn btn-primary" onClick={() => setIsAddModalOpen(true)}>
            <Plus size={16} />
            <span>Add Ingredient</span>
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '14px', marginBottom: '20px' }}>
        <div className="card-panel" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ width: '42px', height: '42px', borderRadius: '8px', backgroundColor: '#EFF6FF', color: '#3366FF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Package size={20} />
          </div>
          <div>
            <div style={{ fontSize: '22px', fontWeight: '700', color: '#111827', lineHeight: 1 }}>{ingredients.length}</div>
            <div style={{ fontSize: '12px', color: '#64748B', marginTop: '3px' }}>Total Ingredients</div>
          </div>
        </div>

        <div className="card-panel" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ width: '42px', height: '42px', borderRadius: '8px', backgroundColor: '#FFFBEB', color: '#D97706', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <AlertTriangle size={20} />
          </div>
          <div>
            <div style={{ fontSize: '22px', fontWeight: '700', color: '#D97706', lineHeight: 1 }}>{lowStockIngredients.length}</div>
            <div style={{ fontSize: '12px', color: '#64748B', marginTop: '3px' }}>Low Stock Items</div>
          </div>
        </div>

        <div className="card-panel" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ width: '42px', height: '42px', borderRadius: '8px', backgroundColor: '#FEF2F2', color: '#DC2626', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <AlertTriangle size={20} />
          </div>
          <div>
            <div style={{ fontSize: '22px', fontWeight: '700', color: '#DC2626', lineHeight: 1 }}>{outOfStockCount}</div>
            <div style={{ fontSize: '12px', color: '#64748B', marginTop: '3px' }}>Out of Stock</div>
          </div>
        </div>

        <div className="card-panel" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ width: '42px', height: '42px', borderRadius: '8px', backgroundColor: '#F8FAFC', color: '#111827', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontSize: '18px', fontWeight: '700' }}>₹</span>
          </div>
          <div>
            <div style={{ fontSize: '22px', fontWeight: '700', color: '#111827', lineHeight: 1 }}>₹{totalValue.toLocaleString()}</div>
            <div style={{ fontSize: '12px', color: '#64748B', marginTop: '3px' }}>Est. Inventory Value</div>
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="card-panel" style={{ marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '16px' }}>
        <div style={{ position: 'relative', flex: 1 }}>
          <Search size={16} color="#64748B" style={{ position: 'absolute', left: '12px', top: '13px' }} />
          <input
            type="text"
            className="input-field"
            style={{ paddingLeft: '38px' }}
            placeholder="Search ingredient by name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <select className="input-field" style={{ width: '180px' }} value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
          <option value="All">All Categories</option>
          <option value="Dairy">Dairy</option>
          <option value="Vegetables">Vegetables</option>
          <option value="Meat">Meat</option>
          <option value="Grains">Grains</option>
          <option value="Oils">Oils & Fats</option>
          <option value="Spices">Spices</option>
          <option value="Flour">Flour</option>
        </select>

        <select className="input-field" style={{ width: '180px' }} value={selectedStatus} onChange={(e) => setSelectedStatus(e.target.value)}>
          <option value="All">All Statuses</option>
          <option value="Low Stock">Low Stock Only</option>
          <option value="In Stock">In Stock Only</option>
        </select>
      </div>

      {/* Main Table */}
      <div className="card-panel" style={{ padding: 0, overflow: 'hidden' }}>
        <table className="data-table">
          <thead>
            <tr>
              <th>Ingredient</th>
              <th>Category</th>
              <th>Current Stock</th>
              <th>Min Alert Threshold</th>
              <th>Status</th>
              <th>Cost / Unit</th>
              <th>Last Updated</th>
              <th style={{ textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredIngredients.map((ing) => {
              const isLow = ing.stock <= ing.minStock;
              return (
                <tr key={ing.id}>
                  <td>
                    <div style={{ fontWeight: '700', color: '#111827' }}>{ing.name}</div>
                  </td>
                  <td>
                    <span style={{ fontSize: '13px', color: '#64748B' }}>{ing.category}</span>
                  </td>
                  <td>
                    <span style={{ fontSize: '15px', fontWeight: '700', color: isLow ? '#D97706' : '#111827' }}>
                      {ing.stock} {ing.unit}
                    </span>
                  </td>
                  <td>
                    <span style={{ fontSize: '13px', color: '#64748B' }}>{ing.minStock} {ing.unit}</span>
                  </td>
                  <td>
                    {isLow ? (
                      <span className="badge badge-amber">⚠ Low Stock</span>
                    ) : (
                      <span className="badge badge-green">✓ In Stock</span>
                    )}
                  </td>
                  <td>
                    <span style={{ fontSize: '13px', color: '#475569' }}>₹{ing.costPerUnit || 0} / {ing.unit}</span>
                  </td>
                  <td>
                    <span style={{ fontSize: '12px', color: '#94A3B8' }}>{ing.lastUpdated}</span>
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    <button
                      className="btn btn-secondary btn-sm"
                      onClick={() => setActiveAdjustIngredient(ing)}
                    >
                      <Sliders size={14} color="#3366FF" />
                      <span>Adjust Stock</span>
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Audit Log Drawer */}
      {showLogDrawer && (
        <div className="card-panel" style={{ marginTop: '20px', border: '1px solid #BFDBFE', backgroundColor: '#EFF6FF' }}>
          <div style={{ fontSize: '16px', fontWeight: '700', color: '#1E40AF', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <History size={18} />
            <span>Stock Adjustment Audit Logs ({stockLogs.length})</span>
          </div>

          <table className="data-table" style={{ backgroundColor: '#FFFFFF', borderRadius: '6px' }}>
            <thead>
              <tr>
                <th>Date / Time</th>
                <th>Ingredient</th>
                <th>Type</th>
                <th>Quantity</th>
                <th>Reason</th>
                <th>Staff User</th>
              </tr>
            </thead>
            <tbody>
              {stockLogs.map((log) => (
                <tr key={log.id}>
                  <td style={{ fontSize: '12px', color: '#64748B' }}>{log.date}</td>
                  <td style={{ fontWeight: '600', color: '#111827' }}>{log.ingredientName}</td>
                  <td>
                    <span className={`badge ${log.adjustmentType.includes('Add') ? 'badge-green' : 'badge-amber'}`}>
                      {log.adjustmentType}
                    </span>
                  </td>
                  <td style={{ fontWeight: '700' }}>{log.quantity}</td>
                  <td style={{ fontSize: '13px', color: '#475569' }}>{log.reason}</td>
                  <td style={{ fontSize: '12px', fontWeight: '600', color: '#3366FF' }}>{log.user}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modals */}
      <StockAdjustmentModal
        ingredient={activeAdjustIngredient}
        isOpen={Boolean(activeAdjustIngredient)}
        onClose={() => setActiveAdjustIngredient(null)}
      />

      <AddIngredientModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      />
    </div>
  );
};
