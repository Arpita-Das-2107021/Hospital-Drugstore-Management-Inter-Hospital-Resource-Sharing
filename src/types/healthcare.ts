export type UserRole = 'admin' | 'pharmacist' | 'doctor' | 'coordinator' | 'regulator' | 'nurse' | 'technician';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  hospital: string;
  avatar?: string;
}

export interface Employee extends User {
  department: string;
  isOnline: boolean;
  lastSeen?: string;
  phoneNumber?: string;
  specialization?: string;
}

export interface InventoryItem {
  id: string;
  name: string;
  category: string;
  abcClassification: 'A' | 'B' | 'C';
  vedClassification: 'V' | 'E' | 'D';
  currentStock: number;
  reorderLevel: number;
  maxStock: number;
  unitPrice: number;
  expiryDate: string;
  supplier: string;
  lastUpdated: string;
  hospital: string;
}

export interface SharedResource {
  id: string;
  name: string;
  type: 'drugs' | 'blood' | 'organs' | 'equipment';
  hospital: string;
  quantity: number;
  availability: 'available' | 'limited' | 'unavailable';
  isEmergency: boolean;
  region: string;
  lastUpdated: string;
}

export interface ResourceRequest {
  id: string;
  resourceName: string;
  resourceType: 'drugs' | 'blood' | 'organs' | 'equipment';
  requestingHospital: string;
  providingHospital: string;
  quantity: number;
  urgency: 'routine' | 'urgent' | 'critical';
  status: 'pending' | 'approved' | 'in_transit' | 'delivered' | 'rejected';
  justification?: string;
  requestedAt: string;
  updatedAt: string;
}

export interface Alert {
  id: string;
  type: 'shortage' | 'expiry' | 'emergency' | 'substitution';
  severity: 'info' | 'warning' | 'critical';
  title: string;
  message: string;
  hospital: string;
  resourceId?: string;
  isRead: boolean;
  createdAt: string;
}

export interface Message {
  id: string;
  conversationId: string;
  sender: User;
  content: string;
  attachments?: string[];
  caseTag?: string;
  createdAt: string;
}

export interface Conversation {
  id: string;
  participants: User[];
  caseTag?: string;
  lastMessage: string;
  lastMessageAt: string;
  unreadCount: number;
}

export interface RolePermission {
  role: UserRole;
  permissions: {
    inventory: { read: boolean; write: boolean; admin: boolean };
    sharing: { read: boolean; write: boolean; admin: boolean };
    communication: { read: boolean; write: boolean; admin: boolean };
    admin: { read: boolean; write: boolean; admin: boolean };
    reports: { read: boolean; write: boolean; admin: boolean };
  };
}

export interface AuditLog {
  id: string;
  action: string;
  user: string;
  resource: string;
  details: string;
  timestamp: string;
}

export interface ForecastData {
  month: string;
  actual?: number;
  predicted: number;
  lowerBound: number;
  upperBound: number;
}

export interface KPIData {
  stockOutRate: number;
  stockOutTrend: number;
  expiringStock: number;
  expiringTrend: number;
  inventoryTurnover: number;
  turnoverTrend: number;
  pendingRequests: number;
  requestsTrend: number;
}