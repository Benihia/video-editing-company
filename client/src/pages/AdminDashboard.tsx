import React, { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import { useQuery } from '@tanstack/react-query';
import { formatCurrency } from '@/lib/utils';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Order } from '@shared/schema';
import { Search, Download, FileText, DollarSign, Users } from 'lucide-react';

export default function AdminDashboard() {
  const [searchTerm, setSearchTerm] = useState('');

  const { data: orders, isLoading, error } = useQuery<Order[]>({
    queryKey: ['/api/orders'],
  });

  const filteredOrders = orders?.filter(order => {
    if (!searchTerm) return true;
    
    const searchTermLower = searchTerm.toLowerCase();
    return (
      order.name.toLowerCase().includes(searchTermLower) ||
      order.email.toLowerCase().includes(searchTermLower) ||
      order.orderRef.toLowerCase().includes(searchTermLower) ||
      order.videoType.toLowerCase().includes(searchTermLower)
    );
  });

  const totalRevenue = orders?.reduce((sum, order) => sum + order.totalPrice, 0) || 0;
  const averageOrderValue = orders?.length ? totalRevenue / orders.length : 0;
  
  return (
    <Layout>
      <div className="pt-28 pb-20 bg-gradient-to-b from-cine-black to-cine-gray-700 min-h-screen">
        <div className="container mx-auto px-6">
          <div className="flex flex-col xl:flex-row justify-between items-start mb-6 gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold">Admin Dashboard</h1>
              <p className="text-cine-gray-300 mt-2">Manage and monitor your video editing orders</p>
            </div>
            
            <div className="w-full xl:w-auto">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-cine-gray-300" />
                <input
                  type="text"
                  placeholder="Search orders..."
                  className="w-full xl:w-80 pl-10 pr-4 py-2 bg-cine-gray-700 border border-cine-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-cine-gold focus:border-cine-gold"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </div>
          
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="bg-secondary/70 border-white/10">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-cine-gray-300">Total Orders</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <FileText className="h-5 w-5 text-cine-gold mr-2" />
                  <div className="text-2xl font-bold">{orders?.length || 0}</div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-secondary/70 border-white/10">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-cine-gray-300">Total Revenue</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <DollarSign className="h-5 w-5 text-cine-gold mr-2" />
                  <div className="text-2xl font-bold">{formatCurrency(totalRevenue)}</div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-secondary/70 border-white/10">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-cine-gray-300">Avg. Order Value</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <DollarSign className="h-5 w-5 text-cine-gold mr-2" />
                  <div className="text-2xl font-bold">{formatCurrency(averageOrderValue)}</div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-secondary/70 border-white/10">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-cine-gray-300">Total Customers</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <Users className="h-5 w-5 text-cine-gold mr-2" />
                  <div className="text-2xl font-bold">
                    {new Set(orders?.map(order => order.email)).size || 0}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="bg-secondary/50 border border-white/10 mb-6">
              <TabsTrigger value="all">All Orders</TabsTrigger>
              <TabsTrigger value="recent">Recent Orders</TabsTrigger>
              <TabsTrigger value="high-value">High Value</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all" className="mt-0">
              {renderOrdersTable(filteredOrders, isLoading, error)}
            </TabsContent>
            
            <TabsContent value="recent" className="mt-0">
              {renderOrdersTable(
                filteredOrders?.slice(0, 10), 
                isLoading, 
                error
              )}
            </TabsContent>
            
            <TabsContent value="high-value" className="mt-0">
              {renderOrdersTable(
                filteredOrders?.filter(order => order.totalPrice >= 1000).sort((a, b) => b.totalPrice - a.totalPrice), 
                isLoading, 
                error
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
}

function renderOrdersTable(orders?: Order[], isLoading?: boolean, error?: unknown) {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cine-gold"></div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="bg-red-900/20 text-red-300 p-4 rounded-md">
        <p>Error loading orders. Please try again later.</p>
      </div>
    );
  }
  
  if (!orders?.length) {
    return (
      <div className="bg-secondary/50 border border-white/10 rounded-lg p-8 text-center">
        <p className="text-cine-gray-300">No orders found.</p>
      </div>
    );
  }
  
  return (
    <div className="rounded-md border border-white/10 overflow-hidden">
      <Table>
        <TableHeader className="bg-secondary/70">
          <TableRow>
            <TableHead>Order Ref</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>Video Type</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Amount</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.id} className="border-white/5 hover:bg-white/5">
              <TableCell className="font-medium">{order.orderRef}</TableCell>
              <TableCell>
                <div>{order.name}</div>
                <div className="text-sm text-cine-gray-300">{order.email}</div>
              </TableCell>
              <TableCell>{order.videoType}</TableCell>
              <TableCell>{new Date(order.createdAt).toLocaleDateString()}</TableCell>
              <TableCell className="text-right">{formatCurrency(order.totalPrice)}</TableCell>
              <TableCell className="text-right">
                <button className="p-2 hover:bg-cine-gold/20 rounded-full transition-colors" title="Download order details">
                  <Download className="h-4 w-4" />
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
