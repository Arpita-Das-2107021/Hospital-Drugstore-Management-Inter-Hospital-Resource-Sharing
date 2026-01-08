import AppLayout from '@/components/layout/AppLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell, 
  Legend,
  LineChart,
  Line,
  AreaChart,
  Area
} from 'recharts';
import {
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  Clock,
  Package,
  Heart,
  Activity,
  Users,
  Calendar,
  Zap
} from 'lucide-react';
import { 
  daysOfSupplyData,
  clinicalImpactData,
  expiryRiskData,
  emergencyDepletionData,
  responseTimeData,
  fulfillmentTrendData
} from '@/data';

const InventoryAnalytics = () => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'critical': return 'bg-red-100 text-red-800 border-red-300';
      case 'warning': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'good': return 'bg-green-100 text-green-800 border-green-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getTrendIcon = (trend: number) => {
    if (trend > 0) return <TrendingUp className="h-4 w-4 text-green-600" />;
    if (trend < 0) return <TrendingDown className="h-4 w-4 text-red-600" />;
    return <Activity className="h-4 w-4 text-gray-400" />;
  };

  return (
    <AppLayout title="Clinical Analytics" subtitle="Clinical impact metrics and decision-support analytics">
      <div className="flex-1 space-y-6 p-8 pt-6">

        {/* Key Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardContent className="flex items-center p-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <Heart className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">298</p>
                  <p className="text-sm text-muted-foreground">Patients Served</p>
                  <p className="text-xs text-green-600 flex items-center">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    +12% vs last month
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="flex items-center p-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-green-100 rounded-lg">
                  <Activity className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">356</p>
                  <p className="text-sm text-muted-foreground">Procedures Enabled</p>
                  <p className="text-xs text-green-600 flex items-center">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    +18 this month
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="flex items-center p-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-yellow-100 rounded-lg">
                  <AlertTriangle className="h-6 w-6 text-yellow-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">43</p>
                  <p className="text-sm text-muted-foreground">Items Expiring (7d)</p>
                  <p className="text-xs text-red-600 flex items-center">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    +8 vs last week
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="flex items-center p-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-purple-100 rounded-lg">
                  <Zap className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">95.2%</p>
                  <p className="text-sm text-muted-foreground">Avg Fulfillment Rate</p>
                  <p className="text-xs text-green-600 flex items-center">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    +2.1% improvement
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Analytics Tabs */}
        <Tabs defaultValue="clinical" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger 
              value="clinical"
              className="text-muted-foreground dark:text-muted-foreground data-[state=active]:text-blue-500 hover:text-foreground transition-colors"
            >
              Clinical Impact
            </TabsTrigger>
            <TabsTrigger 
              value="supply-chain"
              className="text-muted-foreground dark:text-muted-foreground data-[state=active]:text-blue-500 hover:text-foreground transition-colors"
            >
              Supply Chain
            </TabsTrigger>
            <TabsTrigger 
              value="risk-analysis"
              className="text-muted-foreground dark:text-muted-foreground data-[state=active]:text-blue-500 hover:text-foreground transition-colors"
            >
              Risk Analysis
            </TabsTrigger>
            <TabsTrigger 
              value="performance"
              className="text-muted-foreground dark:text-muted-foreground data-[state=active]:text-blue-500 hover:text-foreground transition-colors"
            >
              Performance
            </TabsTrigger>
          </TabsList>

          {/* Clinical Impact Tab */}
          <TabsContent value="clinical" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Clinical Impact Trend */}
              <Card>
                <CardHeader>
                  <CardTitle>Clinical Impact Trend</CardTitle>
                  <CardDescription>
                    Procedures enabled and patients served through resource sharing
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={clinicalImpactData}>
                        <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: 'hsl(var(--popover))', 
                            color: 'hsl(var(--popover-foreground))',
                            border: '1px solid hsl(var(--border))', 
                            borderRadius: '8px',
                            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
                          }} 
                        />
                        <Line 
                          type="monotone" 
                          dataKey="proceduresEnabled" 
                          stroke="hsl(var(--primary))" 
                          strokeWidth={2}
                          name="Procedures Enabled"
                        />
                        <Line 
                          type="monotone" 
                          dataKey="patientsServed" 
                          stroke="hsl(var(--chart-2))" 
                          strokeWidth={2}
                          name="Patients Served"
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              {/* Days of Supply by Department */}
              <Card>
                <CardHeader>
                  <CardTitle>Days of Supply by Department</CardTitle>
                  <CardDescription>
                    Current stock levels and depletion risk by clinical area
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {daysOfSupplyData.map((dept) => (
                      <div key={dept.category} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <span className="font-medium">{dept.category}</span>
                            <Badge className={getStatusColor(dept.status)}>
                              {dept.days} days
                            </Badge>
                          </div>
                          <div className="flex items-center space-x-1 text-sm">
                            {getTrendIcon(dept.trend)}
                            <span className={dept.trend > 0 ? 'text-green-600' : 'text-red-600'}>
                              {dept.trend > 0 ? '+' : ''}{dept.trend}%
                            </span>
                          </div>
                        </div>
                        <Progress 
                          value={Math.min((dept.days / 30) * 100, 100)} 
                          className="h-2"
                        />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Supply Chain Tab */}
          <TabsContent value="supply-chain" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Expiry Risk Analysis */}
              <Card>
                <CardHeader>
                  <CardTitle>Expiry Risk Analysis</CardTitle>
                  <CardDescription>
                    Items approaching expiration by category and timeframe
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={expiryRiskData}>
                        <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                        <XAxis dataKey="timeframe" />
                        <YAxis />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: 'hsl(var(--popover))', 
                            color: 'hsl(var(--popover-foreground))',
                            border: '1px solid hsl(var(--border))', 
                            borderRadius: '8px',
                            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
                          }} 
                        />
                        <Bar dataKey="medications" fill="hsl(var(--chart-1))" name="Medications" />
                        <Bar dataKey="blood" fill="hsl(var(--chart-2))" name="Blood Products" />
                        <Bar dataKey="supplies" fill="hsl(var(--chart-3))" name="Supplies" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              {/* Response Time Analysis */}
              <Card>
                <CardHeader>
                  <CardTitle>Response Time Performance</CardTitle>
                  <CardDescription>
                    Fulfillment rates by urgency level and SLA compliance
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {responseTimeData.map((item) => (
                    <div key={item.urgency} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-sm">{item.urgency}</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm text-muted-foreground">
                            {item.fulfilled}/{item.total}
                          </span>
                          <Badge className={
                              item.percentage >= 95 ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100' :
                              item.percentage >= 90 ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100' :
                              'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100'
                          }>
                            {item.percentage.toFixed(1)}%
                          </Badge>
                        </div>
                      </div>
                      <Progress value={item.percentage} className="h-2" />
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Risk Analysis Tab */}
          <TabsContent value="risk-analysis" className="space-y-6">
            <div className="grid grid-cols-1 gap-6">
              {/* Emergency Depletion Risk */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <AlertTriangle className="h-5 w-5 text-red-600" />
                    <span>Emergency Depletion Risk</span>
                  </CardTitle>
                  <CardDescription>
                    Resources at critical levels with high depletion rates
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {emergencyDepletionData.map((item) => (
                      <Card key={item.resource} className="border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950/50">
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-medium text-red-900 dark:text-red-100">{item.resource}</p>
                              <p className="text-sm text-red-700 dark:text-red-300">
                                Current: {item.current} | Minimum: {item.minimum} | Rate: {item.depletionRate}/day
                              </p>
                            </div>
                            <div className="text-right">
                              <Badge className="bg-red-100 text-red-800 border-red-300 dark:bg-red-900 dark:text-red-100 dark:border-red-700">
                                {item.daysLeft} days left
                              </Badge>
                              <p className="text-xs text-red-600 dark:text-red-400 mt-1">Critical level</p>
                            </div>
                          </div>
                          <Progress 
                            value={(item.current / item.minimum) * 100} 
                            className="mt-2 h-2" 
                          />
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Performance Tab */}
          <TabsContent value="performance" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Fulfillment Trends */}
              <Card>
                <CardHeader>
                  <CardTitle>Weekly Fulfillment Trends</CardTitle>
                  <CardDescription>
                    Fulfillment rates by urgency level over time
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={fulfillmentTrendData}>
                        <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                        <XAxis dataKey="week" />
                        <YAxis domain={[80, 100]} />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: 'hsl(var(--popover))', 
                            color: 'hsl(var(--popover-foreground))',
                            border: '1px solid hsl(var(--border))', 
                            borderRadius: '8px',
                            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
                          }}
                          formatter={(value) => [`${value}%`, '']}
                        />
                        <Line 
                          type="monotone" 
                          dataKey="emergency" 
                          stroke="#ef4444" 
                          strokeWidth={2}
                          name="Emergency"
                        />
                        <Line 
                          type="monotone" 
                          dataKey="urgent" 
                          stroke="#f59e0b" 
                          strokeWidth={2}
                          name="Urgent"
                        />
                        <Line 
                          type="monotone" 
                          dataKey="routine" 
                          stroke="#10b981" 
                          strokeWidth={2}
                          name="Routine"
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              {/* Network Health */}
              <Card>
                <CardHeader>
                  <CardTitle>Network Health Indicators</CardTitle>
                  <CardDescription>
                    Key performance indicators for the sharing network
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-green-600">94%</p>
                      <p className="text-sm text-muted-foreground">Network Availability</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-blue-600">2.3h</p>
                      <p className="text-sm text-muted-foreground">Avg Response Time</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-purple-600">48</p>
                      <p className="text-sm text-muted-foreground">Active Partners</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-orange-600">€23.4k</p>
                      <p className="text-sm text-muted-foreground">Cost Savings</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
};

export default InventoryAnalytics;