import React, { useState } from 'react';
import { Truck, Plus, CheckCircle2, Clock, DollarSign, Search, Users } from 'lucide-react';
import { useAppState } from '../../context/AppStateContext';
import { NewPurchaseModal } from './NewPurchaseModal';

export const PurchasesView = () => {
  const { purchases, suppliers, receivePurchase } = useAppState();

  const [searchQuery, setSearchQuery] = useState('');
  const [isNewModalOpen, setIsNewModalOpen] = useState(false);
  const [confirmReceiveId, setConfirmReceiveId] = useState(null);

  const totalSpent = purchases.reduce((sum, p) => sum + p.total, 0);
  const pendingReceivingCount = purchases.filter(p => p.status !== 'Received').length;

  const filteredPurchases = purchases.filter(p => {
    return (
      p.purchaseNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.supplierName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.invoiceNo.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  const handleConfirmReceive = (id) => {
    receivePurchase(id);
    setConfirmReceiveId(null);
  };

  return (
    <div style={{ padding: '24px', maxWidth: '1400px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
        <div>
          <h1 className="title-page">Purchases & Goods Receiving</h1>
          <div style={{ fontSize: '13px', color: '#64748B', marginTop: '2px' }}>
            Supplier purchase orders, goods receiving & stock replenishment logs
          </div>
        </div>

        <button className="btn btn-primary" onClick={() => setIsNewModalOpen(true)}>
          <Plus size={16} />
          <span>New Purchase Order</span>
        </button>
      </div>

      {/* KPI Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '14px', marginBottom: '20px' }}>
        <div className="card-panel" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ width: '42px', height: '42px', borderRadius: '8px', backgroundColor: '#EFF6FF', color: '#3366FF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Truck size={20} />
          </div>
          <div>
            <div style={{ fontSize: '22px', fontWeight: '700', color: '#111827', lineHeight: 1 }}>₹{totalSpent.toLocaleString()}</div>
            <div style={{ fontSize: '12px', color: '#64748B', marginTop: '3px' }}>Total Purchases Spent</div>
          </div>
        </div>

        <div className="card-panel" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ width: '42px', height: '42px', borderRadius: '8px', backgroundColor: '#F8FAFC', color: '#111827', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Users size={20} />
          </div>
          <div>
            <div style={{ fontSize: '22px', fontWeight: '700', color: '#111827', lineHeight: 1 }}>{suppliers.length}</div>
            <div style={{ fontSize: '12px', color: '#64748B', marginTop: '3px' }}>Active Vendors / Suppliers</div>
          </div>
        </div>

        <div className="card-panel" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ width: '42px', height: '42px', borderRadius: '8px', backgroundColor: pendingReceivingCount > 0 ? '#FFFBEB' : '#F0FDF4', color: pendingReceivingCount > 0 ? '#D97706' : '#16A34A', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Clock size={20} />
          </div>
          <div>
            <div style={{ fontSize: '22px', fontWeight: '700', color: pendingReceivingCount > 0 ? '#D97706' : '#16A34A', lineHeight: 1 }}>
              {pendingReceivingCount} Pending
            </div>
            <div style={{ fontSize: '12px', color: '#64748B', marginTop: '3px' }}>Awaiting Goods Receiving</div>
          </div>
        </div>
      </div>

      {/* Filter */}
      <div className="card-panel" style={{ marginBottom: '16px' }}>
        <div style={{ position: 'relative', width: '320px' }}>
          <Search size={16} color="#64748B" style={{ position: 'absolute', left: '12px', top: '13px' }} />
          <input
            type="text"
            className="input-field"
            style={{ paddingLeft: '38px' }}
            placeholder="Search by PO #, Supplier, or Inv #..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Purchases Data Table */}
      <div className="card-panel" style={{ padding: 0, overflow: 'hidden' }}>
        <table className="data-table">
          <thead>
            <tr>
              <th>Purchase PO #</th>
              <th>Supplier</th>
              <th>Supplier Inv #</th>
              <th>Date</th>
              <th>Items Count</th>
              <th>Total Amount</th>
              <th>Payment</th>
              <th>Receiving Status</th>
              <th style={{ textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredPurchases.map((pur) => {
              const isReceived = pur.status === 'Received';
              return (
                <tr key={pur.id}>
                  <td>
                    <span style={{ fontWeight: '700', color: '#3366FF' }}>{pur.purchaseNo}</span>
                  </td>
                  <td>
                    <div style={{ fontWeight: '600', color: '#111827' }}>{pur.supplierName}</div>
                  </td>
                  <td>
                    <span style={{ fontSize: '13px', color: '#64748B' }}>{pur.invoiceNo}</span>
                  </td>
                  <td>
                    <span style={{ fontSize: '13px', color: '#475569' }}>{pur.date}</span>
                  </td>
                  <td>
                    <span style={{ fontSize: '13px', color: '#111827' }}>{pur.items.length} items</span>
                  </td>
                  <td>
                    <span style={{ fontSize: '15px', fontWeight: '700', color: '#111827' }}>₹{pur.total.toLocaleString()}</span>
                  </td>
                  <td>
                    <span className={`badge ${pur.paymentStatus === 'Paid' ? 'badge-green' : 'badge-amber'}`}>
                      {pur.paymentStatus}
                    </span>
                  </td>
                  <td>
                    {isReceived ? (
                      <span className="badge badge-green">✓ Received (Stock Updated)</span>
                    ) : (
                      <span className="badge badge-amber">⏳ Draft / Pending</span>
                    )}
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    {!isReceived && (
                      <button
                        className="btn btn-primary btn-sm"
                        onClick={() => setConfirmReceiveId(pur.id)}
                      >
                        <CheckCircle2 size={14} />
                        <span>Receive Goods</span>
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* New Purchase Modal */}
      <NewPurchaseModal
        isOpen={isNewModalOpen}
        onClose={() => setIsNewModalOpen(false)}
      />

      {/* Confirm Receive Dialog */}
      {confirmReceiveId && (
        <div style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(17, 24, 39, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999
        }}>
          <div style={{ backgroundColor: '#FFFFFF', padding: '20px', borderRadius: '10px', width: '400px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '8px' }}>Confirm Goods Receiving</h3>
            <p style={{ fontSize: '13px', color: '#475569', marginBottom: '16px' }}>
              Receiving this purchase order will automatically increase inventory stock levels for all included raw ingredients. Proceed?
            </p>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
              <button className="btn btn-secondary btn-sm" onClick={() => setConfirmReceiveId(null)}>Cancel</button>
              <button className="btn btn-primary btn-sm" onClick={() => handleConfirmReceive(confirmReceiveId)}>
                Confirm & Update Stock
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
