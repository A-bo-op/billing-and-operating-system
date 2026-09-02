import React, { useState } from 'react';
import { X, Plus, Trash2, CheckCircle2 } from 'lucide-react';
import { useAppState } from '../../context/AppStateContext';

export const NewPurchaseModal = ({ isOpen, onClose }) => {
  const { suppliers, ingredients, addPurchase } = useAppState();

  const [supplierId, setSupplierId] = useState(suppliers[0]?.id || '');
  const [invoiceNo, setInvoiceNo] = useState('');
  const [status, setStatus] = useState('Received'); // Received | Draft
  const [items, setItems] = useState([
    { ingredientId: ingredients[0]?.id || '', name: ingredients[0]?.name || '', quantity: 10, unit: ingredients[0]?.unit || 'kg', rate: 100, amount: 1000 },
  ]);

  if (!isOpen) return null;

  const handleItemChange = (index, field, value) => {
    const updated = [...items];
    const item = { ...updated[index], [field]: value };

    if (field === 'ingredientId') {
      const selectedIng = ingredients.find(i => i.id === value);
      if (selectedIng) {
        item.name = selectedIng.name;
        item.unit = selectedIng.unit;
        item.rate = selectedIng.costPerUnit || 100;
      }
    }

    if (field === 'quantity' || field === 'rate' || field === 'ingredientId') {
      const q = parseFloat(item.quantity) || 0;
      const r = parseFloat(item.rate) || 0;
      item.amount = q * r;
    }

    updated[index] = item;
    setItems(updated);
  };

  const handleAddItem = () => {
    const defaultIng = ingredients[0];
    setItems(prev => [
      ...prev,
      {
        ingredientId: defaultIng?.id || '',
        name: defaultIng?.name || '',
        quantity: 1,
        unit: defaultIng?.unit || 'kg',
        rate: defaultIng?.costPerUnit || 100,
        amount: defaultIng?.costPerUnit || 100,
      },
    ]);
  };

  const handleRemoveItem = (index) => {
    if (items.length <= 1) return;
    setItems(prev => prev.filter((_, i) => i !== index));
  };

  const subtotal = items.reduce((sum, item) => sum + (item.amount || 0), 0);
  const tax = subtotal * 0.05;
  const total = subtotal + tax;

  const handleSubmit = (e) => {
    e.preventDefault();
    const selSup = suppliers.find(s => s.id === supplierId);

    addPurchase({
      supplierId: supplierId,
      supplierName: selSup ? selSup.name : 'Supplier',
      invoiceNo: invoiceNo || `SUP-${Date.now().toString().slice(-4)}`,
      date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
      items: items,
      subtotal,
      tax,
      total,
      paymentStatus: 'Paid',
      status: status,
    });

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
        width: '680px',
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
            <div style={{ fontSize: '16px', fontWeight: '700', color: '#111827' }}>Create New Purchase Order / Goods Receiving</div>
            <div style={{ fontSize: '12px', color: '#64748B' }}>Record raw material supplier invoice & update stock</div>
          </div>
          <button onClick={onClose} style={{ border: 'none', background: 'transparent', cursor: 'pointer' }}>
            <X size={20} color="#64748B" />
          </button>
        </div>

        <form onSubmit={handleSubmit} style={{ padding: '20px' }}>
          {/* Supplier & Inv details */}
          <div style={{ display: 'flex', gap: '14px', marginBottom: '16px' }}>
            <div style={{ flex: 2 }}>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#475569', marginBottom: '4px' }}>
                Supplier Name <span style={{ color: '#DC2626' }}>*</span>
              </label>
              <select className="input-field" value={supplierId} onChange={(e) => setSupplierId(e.target.value)}>
                {suppliers.map((s) => (
                  <option key={s.id} value={s.id}>{s.name} ({s.contactPerson})</option>
                ))}
              </select>
            </div>

            <div style={{ flex: 1 }}>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#475569', marginBottom: '4px' }}>
                Supplier Invoice #
              </label>
              <input
                type="text"
                className="input-field"
                placeholder="e.g. INV-8821"
                value={invoiceNo}
                onChange={(e) => setInvoiceNo(e.target.value)}
              />
            </div>

            <div style={{ flex: 1 }}>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#475569', marginBottom: '4px' }}>
                Status
              </label>
              <select className="input-field" value={status} onChange={(e) => setStatus(e.target.value)}>
                <option value="Received">Received (Update Stock)</option>
                <option value="Draft">Draft (Order Placed)</option>
              </select>
            </div>
          </div>

          {/* Line items table */}
          <div style={{ marginBottom: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <label style={{ fontSize: '13px', fontWeight: '600', color: '#475569' }}>
                Purchase Line Items ({items.length})
              </label>
              <button type="button" className="btn btn-secondary btn-sm" onClick={handleAddItem}>
                <Plus size={14} /> Add Line Item
              </button>
            </div>

            <table className="data-table" style={{ border: '1px solid #E2E8F0', borderRadius: '6px' }}>
              <thead>
                <tr>
                  <th>Ingredient</th>
                  <th style={{ width: '100px' }}>Qty</th>
                  <th style={{ width: '80px' }}>Unit</th>
                  <th style={{ width: '110px' }}>Rate (₹)</th>
                  <th style={{ width: '110px' }}>Amount (₹)</th>
                  <th style={{ width: '40px' }}></th>
                </tr>
              </thead>
              <tbody>
                {items.map((item, idx) => (
                  <tr key={idx}>
                    <td>
                      <select
                        className="input-field"
                        style={{ height: '34px', fontSize: '13px' }}
                        value={item.ingredientId}
                        onChange={(e) => handleItemChange(idx, 'ingredientId', e.target.value)}
                      >
                        {ingredients.map((ing) => (
                          <option key={ing.id} value={ing.id}>{ing.name}</option>
                        ))}
                      </select>
                    </td>
                    <td>
                      <input
                        type="number"
                        step="0.1"
                        className="input-field"
                        style={{ height: '34px', fontSize: '13px' }}
                        value={item.quantity}
                        onChange={(e) => handleItemChange(idx, 'quantity', e.target.value)}
                      />
                    </td>
                    <td style={{ fontSize: '13px', color: '#64748B', fontWeight: '600' }}>{item.unit}</td>
                    <td>
                      <input
                        type="number"
                        step="1"
                        className="input-field"
                        style={{ height: '34px', fontSize: '13px' }}
                        value={item.rate}
                        onChange={(e) => handleItemChange(idx, 'rate', e.target.value)}
                      />
                    </td>
                    <td style={{ fontWeight: '700', fontSize: '14px' }}>₹{item.amount}</td>
                    <td>
                      <button
                        type="button"
                        onClick={() => handleRemoveItem(idx)}
                        style={{ border: 'none', background: 'transparent', cursor: 'pointer', color: '#DC2626' }}
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Totals Summary */}
          <div style={{ backgroundColor: '#F8FAFC', padding: '12px 16px', borderRadius: '6px', border: '1px solid #E2E8F0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ fontSize: '12px', color: '#64748B' }}>
              {status === 'Received' ? '✓ Receiving this purchase will immediately add quantities to inventory stock.' : 'ℹ Saved as draft PO.'}
            </div>

            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '12px', color: '#64748B' }}>Subtotal: ₹{subtotal} + Tax: ₹{tax.toFixed(1)}</div>
              <div style={{ fontSize: '18px', fontWeight: '700', color: '#3366FF' }}>Total: ₹{total.toFixed(1)}</div>
            </div>
          </div>

          {/* Footer */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '20px' }}>
            <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn btn-primary">
              <CheckCircle2 size={16} />
              <span>{status === 'Received' ? 'Receive & Update Stock' : 'Save Draft Purchase'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
