import { AppLayout } from '@/components/layout/AppLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Filter, AlertTriangle, Clock } from 'lucide-react';
import { mockInventory, categories } from '@/data/mockData';
import { useState } from 'react';

const Inventory = () => {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');

  const filtered = mockInventory.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === 'all' || item.category === category;
    return matchesSearch && matchesCategory;
  });

  const getStockStatus = (current: number, reorder: number, max: number) => {
    const ratio = current / max;
    if (current <= reorder) return { label: 'Low', variant: 'destructive' as const };
    if (ratio < 0.4) return { label: 'Medium', variant: 'warning' as const };
    return { label: 'Good', variant: 'success' as const };
  };

  const isExpiringSoon = (date: string) => {
    const expiry = new Date(date);
    const now = new Date();
    const diffDays = Math.ceil((expiry.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    return diffDays <= 90;
  };

  return (
    <AppLayout title="Inventory Management" subtitle="View and manage stock levels">
      <div className="space-y-6">
        <Card>
          <CardHeader className="pb-4">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <CardTitle className="text-base">Stock List</CardTitle>
              <div className="flex gap-2">
                <div className="relative flex-1 sm:w-64">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input placeholder="Search items..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
                </div>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger className="w-40"><Filter className="mr-2 h-4 w-4" /><SelectValue placeholder="Category" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {categories.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Item Name</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>ABC-VED</TableHead>
                  <TableHead>Stock</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Expiry</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((item) => {
                  const status = getStockStatus(item.currentStock, item.reorderLevel, item.maxStock);
                  const expiring = isExpiringSoon(item.expiryDate);
                  return (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">{item.name}</TableCell>
                      <TableCell>{item.category}</TableCell>
                      <TableCell><Badge variant="outline">{item.abcClassification}-{item.vedClassification}</Badge></TableCell>
                      <TableCell>{item.currentStock.toLocaleString()} / {item.maxStock.toLocaleString()}</TableCell>
                      <TableCell><Badge variant={status.variant === 'success' ? 'default' : status.variant === 'warning' ? 'secondary' : 'destructive'}>{status.label}</Badge></TableCell>
                      <TableCell className={expiring ? 'text-warning' : ''}>{expiring && <Clock className="inline mr-1 h-3 w-3" />}{new Date(item.expiryDate).toLocaleDateString()}</TableCell>
                      <TableCell><Button variant="ghost" size="sm">View</Button></TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
};

export default Inventory;