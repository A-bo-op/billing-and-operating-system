export const INITIAL_RESTAURANT_INFO = {
  name: "Navafi",
  outlet: "Royal Spice Outlet #1",
  address: "100 Feet Road, Indiranagar, Bengaluru - 560038",
  phone: "+91 98765 12345",
  gstin: "29ABCDE1234F1Z5",
  fssai: "11223344556677",
  taxRate: 5, // 5% GST default
};

export const INITIAL_TABLES = [
  { id: "T1", name: "T1", seats: 2, status: "free", orderId: null, elapsedMinutes: 0, pendingKot: false },
  { id: "T2", name: "T2", seats: 4, status: "free", orderId: null, elapsedMinutes: 0, pendingKot: false },
  { id: "T3", name: "T3", seats: 4, status: "free", orderId: null, elapsedMinutes: 0, pendingKot: false },
  { id: "T4", name: "T4", seats: 6, status: "free", orderId: null, elapsedMinutes: 0, pendingKot: false },
  { id: "T5", name: "T5", seats: 2, status: "free", orderId: null, elapsedMinutes: 0, pendingKot: false },
  { id: "T6", name: "T6", seats: 4, status: "free", orderId: null, elapsedMinutes: 0, pendingKot: false },
  { id: "T7", name: "T7", seats: 8, status: "free", orderId: null, elapsedMinutes: 0, pendingKot: false },
  { id: "T8", name: "T8", seats: 4, status: "free", orderId: null, elapsedMinutes: 0, pendingKot: false },
];

export const CATEGORIES = [
  "All",
  "Starters",
  "Main Course",
  "Breads",
  "Rice & Biryani",
  "Desserts",
  "Beverages",
];

export const INITIAL_DISHES = [
  {
    id: "d1",
    name: "Paneer Tikka",
    category: "Starters",
    price: 220,
    isVeg: true,
    isAvailable: true,
    hasVariants: true,
    recipeLinked: true,
    variants: [
      { id: "v1", name: "Regular Portion", price: 220 },
      { id: "v2", name: "Special Malai Portion", price: 260 },
    ],
    recipe: [
      { ingredientId: "ing-3", name: "Paneer", quantity: 200, unit: "g" },
      { ingredientId: "ing-4", name: "Onions", quantity: 50, unit: "g" },
      { ingredientId: "ing-7", name: "Butter", quantity: 20, unit: "g" },
      { ingredientId: "ing-10", name: "Spice Mix", quantity: 10, unit: "g" },
    ],
  },
  {
    id: "d2",
    name: "Veg Spring Roll",
    category: "Starters",
    price: 180,
    isVeg: true,
    isAvailable: true,
    hasVariants: false,
    recipeLinked: true,
    recipe: [
      { ingredientId: "ing-9", name: "Maida", quantity: 100, unit: "g" },
      { ingredientId: "ing-4", name: "Onions", quantity: 40, unit: "g" },
      { ingredientId: "ing-6", name: "Cooking Oil", quantity: 30, unit: "ml" },
    ],
  },
  {
    id: "d3",
    name: "Chilli Chicken",
    category: "Starters",
    price: 240,
    isVeg: false,
    isAvailable: true,
    hasVariants: false,
    recipeLinked: true,
    recipe: [
      { ingredientId: "ing-2", name: "Chicken", quantity: 250, unit: "g" },
      { ingredientId: "ing-4", name: "Onions", quantity: 50, unit: "g" },
      { ingredientId: "ing-6", name: "Cooking Oil", quantity: 40, unit: "ml" },
    ],
  },
  {
    id: "d4",
    name: "Chicken Biryani",
    category: "Rice & Biryani",
    price: 260,
    isVeg: false,
    isAvailable: true,
    hasVariants: true,
    variants: [
      { id: "v3", name: "Half Portion", price: 160 },
      { id: "v4", name: "Full Portion", price: 260 },
    ],
    recipeLinked: true,
    recipe: [
      { ingredientId: "ing-1", name: "Basmati Rice", quantity: 200, unit: "g" },
      { ingredientId: "ing-2", name: "Chicken", quantity: 200, unit: "g" },
      { ingredientId: "ing-10", name: "Spice Mix", quantity: 15, unit: "g" },
    ],
  },
  {
    id: "d5",
    name: "Butter Naan",
    category: "Breads",
    price: 60,
    isVeg: true,
    isAvailable: true,
    hasVariants: false,
    recipeLinked: true,
    recipe: [
      { ingredientId: "ing-9", name: "Maida", quantity: 80, unit: "g" },
      { ingredientId: "ing-7", name: "Butter", quantity: 15, unit: "g" },
      { ingredientId: "ing-8", name: "Milk", quantity: 20, unit: "ml" },
    ],
  },
  {
    id: "d6",
    name: "Veg Fried Rice",
    category: "Rice & Biryani",
    price: 190,
    isVeg: true,
    isAvailable: true,
    hasVariants: false,
    recipeLinked: true,
    recipe: [
      { ingredientId: "ing-1", name: "Basmati Rice", quantity: 180, unit: "g" },
      { ingredientId: "ing-4", name: "Onions", quantity: 40, unit: "g" },
      { ingredientId: "ing-6", name: "Cooking Oil", quantity: 25, unit: "ml" },
    ],
  },
  {
    id: "d7",
    name: "Fresh Lime Soda",
    category: "Beverages",
    price: 80,
    isVeg: true,
    isAvailable: true,
    hasVariants: false,
    recipeLinked: false,
  },
  {
    id: "d8",
    name: "Dal Makhani",
    category: "Main Course",
    price: 210,
    isVeg: true,
    isAvailable: true,
    hasVariants: false,
    recipeLinked: true,
    recipe: [
      { ingredientId: "ing-7", name: "Butter", quantity: 30, unit: "g" },
      { ingredientId: "ing-8", name: "Milk", quantity: 50, unit: "ml" },
    ],
  },
  {
    id: "d9",
    name: "Gulab Jamun (2 pcs)",
    category: "Desserts",
    price: 120,
    isVeg: true,
    isAvailable: true,
    hasVariants: false,
    recipeLinked: false,
  },
];

export const INITIAL_INGREDIENTS = [
  { id: "ing-1", name: "Basmati Rice", category: "Grains", stock: 25, minStock: 5, unit: "kg", costPerUnit: 110, lastUpdated: "Today" },
  { id: "ing-2", name: "Chicken", category: "Meat", stock: 12, minStock: 5, unit: "kg", costPerUnit: 220, lastUpdated: "Today" },
  { id: "ing-3", name: "Paneer", category: "Dairy", stock: 3, minStock: 4, unit: "kg", costPerUnit: 340, lastUpdated: "Today" },
  { id: "ing-4", name: "Onions", category: "Vegetables", stock: 40, minStock: 10, unit: "kg", costPerUnit: 35, lastUpdated: "Today" },
  { id: "ing-5", name: "Tomatoes", category: "Vegetables", stock: 18, minStock: 5, unit: "kg", costPerUnit: 40, lastUpdated: "Today" },
  { id: "ing-6", name: "Cooking Oil", category: "Oils", stock: 15, minStock: 5, unit: "L", costPerUnit: 150, lastUpdated: "Today" },
  { id: "ing-7", name: "Butter", category: "Dairy", stock: 2, minStock: 3, unit: "kg", costPerUnit: 520, lastUpdated: "Today" },
  { id: "ing-8", name: "Milk", category: "Dairy", stock: 20, minStock: 5, unit: "L", costPerUnit: 60, lastUpdated: "Today" },
  { id: "ing-9", name: "Maida", category: "Flour", stock: 22, minStock: 5, unit: "kg", costPerUnit: 45, lastUpdated: "Today" },
  { id: "ing-10", name: "Spice Mix", category: "Spices", stock: 6, minStock: 2, unit: "kg", costPerUnit: 480, lastUpdated: "Today" },
];

// Clean working initial states
export const INITIAL_ORDERS = [];

export const INITIAL_INVOICES = [];

export const INITIAL_STAFF = [
  { id: "st-1", name: "Sona Varghese", role: "Manager", shift: "10 AM – 10 PM", status: "On duty", phone: "+91 98450 11223", avatar: "SV" },
  { id: "st-2", name: "Rahul Menon", role: "Head Chef", shift: "10 AM – 10 PM", status: "On duty", phone: "+91 98450 22334", avatar: "RM" },
  { id: "st-3", name: "Kiran Raj", role: "Kitchen Helper", shift: "11 AM – 11 PM", status: "On duty", phone: "+91 98450 33445", avatar: "KR" },
  { id: "st-4", name: "Anu Thomas", role: "Waiter", shift: "12 PM – 10 PM", status: "On duty", phone: "+91 98450 44556", avatar: "AT" },
  { id: "st-5", name: "Vishnu Das", role: "Waiter", shift: "4 PM – 12 AM", status: "Off duty", phone: "+91 98450 55667", avatar: "VD" },
  { id: "st-6", name: "Divya Suresh", role: "Cashier", shift: "9 AM – 7 PM", status: "On duty", phone: "+91 98450 66778", avatar: "DS" },
];

export const INITIAL_SUPPLIERS = [
  { id: "sup-1", name: "Fresh Foods Pvt Ltd", contactPerson: "Ramesh K.", phone: "+91 98765 43210", email: "orders@freshfoods.in", address: "Kalamassery Wholesale Market, Kochi", gstin: "29BBBFA1234B1Z2", status: "Active" },
  { id: "sup-2", name: "Royal Dairy Traders", contactPerson: "Suresh M.", phone: "+91 98123 45678", email: "sales@royaldairy.com", address: "Dairy Circle, Bengaluru", gstin: "29CCCFB5678C1Z4", status: "Active" },
  { id: "sup-3", name: "Agro Spice Wholesalers", contactPerson: "Rajesh P.", phone: "+91 97654 32109", email: "agrospices@gmail.com", address: "APMC Market, Yeshwanthpur", gstin: "29DDDFC9012D1Z6", status: "Active" },
];

export const INITIAL_PURCHASES = [];

export const STOCK_AUDIT_LOGS = [];
