import { AppLayout } from '@/components/layout/AppLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Download, FileText, Calendar } from 'lucide-react';
import { mockInventory } from '@/data/mockData';

const Reports = () => {
  return (
    <AppLayout title="Reports & KPIs" subtitle="Generate and export reports">
      <div className="space-y-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-base">Report Generator</CardTitle>
            <div className="flex gap-2">
              <Select defaultValue="inventory"><SelectTrigger className="w-40"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="inventory">Inventory</SelectItem><SelectItem value="sharing">Sharing</SelectItem><SelectItem value="forecast">Forecasting</SelectItem></SelectContent></Select>
              <Button variant="outline"><Calendar className="mr-2 h-4 w-4" />Date Range</Button>
              <Button><Download className="mr-2 h-4 w-4" />Export PDF</Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-4 mb-6">
              <Card><CardContent className="p-4 text-center"><p className="text-2xl font-bold">12</p><p className="text-sm text-muted-foreground">Total Items</p></CardContent></Card>
              <Card><CardContent className="p-4 text-center"><p className="text-2xl font-bold">$45,230</p><p className="text-sm text-muted-foreground">Total Value</p></CardContent></Card>
              <Card><CardContent className="p-4 text-center"><p className="text-2xl font-bold">3</p><p className="text-sm text-muted-foreground">Low Stock</p></CardContent></Card>
              <Card><CardContent className="p-4 text-center"><p className="text-2xl font-bold">2</p><p className="text-sm text-muted-foreground">Expiring Soon</p></CardContent></Card>
            </div>
            <Table>
              <TableHeader><TableRow><TableHead>Item</TableHead><TableHead>Category</TableHead><TableHead>Stock</TableHead><TableHead>Value</TableHead><TableHead>Status</TableHead></TableRow></TableHeader>
              <TableBody>
                {mockInventory.slice(0, 6).map(item => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.name}</TableCell>
                    <TableCell>{item.category}</TableCell>
                    <TableCell>{item.currentStock}</TableCell>
                    <TableCell>${(item.currentStock * item.unitPrice).toFixed(2)}</TableCell>
                    <TableCell>{item.currentStock <= item.reorderLevel ? '⚠️ Low' : '✓ OK'}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
};

export default Reports;