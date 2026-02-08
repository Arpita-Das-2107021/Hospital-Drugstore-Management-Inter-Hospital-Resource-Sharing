import { AppLayout } from '@/components/layout/AppLayout';
import { useLanguage } from '@/components/layout/LanguageToggle';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  TrendingDown,
  TrendingUp,
  AlertTriangle,
  Package,
  RefreshCcw,
  Clock,
  ArrowRight,
  Activity
} from 'lucide-react';
import { mockKPIData, mockAlerts, trendData } from '@/data/mockData';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { Link } from 'react-router-dom';

const KPICard = ({ 
  title, 
  value, 
  unit, 
  trend, 
  trendLabel,
  icon: Icon,
  variant = 'default'
}: { 
  title: string; 
  value: number | string; 
  unit?: string;
  trend: number; 
  trendLabel: string;
  icon: React.ComponentType<{ className?: string }>;
  variant?: 'default' | 'warning' | 'success' | 'critical';
}) => {
  const isPositive = trend > 0;
  const TrendIcon = isPositive ? TrendingUp : TrendingDown;
  
  const variantStyles = {
    default: 'bg-card',
    warning: 'bg-warning/5 border-warning/20',
    success: 'bg-success/5 border-success/20',
    critical: 'bg-critical/5 border-critical/20',
  };

  return (
    <Card className={variantStyles[variant]}>
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-bold">{value}</span>
              {unit && <span className="text-lg text-muted-foreground">{unit}</span>}
            </div>
            <div className={`flex items-center gap-1 text-sm ${isPositive ? 'text-destructive' : 'text-success'}`}>
              <TrendIcon className="h-4 w-4" />
              <span>{Math.abs(trend)}% {trendLabel}</span>
            </div>
          </div>
          <div className="rounded-lg bg-primary/10 p-3">
            <Icon className="h-6 w-6 text-primary" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const Dashboard = () => {
  const criticalAlerts = mockAlerts.filter(a => a.severity === 'critical' && !a.isRead);
  const { t } = useLanguage();

  return (
    <AppLayout title={t('nav.dashboard')} subtitle={t('dashboard.overview')}>
      <div className="space-y-6">
        {/* KPI Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <KPICard
            title="Stock-out Rate"
            value={mockKPIData.stockOutRate}
            unit="%"
            trend={mockKPIData.stockOutTrend}
            trendLabel="vs last month"
            icon={AlertTriangle}
            variant={mockKPIData.stockOutRate > 3 ? 'critical' : 'success'}
          />
          <KPICard
            title="Expiring Stock"
            value={mockKPIData.expiringStock}
            unit="items"
            trend={mockKPIData.expiringTrend}
            trendLabel="this week"
            icon={Clock}
            variant={mockKPIData.expiringStock > 5 ? 'warning' : 'default'}
          />
          <KPICard
            title="Inventory Turnover"
            value={mockKPIData.inventoryTurnover}
            unit="x"
            trend={mockKPIData.turnoverTrend}
            trendLabel="improvement"
            icon={RefreshCcw}
            variant="success"
          />
          <KPICard
            title="Pending Requests"
            value={mockKPIData.pendingRequests}
            trend={mockKPIData.requestsTrend}
            trendLabel="vs yesterday"
            icon={Package}
          />
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Trend Chart */}
          <Card className="lg:col-span-2">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-base font-medium">Weekly Trends</CardTitle>
              <Button variant="ghost" size="sm" asChild>
                <Link to="/reports">View Reports <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={trendData}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis dataKey="name" className="text-xs" />
                    <YAxis className="text-xs" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--card))', 
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px'
                      }} 
                    />
                    <Line 
                      type="monotone" 
                      dataKey="requests" 
                      stroke="hsl(var(--chart-1))" 
                      strokeWidth={2}
                      dot={{ fill: 'hsl(var(--chart-1))' }}
                      name="Requests"
                    />
                    <Line 
                      type="monotone" 
                      dataKey="transfers" 
                      stroke="hsl(var(--chart-2))" 
                      strokeWidth={2}
                      dot={{ fill: 'hsl(var(--chart-2))' }}
                      name="Transfers"
                    />
                    <Line 
                      type="monotone" 
                      dataKey="stockOuts" 
                      stroke="hsl(var(--chart-3))" 
                      strokeWidth={2}
                      dot={{ fill: 'hsl(var(--chart-3))' }}
                      name="Stock Outs"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Alerts Panel */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-base font-medium">Critical Alerts</CardTitle>
              <Badge variant="destructive">{criticalAlerts.length}</Badge>
            </CardHeader>
            <CardContent className="space-y-3">
              {criticalAlerts.slice(0, 4).map((alert) => (
                <div 
                  key={alert.id} 
                  className="flex items-start gap-3 rounded-lg border border-destructive/20 bg-destructive/5 p-3"
                >
                  <AlertTriangle className="mt-0.5 h-4 w-4 text-destructive shrink-0" />
                  <div className="space-y-1 min-w-0">
                    <p className="text-sm font-medium leading-tight">{alert.title}</p>
                    <p className="text-xs text-muted-foreground line-clamp-2">{alert.message}</p>
                  </div>
                </div>
              ))}
              <Button variant="outline" className="w-full" size="sm" asChild>
                <Link to="/alerts">View All Alerts</Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Link to="/inventory">
            <Card className="cursor-pointer transition-all hover:border-primary hover:shadow-md">
              <CardContent className="flex items-center gap-4 p-6">
                <div className="rounded-lg bg-chart-1/10 p-3">
                  <Package className="h-6 w-6 text-chart-1" />
                </div>
                <div>
                  <p className="font-medium">Manage Inventory</p>
                  <p className="text-sm text-muted-foreground">View stock levels</p>
                </div>
              </CardContent>
            </Card>
          </Link>
          <Link to="/sharing/requests">
            <Card className="cursor-pointer transition-all hover:border-primary hover:shadow-md">
              <CardContent className="flex items-center gap-4 p-6">
                <div className="rounded-lg bg-chart-2/10 p-3">
                  <RefreshCcw className="h-6 w-6 text-chart-2" />
                </div>
                <div>
                  <p className="font-medium">Resource Requests</p>
                  <p className="text-sm text-muted-foreground">3 pending approvals</p>
                </div>
              </CardContent>
            </Card>
          </Link>
          <Link to="/inventory/forecast">
            <Card className="cursor-pointer transition-all hover:border-primary hover:shadow-md">
              <CardContent className="flex items-center gap-4 p-6">
                <div className="rounded-lg bg-chart-4/10 p-3">
                  <Activity className="h-6 w-6 text-chart-4" />
                </div>
                <div>
                  <p className="font-medium">Demand Forecast</p>
                  <p className="text-sm text-muted-foreground">AI predictions</p>
                </div>
              </CardContent>
            </Card>
          </Link>
          <Link to="/reports">
            <Card className="cursor-pointer transition-all hover:border-primary hover:shadow-md">
              <CardContent className="flex items-center gap-4 p-6">
                <div className="rounded-lg bg-chart-5/10 p-3">
                  <TrendingUp className="h-6 w-6 text-chart-5" />
                </div>
                <div>
                  <p className="font-medium">Generate Reports</p>
                  <p className="text-sm text-muted-foreground">Analytics & KPIs</p>
                </div>
              </CardContent>
            </Card>
          </Link>
        </div>
      </div>
    </AppLayout>
  );
};

export default Dashboard;