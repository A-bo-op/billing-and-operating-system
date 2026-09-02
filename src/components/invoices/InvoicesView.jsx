import React, { useState } from 'react';
import { FileText, Search, Printer, Eye } from 'lucide-react';
import { useAppState } from '../../context/AppStateContext';
import { InvoiceDetailDrawer } from './InvoiceDetailDrawer';

export const InvoicesView = () => {
  const { invoices } = useAppState();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('All');
  const [selectedMethod, setSelectedMethod] = useState('All');
  const [activeInvoice, setActiveInvoice] = useState(null);

  const filteredInvoices = invoices.filter(inv => {
    const matchesSearch =
      inv.invoiceNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inv.tableOrCustomer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inv.cashier.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedType === 'All' || inv.orderType === selectedType;
    const matchesMethod = selectedMethod === 'All' || inv.paymentMethod === selectedMethod;
    return matchesSearch && matchesType && matchesMethod;
  });

  return (
    <div style={{ padding: '24px', maxWidth: '1400px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
        <div>
          <h1 className="title-page">Invoices & Transaction Audit History</h1>
          <div style={{ fontSize: '13px', color: '#64748B', marginTop: '2px' }}>
            Complete bill history, payment references, void tracking & reprint receipts
          </div>
        </div>

        <div style={{ fontSize: '13px', color: '#64748B', fontWeight: '600' }}>
          Total Invoices: <span style={{ color: '#111827' }}>{invoices.length}</span>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="card-panel" style={{ marginBottom: '16px', display: 'flex', gap: '16px' }}>
        <div style={{ position: 'relative', flex: 1 }}>
          <Search size={16} color="#64748B" style={{ position: 'absolute', left: '12px', top: '13px' }} />
          <input
            type="text"
            className="input-field"
            style={{ paddingLeft: '38px' }}
            placeholder="Search invoice #, table, customer or cashier..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <select className="input-field" style={{ width: '180px' }} value={selectedType} onChange={(e) => setSelectedType(e.target.value)}>
          <option value="All">All Order Types</option>
          <option value="Dine-in">Dine-in</option>
          <option value="Takeaway">Takeaway</option>
          <option value="Delivery">Delivery</option>
        </select>

        <select className="input-field" style={{ width: '180px' }} value={selectedMethod} onChange={(e) => setSelectedMethod(e.target.value)}>
          <option value="All">All Payment Methods</option>
          <option value="UPI">UPI</option>
          <option value="Cash">Cash</option>
          <option value="Card">Card</option>
        </select>
      </div>

      {/* Table */}
      <div className="card-panel" style={{ padding: 0, overflow: 'hidden' }}>
        <table className="data-table">
          <thead>
            <tr>
              <th>Invoice #</th>
              <th>Date & Time</th>
              <th>Order Type</th>
              <th>Table / Customer</th>
              <th>Cashier</th>
              <th>Payment Method</th>
              <th>Total Amount</th>
              <th>Status</th>
              <th style={{ textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredInvoices.map((inv) => (
              <tr key={inv.id}>
                <td>
                  <span style={{ fontWeight: '700', color: '#3366FF' }}>{inv.invoiceNo}</span>
                </td>
                <td>
                  <span style={{ fontSize: '13px', color: '#475569' }}>{inv.date}, {inv.time}</span>
                </td>
                <td>
                  <span className="badge badge-gray" style={{ fontSize: '11px' }}>{inv.orderType}</span>
                </td>
                <td>
                  <span style={{ fontWeight: '600', color: '#111827' }}>{inv.tableOrCustomer}</span>
                </td>
                <td>
                  <span style={{ fontSize: '13px', color: '#475569' }}>{inv.cashier}</span>
                </td>
                <td>
                  <span className="badge badge-blue">{inv.paymentMethod}</span>
                </td>
                <td>
                  <span style={{ fontSize: '15px', fontWeight: '700', color: '#111827' }}>₹{inv.total}</span>
                </td>
                <td>
                  <span className={`badge ${inv.status === 'Paid' ? 'badge-green' : 'badge-amber'}`}>
                    {inv.status}
                  </span>
                </td>
                <td style={{ textAlign: 'right' }}>
                  <button
                    className="btn btn-secondary btn-sm"
                    onClick={() => setActiveInvoice(inv)}
                  >
                    <Eye size={14} color="#3366FF" />
                    <span>View Details</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Detail Drawer */}
      <InvoiceDetailDrawer
        invoice={activeInvoice}
        isOpen={Boolean(activeInvoice)}
        onClose={() => setActiveInvoice(null)}
      />
    </div>
  );
};
