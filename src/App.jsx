import React, { useState } from 'react';
import { AppStateProvider, useAppState } from './context/AppStateContext';
import { Sidebar } from './components/shell/Sidebar';
import { Header } from './components/shell/Header';
import { RoleSwitcherModal } from './components/shell/RoleSwitcherModal';
import { Toast } from './components/common/Toast';

import { FloorView } from './components/floor/FloorView';
import { PosView } from './components/pos/PosView';
import { MenuView } from './components/menu/MenuView';
import { InventoryView } from './components/inventory/InventoryView';
import { PurchasesView } from './components/purchases/PurchasesView';
import { InvoicesView } from './components/invoices/InvoicesView';
import { DashboardView } from './components/dashboard/DashboardView';
import { StaffView } from './components/staff/StaffView';
import { ReportsView } from './components/reports/ReportsView';
import { SettingsView } from './components/settings/SettingsView';

import { PaymentDrawer } from './components/payment/PaymentDrawer';
import { ReceiptModal } from './components/payment/ReceiptModal';

const MainLayout = () => {
  const { currentTab } = useAppState();
  const [isRoleModalOpen, setIsRoleModalOpen] = useState(false);

  const renderView = () => {
    switch (currentTab) {
      case 'tables':
        return <FloorView />;
      case 'pos':
        return <PosView />;
      case 'menu':
        return <MenuView />;
      case 'inventory':
        return <InventoryView />;
      case 'purchases':
        return <PurchasesView />;
      case 'invoices':
        return <InvoicesView />;
      case 'dashboard':
        return <DashboardView />;
      case 'staff':
        return <StaffView />;
      case 'reports':
        return <ReportsView />;
      case 'settings':
        return <SettingsView />;
      default:
        return <FloorView />;
    }
  };

  return (
    <div style={{ display: 'flex', width: '100vw', height: '100vh', overflow: 'hidden', backgroundColor: '#F8FAFC' }}>
      <Sidebar />

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', height: '100vh', overflow: 'hidden' }}>
        <Header onOpenRoleModal={() => setIsRoleModalOpen(true)} />

        <main style={{ flex: 1, overflowY: currentTab === 'pos' ? 'hidden' : 'auto' }}>
          {renderView()}
        </main>
      </div>

      {/* Drawers & Modals */}
      <PaymentDrawer />
      <ReceiptModal />
      <RoleSwitcherModal isOpen={isRoleModalOpen} onClose={() => setIsRoleModalOpen(false)} />
      <Toast />
    </div>
  );
};

export default function App() {
  return (
    <AppStateProvider>
      <MainLayout />
    </AppStateProvider>
  );
}
