import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Inventory from "./pages/Inventory";
import InventoryAnalytics from "./pages/InventoryAnalytics";
import InventoryForecast from "./pages/InventoryForecast";
import SharedResources from "./pages/SharedResources";
import RequestWorkflow from "./pages/RequestWorkflow";
import Alerts from "./pages/Alerts";
import Messages from "./pages/Messages";
import RoleManagement from "./pages/RoleManagement";
import DataIntegration from "./pages/DataIntegration";
import Reports from "./pages/Reports";
import NotFound from "./pages/NotFound";
import Hospitals from "./pages/Hospitals";
import HospitalDetails from "./pages/HospitalDetails";
import ResourceDetails from "./pages/ResourceDetails";
import ResourceVisibility from "./pages/ResourceVisibility";
import TransportTracking from "./pages/TransportTracking";
import HospitalTrustProfile from "./pages/HospitalTrustProfile";
import CreditLedger from "./pages/CreditLedger";
import EmergencyBroadcastPage from "./pages/EmergencyBroadcastPage";
import RequestTemplatesPage from "./pages/RequestTemplatesPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="system" storageKey="healthshare-theme">
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/inventory" element={<Inventory />} />
              <Route path="/inventory/analytics" element={<InventoryAnalytics />} />
              <Route path="/inventory/forecast" element={<InventoryForecast />} />
              <Route path="/hospitals" element={<Hospitals />} />
              <Route path="/hospital/:hospitalId" element={<HospitalDetails />} />
              <Route path="/hospital/:hospitalId/profile" element={<HospitalTrustProfile />} />
              <Route path="/resource/:resourceId" element={<ResourceDetails />} />
              <Route path="/sharing" element={<SharedResources />} />
              <Route path="/sharing/requests" element={<RequestWorkflow />} />
              <Route path="/sharing/visibility" element={<ResourceVisibility />} />
              <Route path="/sharing/templates" element={<RequestTemplatesPage />} />
              <Route path="/transport/tracking" element={<TransportTracking />} />
              <Route path="/transport/active" element={<TransportTracking />} /> {/* Alias for tracking */}
              <Route path="/transport/emergency" element={<EmergencyBroadcastPage />} />
              <Route path="/trust/profiles" element={<Hospitals />} /> {/* Use hospitals list */}
              <Route path="/trust/credits" element={<CreditLedger />} />
              <Route path="/trust/performance" element={<HospitalTrustProfile />} />
              <Route path="/credits" element={<CreditLedger />} /> {/* Legacy route */}
              <Route path="/alerts" element={<Alerts />} />
              <Route path="/messages" element={<Messages />} />
              <Route path="/admin/roles" element={<RoleManagement />} />
              <Route path="/admin/data" element={<DataIntegration />} />
              <Route path="/reports" element={<Reports />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;