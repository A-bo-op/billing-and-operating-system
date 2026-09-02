import React, { createContext, useContext, useState, useMemo } from 'react';
import {
  INITIAL_RESTAURANT_INFO,
  INITIAL_TABLES,
  INITIAL_DISHES,
  INITIAL_INGREDIENTS,
  INITIAL_ORDERS,
  INITIAL_INVOICES,
  INITIAL_STAFF,
  INITIAL_SUPPLIERS,
  INITIAL_PURCHASES,
  STOCK_AUDIT_LOGS,
} from '../data/demoData';

const AppStateContext = createContext(null);

export const AppStateProvider = ({ children }) => {
  // Navigation & Role State
  const [currentTab, setCurrentTab] = useState('tables'); // tables | pos | menu | inventory | purchases | invoices | dashboard | staff | reports
  const [activeUserRole, setActiveUserRole] = useState('Cashier'); // Cashier | Manager | Owner | Head Chef | Inventory Staff
  const [activeUser, setActiveUser] = useState({ name: 'Divya Suresh', avatar: 'DS', role: 'Cashier' });

  // Core Entity States
  const [restaurantInfo, setRestaurantInfo] = useState(INITIAL_RESTAURANT_INFO);
  const [tables, setTables] = useState(INITIAL_TABLES);
  const [dishes, setDishes] = useState(INITIAL_DISHES);
  const [ingredients, setIngredients] = useState(INITIAL_INGREDIENTS);
  const [orders, setOrders] = useState(INITIAL_ORDERS);
  const [invoices, setInvoices] = useState(INITIAL_INVOICES);
  const [staffList, setStaffList] = useState(INITIAL_STAFF);
  const [suppliers, setSuppliers] = useState(INITIAL_SUPPLIERS);
  const [purchases, setPurchases] = useState(INITIAL_PURCHASES);
  const [stockLogs, setStockLogs] = useState(STOCK_AUDIT_LOGS);

  // Active POS / Working State
  const [activeTableId, setActiveTableId] = useState('T1');
  const [activeOrderId, setActiveOrderId] = useState('ORD-101');
  
  // Modals & Drawers
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [printedInvoice, setPrintedInvoice] = useState(null); // for thermal receipt print modal
  const [toast, setToast] = useState(null); // { message, type: 'success'|'error'|'info'|'warning' }

  // Quick Toast Helper
  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  };

  // ----------------------------------------------------
  // COMPUTED / DERIVED DATA
  // ----------------------------------------------------
  const lowStockIngredients = useMemo(() => {
    return ingredients.filter(ing => ing.stock <= ing.minStock);
  }, [ingredients]);

  const activeOrder = useMemo(() => {
    return orders.find(o => o.id === activeOrderId) || null;
  }, [orders, activeOrderId]);

  const activeTable = useMemo(() => {
    return tables.find(t => t.id === activeTableId) || null;
  }, [tables, activeTableId]);

  // Today's Sales Calculation
  const todaysSales = useMemo(() => {
    return invoices
      .filter(inv => inv.status === 'Paid')
      .reduce((sum, inv) => sum + inv.total, 0);
  }, [invoices]);

  const todaysBilledCount = useMemo(() => {
    return invoices.filter(inv => inv.status === 'Paid').length;
  }, [invoices]);

  const staffOnDutyCount = useMemo(() => {
    return staffList.filter(s => s.status === 'On duty').length;
  }, [staffList]);

  // ----------------------------------------------------
  // TABLE & ORDER ACTIONS
  // ----------------------------------------------------
  const openTableOrder = (tableId) => {
    setActiveTableId(tableId);
    const existingTable = tables.find(t => t.id === tableId);

    if (existingTable && existingTable.orderId) {
      setActiveOrderId(existingTable.orderId);
    } else {
      // Create new draft order for this table
      const newOrdId = `ORD-${Date.now().toString().slice(-4)}`;
      const newOrder = {
        id: newOrdId,
        tableId: tableId,
        tableName: existingTable ? existingTable.name : tableId,
        orderType: 'dine-in',
        customerName: '',
        phone: '',
        guests: existingTable ? Math.min(2, existingTable.seats) : 2,
        waiter: activeUser.name,
        cashier: activeUser.name,
        status: 'active',
        kotStatus: 'draft',
        items: [],
        subtotal: 0,
        discount: 0,
        tax: 0,
        total: 0,
        createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setOrders(prev => [newOrder, ...prev]);
      setActiveOrderId(newOrdId);
      setTables(prev =>
        prev.map(t => (t.id === tableId ? { ...t, status: 'occupied', orderId: newOrdId, elapsedMinutes: 1 } : t))
      );
    }
    setCurrentTab('pos');
  };

  const startTakeawayOrder = () => {
    const newOrdId = `ORD-${Date.now().toString().slice(-4)}`;
    const newOrder = {
      id: newOrdId,
      tableId: null,
      tableName: 'Takeaway',
      orderType: 'takeaway',
      customerName: 'Takeaway Guest',
      phone: '',
      guests: 1,
      waiter: activeUser.name,
      cashier: activeUser.name,
      status: 'active',
      kotStatus: 'draft',
      items: [],
      subtotal: 0,
      discount: 0,
      tax: 0,
      total: 0,
      createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    setOrders(prev => [newOrder, ...prev]);
    setActiveOrderId(newOrdId);
    setActiveTableId(null);
    setCurrentTab('pos');
  };

  const startDeliveryOrder = () => {
    const newOrdId = `ORD-${Date.now().toString().slice(-4)}`;
    const newOrder = {
      id: newOrdId,
      tableId: null,
      tableName: 'Delivery',
      orderType: 'delivery',
      customerName: '',
      phone: '',
      address: '',
      guests: 1,
      waiter: activeUser.name,
      cashier: activeUser.name,
      status: 'active',
      kotStatus: 'draft',
      items: [],
      subtotal: 0,
      discount: 0,
      tax: 0,
      total: 0,
      createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    setOrders(prev => [newOrder, ...prev]);
    setActiveOrderId(newOrdId);
    setActiveTableId(null);
    setCurrentTab('pos');
  };

  // Re-calculate order totals
  const recalculateOrder = (items, discountAmount = 0) => {
    const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const discounted = Math.max(0, subtotal - discountAmount);
    const tax = Math.round(discounted * (restaurantInfo.taxRate / 100));
    const total = discounted + tax;
    return { subtotal, discount: discountAmount, tax, total };
  };

  // POS Dish Adding
  const addDishToOrder = (dish, variant = null, notes = '') => {
    if (!activeOrderId) return;

    setOrders(prev =>
      prev.map(ord => {
        if (ord.id !== activeOrderId) return ord;

        const itemPrice = variant ? variant.price : dish.price;
        const itemName = variant ? `${dish.name} (${variant.name})` : dish.name;
        const existingIdx = ord.items.findIndex(
          i => i.dishId === dish.id && i.name === itemName && i.notes === notes && i.kotState !== 'sent'
        );

        let newItems;
        if (existingIdx >= 0) {
          newItems = ord.items.map((i, idx) =>
            idx === existingIdx ? { ...i, quantity: i.quantity + 1 } : i
          );
        } else {
          newItems = [
            ...ord.items,
            {
              id: `item-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
              dishId: dish.id,
              name: itemName,
              price: itemPrice,
              quantity: 1,
              kotState: 'not_sent',
              notes: notes,
            },
          ];
        }

        const totals = recalculateOrder(newItems, ord.discount);
        return { ...ord, items: newItems, ...totals };
      })
    );
    showToast(`Added ${dish.name} to order`, 'success');
  };

  // POS Item Quantity Change
  const updateItemQuantity = (itemId, delta) => {
    if (!activeOrderId) return;

    setOrders(prev =>
      prev.map(ord => {
        if (ord.id !== activeOrderId) return ord;

        const newItems = ord.items
          .map(item => {
            if (item.id !== itemId) return item;

            // Operational Safety Rule: Sent items cannot have quantity reduced below 1 without cancellation flow
            if (item.kotState === 'sent' && item.quantity + delta < 1) {
              showToast('Sent items must be cancelled with a reason', 'warning');
              return item;
            }

            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          })
          .filter(Boolean);

        const totals = recalculateOrder(newItems, ord.discount);
        return { ...ord, items: newItems, ...totals };
      })
    );
  };

  // Cancel / Remove Sent Item with Reason
  const removeSentItem = (itemId, reason) => {
    if (!activeOrderId) return;

    setOrders(prev =>
      prev.map(ord => {
        if (ord.id !== activeOrderId) return ord;

        const targetItem = ord.items.find(i => i.id === itemId);
        const newItems = ord.items.filter(i => i.id !== itemId);
        const totals = recalculateOrder(newItems, ord.discount);

        return { ...ord, items: newItems, ...totals };
      })
    );
    showToast(`Item removed (Reason: ${reason})`, 'info');
  };

  // Apply Discount
  const applyOrderDiscount = (amount) => {
    if (!activeOrderId) return;

    setOrders(prev =>
      prev.map(ord => {
        if (ord.id !== activeOrderId) return ord;
        const totals = recalculateOrder(ord.items, amount);
        return { ...ord, ...totals };
      })
    );
    showToast(`Applied ₹${amount} discount`, 'success');
  };

  // Send KOT to Kitchen
  const sendKotToKitchen = () => {
    if (!activeOrder || activeOrder.items.length === 0) return;

    setOrders(prev =>
      prev.map(ord => {
        if (ord.id !== activeOrderId) return ord;
        const updatedItems = ord.items.map(item => ({ ...item, kotState: 'sent' }));
        return { ...ord, items: updatedItems, kotStatus: 'sent' };
      })
    );

    // Update table pending KOT status
    if (activeOrder.tableId) {
      setTables(prev =>
        prev.map(t => (t.id === activeOrder.tableId ? { ...t, pendingKot: false } : t))
      );
    }

    // Recipe Ingredient Stock Consumption
    activeOrder.items.forEach(orderItem => {
      if (orderItem.kotState === 'not_sent') {
        const dish = dishes.find(d => d.id === orderItem.dishId);
        if (dish && dish.recipe) {
          dish.recipe.forEach(rec => {
            setIngredients(ingPrev =>
              ingPrev.map(ing => {
                if (ing.id === rec.ingredientId) {
                  // convert recipe unit to base ingredient stock unit if needed
                  const reductionInKgOrL = rec.unit === 'g' || rec.unit === 'ml' ? (rec.quantity * orderItem.quantity) / 1000 : rec.quantity * orderItem.quantity;
                  const newStock = Math.max(0, ing.stock - reductionInKgOrL);
                  return { ...ing, stock: parseFloat(newStock.toFixed(2)) };
                }
                return ing;
              })
            );
          });
        }
      }
    });

    showToast('KOT sent to kitchen printer & kitchen display!', 'success');
  };

  // Complete Payment & Finalize Invoice
  const completePayment = (paymentMethod, referenceNo = '', cashDetails = {}) => {
    if (!activeOrder) return;

    const invNo = `INV-${(1002 + invoices.length).toString()}`;
    const newInvoice = {
      id: invNo,
      orderId: activeOrder.id,
      invoiceNo: invNo,
      date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      orderType: activeOrder.orderType === 'dine-in' ? 'Dine-in' : activeOrder.orderType === 'takeaway' ? 'Takeaway' : 'Delivery',
      tableOrCustomer: activeOrder.tableId ? `Table ${activeOrder.tableId}` : activeOrder.customerName || 'Walk-in Guest',
      cashier: activeUser.name,
      paymentMethod: paymentMethod,
      referenceNo: referenceNo,
      amountReceived: cashDetails.amountReceived || activeOrder.total,
      changeGiven: cashDetails.changeGiven || 0,
      items: activeOrder.items.map(i => ({ name: i.name, quantity: i.quantity, rate: i.price, amount: i.price * i.quantity })),
      subtotal: activeOrder.subtotal,
      discount: activeOrder.discount,
      tax: activeOrder.tax,
      total: activeOrder.total,
      status: 'Paid',
    };

    setInvoices(prev => [newInvoice, ...prev]);

    // Close table if dine-in
    if (activeOrder.tableId) {
      setTables(prev =>
        prev.map(t => (t.id === activeOrder.tableId ? { ...t, status: 'free', orderId: null, elapsedMinutes: 0 } : t))
      );
    }

    // Close order
    setOrders(prev => prev.filter(o => o.id !== activeOrder.id));
    setIsPaymentModalOpen(false);
    setPrintedInvoice(newInvoice);

    showToast(`Payment of ₹${activeOrder.total} completed! ${invNo} generated.`, 'success');
  };

  // ----------------------------------------------------
  // INVENTORY & STOCK ADJUSTMENT ACTIONS
  // ----------------------------------------------------
  const adjustStock = (ingredientId, quantity, type, reason) => {
    setIngredients(prev =>
      prev.map(ing => {
        if (ing.id !== ingredientId) return ing;

        let newStock = ing.stock;
        if (type === 'Add Stock') newStock += quantity;
        else if (type === 'Remove Stock' || type === 'Wastage') newStock = Math.max(0, newStock - quantity);
        else if (type === 'Physical Audit Correction') newStock = quantity;

        return {
          ...ing,
          stock: parseFloat(newStock.toFixed(2)),
          lastUpdated: 'Just now',
        };
      })
    );

    const ingObj = ingredients.find(i => i.id === ingredientId);
    const newLog = {
      id: `log-${Date.now()}`,
      date: new Date().toLocaleString([], { dateStyle: 'short', timeStyle: 'short' }),
      ingredientName: ingObj ? ingObj.name : 'Ingredient',
      adjustmentType: type,
      quantity: `${quantity} ${ingObj ? ingObj.unit : ''}`,
      reason: reason,
      user: activeUser.name,
    };
    setStockLogs(prev => [newLog, ...prev]);

    showToast(`Stock updated for ${ingObj ? ingObj.name : 'Ingredient'} (${type})`, 'success');
  };

  const addIngredient = (ingredientData) => {
    const newId = `ing-${Date.now()}`;
    const newIng = {
      id: newId,
      ...ingredientData,
      stock: parseFloat(ingredientData.stock),
      minStock: parseFloat(ingredientData.minStock),
      costPerUnit: parseFloat(ingredientData.costPerUnit || 0),
      lastUpdated: 'Just now',
    };
    setIngredients(prev => [newIng, ...prev]);
    showToast(`Added ingredient ${newIng.name}`, 'success');
  };

  // ----------------------------------------------------
  // PURCHASES & SUPPLIER ACTIONS
  // ----------------------------------------------------
  const receivePurchase = (purchaseId) => {
    const targetPurchase = purchases.find(p => p.id === purchaseId);
    if (!targetPurchase) return;

    if (targetPurchase.status === 'Received') {
      showToast('Purchase is already received.', 'info');
      return;
    }

    // Increase stock for each purchase line item
    targetPurchase.items.forEach(item => {
      setIngredients(prev =>
        prev.map(ing => {
          if (ing.id === item.ingredientId) {
            return {
              ...ing,
              stock: parseFloat((ing.stock + item.quantity).toFixed(2)),
              lastUpdated: 'Just now (PO Received)',
            };
          }
          return ing;
        })
      );
    });

    setPurchases(prev =>
      prev.map(p => (p.id === purchaseId ? { ...p, status: 'Received' } : p))
    );

    showToast(`Purchase ${targetPurchase.purchaseNo} received & inventory stock updated!`, 'success');
  };

  const addPurchase = (purchaseData) => {
    const purNo = `PUR-${(1025 + purchases.length).toString()}`;
    const newPurchase = {
      id: purNo,
      purchaseNo: purNo,
      ...purchaseData,
    };
    setPurchases(prev => [newPurchase, ...prev]);

    if (purchaseData.status === 'Received') {
      purchaseData.items.forEach(item => {
        setIngredients(prev =>
          prev.map(ing => {
            if (ing.id === item.ingredientId) {
              return { ...ing, stock: parseFloat((ing.stock + item.quantity).toFixed(2)), lastUpdated: 'Just now' };
            }
            return ing;
          })
        );
      });
      showToast(`Purchase ${purNo} created & stock updated!`, 'success');
    } else {
      showToast(`Purchase draft ${purNo} saved.`, 'info');
    }
  };

  // ----------------------------------------------------
  // MENU MANAGEMENT ACTIONS
  // ----------------------------------------------------
  const toggleDishAvailability = (dishId) => {
    setDishes(prev =>
      prev.map(d => (d.id === dishId ? { ...d, isAvailable: !d.isAvailable } : d))
    );
    showToast('Dish availability updated', 'info');
  };

  const addDish = (dishData) => {
    const newId = `d-${Date.now()}`;
    const newDish = {
      id: newId,
      ...dishData,
      price: parseFloat(dishData.price),
      recipeLinked: dishData.recipe && dishData.recipe.length > 0,
    };
    setDishes(prev => [newDish, ...prev]);
    showToast(`Added dish ${newDish.name}`, 'success');
  };

  // ----------------------------------------------------
  // STAFF ACTIONS
  // ----------------------------------------------------
  const toggleStaffDuty = (staffId) => {
    setStaffList(prev =>
      prev.map(s => {
        if (s.id === staffId) {
          const nextStatus = s.status === 'On duty' ? 'Off duty' : 'On duty';
          return { ...s, status: nextStatus };
        }
        return s;
      })
    );
    showToast('Staff duty status updated', 'info');
  };

  // ----------------------------------------------------
  // INVOICE AUDIT (VOID / REFUND)
  // ----------------------------------------------------
  const voidInvoice = (invoiceId, reason) => {
    if (activeUserRole !== 'Manager' && activeUserRole !== 'Owner') {
      showToast('Permission Denied: Only Managers/Owners can void invoices.', 'error');
      return;
    }

    setInvoices(prev =>
      prev.map(inv => (inv.id === invoiceId ? { ...inv, status: 'Voided', voidReason: reason } : inv))
    );
    showToast(`Invoice ${invoiceId} voided. Reason: ${reason}`, 'warning');
  };

  // Context value object
  const value = {
    restaurantInfo,
    setRestaurantInfo,
    currentTab,
    setCurrentTab,
    activeUserRole,
    setActiveUserRole,
    activeUser,
    setActiveUser,
    tables,
    dishes,
    ingredients,
    lowStockIngredients,
    orders,
    activeOrderId,
    setActiveOrderId,
    activeOrder,
    activeTableId,
    activeTable,
    invoices,
    todaysSales,
    todaysBilledCount,
    staffOnDutyCount,
    staffList,
    suppliers,
    purchases,
    stockLogs,
    isPaymentModalOpen,
    setIsPaymentModalOpen,
    printedInvoice,
    setPrintedInvoice,
    toast,
    showToast,
    openTableOrder,
    startTakeawayOrder,
    startDeliveryOrder,
    addDishToOrder,
    updateItemQuantity,
    removeSentItem,
    applyOrderDiscount,
    sendKotToKitchen,
    completePayment,
    adjustStock,
    addIngredient,
    receivePurchase,
    addPurchase,
    toggleDishAvailability,
    addDish,
    toggleStaffDuty,
    voidInvoice,
  };

  return <AppStateContext.Provider value={value}>{children}</AppStateContext.Provider>;
};

export const useAppState = () => {
  const context = useContext(AppStateContext);
  if (!context) {
    throw new Error('useAppState must be used within an AppStateProvider');
  }
  return context;
};
