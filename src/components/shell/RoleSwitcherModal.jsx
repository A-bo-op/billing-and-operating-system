import React from 'react';
import { Shield, Check, X } from 'lucide-react';
import { useAppState } from '../../context/AppStateContext';

export const RoleSwitcherModal = ({ isOpen, onClose }) => {
  const { activeUserRole, setActiveUserRole, setActiveUser, showToast } = useAppState();

  if (!isOpen) return null;

  const roles = [
    { role: 'Cashier', name: 'Divya Suresh', avatar: 'DS', permissions: ['Create Orders', 'Generate Bills', 'Collect Payments', 'Max 10% Discount'], restricted: ['Void Bill', 'Refund', 'Adjust Stock'] },
    { role: 'Manager', name: 'Sona Varghese', avatar: 'SV', permissions: ['All Operations', 'Void Bills', 'Process Refunds', 'Stock Adjustments', 'Staff Management'], restricted: [] },
    { role: 'Owner', name: 'Navafi Owner', avatar: 'NO', permissions: ['Full Access', 'Financial Reports', 'Settings & System Rules'], restricted: [] },
    { role: 'Head Chef', name: 'Rahul Menon', avatar: 'RM', permissions: ['Kitchen KOT View', 'Recipe Ingredients', 'Stock Adjustments'], restricted: ['Billing', 'Payment Processing'] },
    { role: 'Inventory Staff', name: 'Kiran Raj', avatar: 'KR', permissions: ['Inventory Management', 'Stock Counts', 'Purchases & Receiving'], restricted: ['Billing', 'Order Creation'] },
  ];

  const handleSelectRole = (r) => {
    setActiveUserRole(r.role);
    setActiveUser({ name: r.name, avatar: r.avatar, role: r.role });
    showToast(`Switched active role to ${r.role} (${r.name})`, 'info');
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
        maxWidth: '90vw',
        border: '1px solid #E2E8F0',
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
        overflow: 'hidden'
      }}>
        {/* Modal Header */}
        <div style={{
          padding: '16px 20px',
          borderBottom: '1px solid #E2E8F0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: '#F8FAFC'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Shield size={20} color="#3366FF" />
            <div>
              <div style={{ fontSize: '16px', fontWeight: '700', color: '#111827' }}>Switch Staff Duty Role</div>
              <div style={{ fontSize: '12px', color: '#64748B' }}>Simulate permissions & operational scope</div>
            </div>
          </div>

          <button onClick={onClose} style={{ border: 'none', background: 'transparent', cursor: 'pointer' }}>
            <X size={20} color="#64748B" />
          </button>
        </div>

        {/* Roles List */}
        <div style={{ padding: '16px', maxHeight: '420px', overflowY: 'auto' }}>
          {roles.map((r) => {
            const isSelected = activeUserRole === r.role;
            return (
              <div
                key={r.role}
                onClick={() => handleSelectRole(r)}
                style={{
                  padding: '12px 16px',
                  borderRadius: '8px',
                  border: isSelected ? '2px solid #3366FF' : '1px solid #E2E8F0',
                  backgroundColor: isSelected ? '#EFF6FF' : '#FFFFFF',
                  marginBottom: '10px',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      backgroundColor: isSelected ? '#3366FF' : '#CBD5E1',
                      color: '#FFFFFF',
                      fontSize: '13px',
                      fontWeight: '700',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      {r.avatar}
                    </div>

                    <div>
                      <span style={{ fontSize: '15px', fontWeight: '700', color: '#111827' }}>{r.role}</span>
                      <span style={{ fontSize: '13px', color: '#64748B', marginLeft: '8px' }}>— {r.name}</span>
                    </div>
                  </div>

                  {isSelected && (
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', fontWeight: '700', color: '#3366FF' }}>
                      <Check size={16} /> Active
                    </span>
                  )}
                </div>

                {/* Permissions tag chips */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginTop: '6px' }}>
                  {r.permissions.map((p, idx) => (
                    <span key={idx} style={{ fontSize: '11px', fontWeight: '600', backgroundColor: '#F0FDF4', color: '#16A34A', border: '1px solid #BBF7D0', padding: '1px 6px', borderRadius: '4px' }}>
                      ✓ {p}
                    </span>
                  ))}
                  {r.restricted.map((res, idx) => (
                    <span key={idx} style={{ fontSize: '11px', fontWeight: '500', backgroundColor: '#FEF2F2', color: '#DC2626', border: '1px solid #FCA5A5', padding: '1px 6px', borderRadius: '4px' }}>
                      ✕ {res}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div style={{ padding: '12px 20px', borderTop: '1px solid #E2E8F0', backgroundColor: '#F8FAFC', textAlign: 'right' }}>
          <button className="btn btn-secondary btn-sm" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
