import React, { useState } from 'react';
import { Users, UserCheck, ShieldCheck, Phone, Clock, Plus, Search } from 'lucide-react';
import { useAppState } from '../../context/AppStateContext';
import { AddStaffModal } from './AddStaffModal';

export const StaffView = () => {
  const { staffList, toggleStaffDuty, activeUserRole } = useAppState();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRole, setSelectedRole] = useState('All');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isPermissionsModalOpen, setIsPermissionsModalOpen] = useState(false);

  const onDutyCount = staffList.filter(s => s.status === 'On duty').length;

  const filteredStaff = staffList.filter(s => {
    const matchesSearch = s.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = selectedRole === 'All' || s.role === selectedRole;
    return matchesSearch && matchesRole;
  });

  return (
    <div style={{ padding: '24px', maxWidth: '1400px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
        <div>
          <h1 className="title-page">Staff & Duty Shift Roster</h1>
          <div style={{ fontSize: '13px', color: '#64748B', marginTop: '2px' }}>
            Employee presence tracking, shift schedules & role permission management
          </div>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button className="btn btn-secondary" onClick={() => setIsPermissionsModalOpen(true)}>
            <ShieldCheck size={16} color="#3366FF" />
            <span>View Permission Matrix</span>
          </button>

          <button className="btn btn-primary" onClick={() => setIsAddModalOpen(true)}>
            <Plus size={16} />
            <span>Add Employee</span>
          </button>
        </div>
      </div>

      {/* Search + Filter Toolbar */}
      <div className="card-panel" style={{ marginBottom: '20px', display: 'flex', gap: '12px', alignItems: 'center' }}>
        <div style={{ position: 'relative', flex: 1 }}>
          <Search size={15} color="#64748B" style={{ position: 'absolute', left: '12px', top: '14px' }} />
          <input
            type="text"
            className="input-field"
            style={{ paddingLeft: '36px' }}
            placeholder="Search staff by name..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
        </div>
        <select
          className="input-field"
          style={{ width: '180px' }}
          value={selectedRole}
          onChange={e => setSelectedRole(e.target.value)}
        >
          <option value="All">All Roles</option>
          <option value="Cashier">Cashier</option>
          <option value="Manager">Manager</option>
          <option value="Head Chef">Head Chef</option>
          <option value="Kitchen Helper">Kitchen Helper</option>
          <option value="Waiter">Waiter</option>
          <option value="Inventory Staff">Inventory Staff</option>
        </select>
      </div>

      {/* KPI Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '14px', marginBottom: '20px' }}>
        <div className="card-panel" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ width: '42px', height: '42px', borderRadius: '8px', backgroundColor: '#F0FDF4', color: '#16A34A', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <UserCheck size={20} />
          </div>
          <div>
            <div style={{ fontSize: '22px', fontWeight: '700', color: '#16A34A', lineHeight: 1 }}>{onDutyCount} / {staffList.length} On Duty</div>
            <div style={{ fontSize: '12px', color: '#64748B', marginTop: '3px' }}>Active floor staff right now</div>
          </div>
        </div>

        <div className="card-panel" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ width: '42px', height: '42px', borderRadius: '8px', backgroundColor: '#EFF6FF', color: '#3366FF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Users size={20} />
          </div>
          <div>
            <div style={{ fontSize: '22px', fontWeight: '700', color: '#111827', lineHeight: 1 }}>{staffList.length} Employees</div>
            <div style={{ fontSize: '12px', color: '#64748B', marginTop: '3px' }}>Total staff directory</div>
          </div>
        </div>

        <div className="card-panel" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ width: '42px', height: '42px', borderRadius: '8px', backgroundColor: '#F8FAFC', color: '#111827', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Clock size={20} />
          </div>
          <div>
            <div style={{ fontSize: '22px', fontWeight: '700', color: '#111827', lineHeight: 1 }}>2 Shifts</div>
            <div style={{ fontSize: '12px', color: '#64748B', marginTop: '3px' }}>Day & Evening shifts</div>
          </div>
        </div>
      </div>

      {/* Staff Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '16px'
      }}>
        {filteredStaff.map((staff) => {
          const isOnDuty = staff.status === 'On duty';
          return (
            <div
              key={staff.id}
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '10px',
                border: '1px solid #E2E8F0',
                padding: '18px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                boxShadow: '0 1px 3px rgba(0,0,0,0.02)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '14px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '50%',
                    backgroundColor: isOnDuty ? '#3366FF' : '#CBD5E1',
                    color: '#FFFFFF',
                    fontWeight: '700',
                    fontSize: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    {staff.avatar}
                  </div>

                  <div>
                    <div style={{ fontSize: '16px', fontWeight: '700', color: '#111827' }}>{staff.name}</div>
                    <div style={{ fontSize: '12px', color: '#3366FF', fontWeight: '600' }}>{staff.role}</div>
                  </div>
                </div>

                <span className={`badge ${isOnDuty ? 'badge-green' : 'badge-gray'}`}>
                  {staff.status}
                </span>
              </div>

              <div style={{ fontSize: '13px', color: '#475569', display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Clock size={14} color="#64748B" />
                  <span>Shift: {staff.shift}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Phone size={14} color="#64748B" />
                  <span>{staff.phone}</span>
                </div>
              </div>

              {/* Duty Toggle Action */}
              <div style={{ paddingTop: '12px', borderTop: '1px solid #F1F5F9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '12px', fontWeight: '600', color: '#64748B' }}>Toggle Duty Status</span>
                <button
                  className={`btn ${isOnDuty ? 'btn-secondary' : 'btn-primary'} btn-sm`}
                  onClick={() => toggleStaffDuty(staff.id)}
                >
                  <span>{isOnDuty ? 'Mark Off Duty' : 'Mark On Duty'}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Permission Matrix Modal */}
      {isPermissionsModalOpen && (
        <div style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(17,24,39,0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999
        }}>
          <div style={{ backgroundColor: '#FFFFFF', padding: '24px', borderRadius: '12px', width: '640px', maxWidth: '92vw' }}>
            <h2 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '14px' }}>Role Permission Matrix</h2>
            <table className="data-table">
              <thead>
                <tr>
                  <th>Permission Action</th>
                  <th>Cashier</th>
                  <th>Manager</th>
                  <th>Chef</th>
                  <th>Inventory</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Create / Take Orders</td>
                  <td style={{ color: '#16A34A', fontWeight: 'bold' }}>✓</td>
                  <td style={{ color: '#16A34A', fontWeight: 'bold' }}>✓</td>
                  <td style={{ color: '#DC2626' }}>✕</td>
                  <td style={{ color: '#DC2626' }}>✕</td>
                </tr>
                <tr>
                  <td>Collect Payment &amp; Invoice</td>
                  <td style={{ color: '#16A34A', fontWeight: 'bold' }}>✓</td>
                  <td style={{ color: '#16A34A', fontWeight: 'bold' }}>✓</td>
                  <td style={{ color: '#DC2626' }}>✕</td>
                  <td style={{ color: '#DC2626' }}>✕</td>
                </tr>
                <tr>
                  <td>Apply Discount &amp; Edit Price</td>
                  <td style={{ color: '#D97706' }}>Max 10%</td>
                  <td style={{ color: '#16A34A', fontWeight: 'bold' }}>✓ Unlimited</td>
                  <td style={{ color: '#DC2626' }}>✕</td>
                  <td style={{ color: '#DC2626' }}>✕</td>
                </tr>
                <tr>
                  <td>Void Bill &amp; Process Refund</td>
                  <td style={{ color: '#DC2626', fontWeight: 'bold' }}>✕ Restricted</td>
                  <td style={{ color: '#16A34A', fontWeight: 'bold' }}>✓ Authorized</td>
                  <td style={{ color: '#DC2626' }}>✕</td>
                  <td style={{ color: '#DC2626' }}>✕</td>
                </tr>
                <tr>
                  <td>Manual Stock Adjustments</td>
                  <td style={{ color: '#DC2626' }}>✕</td>
                  <td style={{ color: '#16A34A', fontWeight: 'bold' }}>✓</td>
                  <td style={{ color: '#16A34A', fontWeight: 'bold' }}>✓</td>
                  <td style={{ color: '#16A34A', fontWeight: 'bold' }}>✓</td>
                </tr>
              </tbody>
            </table>

            <div style={{ marginTop: '20px', textAlign: 'right' }}>
              <button className="btn btn-secondary" onClick={() => setIsPermissionsModalOpen(false)}>Close Matrix</button>
            </div>
          </div>
        </div>
      )}

      {/* Add Staff Modal */}
      <AddStaffModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} />
    </div>
  );
};
