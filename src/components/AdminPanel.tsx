"use client";

import { useState } from "react";
import { 
  LayoutDashboard, 
  Home, 
  Users, 
  Settings, 
  LogOut, 
  Search, 
  Filter,
  Eye,
  Edit,
  Trash2,
  CheckCircle,
  XCircle,
  Clock,
  AlertTriangle,
  TrendingUp,
  BarChart3,
  UserCheck,
  UserX,
  Building,
  MapPin,
  Phone,
  Mail,
  Calendar,
  DollarSign,
  Star,
  MoreHorizontal,
  Download,
  RefreshCw
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface AdminPanelProps {
  onLogout?: () => void;
}

interface Property {
  id: string;
  title: string;
  price: number;
  location: string;
  city: string;
  status: "PENDING" | "ACTIVE" | "INACTIVE" | "SOLD" | "RENTED";
  isApproved: boolean;
  isPromoted: boolean;
  postedAgo: string;
  seller: {
    name: string;
    email: string;
    phone: string;
  };
  views: number;
  inquiries: number;
}

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  isVerified: boolean;
  isBlocked: boolean;
  role: "USER" | "ADMIN" | "MODERATOR";
  joinDate: string;
  propertiesCount: number;
  lastActive: string;
}

interface Report {
  id: string;
  type: "PROPERTY" | "USER";
  reason: string;
  description: string;
  status: "PENDING" | "REVIEWED" | "RESOLVED" | "DISMISSED";
  reportedBy: string;
  target: string;
  createdAt: string;
}

export default function AdminPanel({ onLogout }: AdminPanelProps) {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [propertyFilter, setPropertyFilter] = useState("all");
  const [userFilter, setUserFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Mock data for dashboard
  const dashboardStats = {
    totalProperties: 1247,
    activeProperties: 892,
    pendingApproval: 45,
    totalUsers: 3421,
    verifiedUsers: 2156,
    blockedUsers: 23,
    totalReports: 67,
    pendingReports: 12,
    revenue: 2845000,
  };

  // Mock data for properties
  const properties: Property[] = [
    {
      id: "1",
      title: "Luxury 3BHK Flat in Heart of City",
      price: 8500000,
      location: "Andheri West",
      city: "Mumbai",
      status: "PENDING",
      isApproved: false,
      isPromoted: false,
      postedAgo: "2 hours ago",
      seller: {
        name: "Rajesh Kumar",
        email: "rajesh@email.com",
        phone: "+91 98765 43210",
      },
      views: 245,
      inquiries: 12,
    },
    {
      id: "2",
      title: "2BHK Flat with Balcony",
      price: 6500000,
      location: "Bandra East",
      city: "Mumbai",
      status: "ACTIVE",
      isApproved: true,
      isPromoted: true,
      postedAgo: "1 day ago",
      seller: {
        name: "Priya Sharma",
        email: "priya@email.com",
        phone: "+91 98765 43211",
      },
      views: 567,
      inquiries: 23,
    },
    {
      id: "3",
      title: "Spacious Villa with Garden",
      price: 25000000,
      location: "Koramangala",
      city: "Bangalore",
      status: "ACTIVE",
      isApproved: true,
      isPromoted: false,
      postedAgo: "3 days ago",
      seller: {
        name: "Amit Patel",
        email: "amit@email.com",
        phone: "+91 98765 43212",
      },
      views: 892,
      inquiries: 45,
    },
    {
      id: "4",
      title: "Commercial Office Space",
      price: 45000000,
      location: "Connaught Place",
      city: "Delhi",
      status: "INACTIVE",
      isApproved: true,
      isPromoted: false,
      postedAgo: "1 week ago",
      seller: {
        name: "Business Properties Ltd",
        email: "contact@business.com",
        phone: "+91 98765 43213",
      },
      views: 1234,
      inquiries: 8,
    },
  ];

  // Mock data for users
  const users: User[] = [
    {
      id: "1",
      name: "Rajesh Kumar",
      email: "rajesh@email.com",
      phone: "+91 98765 43210",
      isVerified: true,
      isBlocked: false,
      role: "USER",
      joinDate: "2024-01-15",
      propertiesCount: 12,
      lastActive: "2 hours ago",
    },
    {
      id: "2",
      name: "Priya Sharma",
      email: "priya@email.com",
      phone: "+91 98765 43211",
      isVerified: true,
      isBlocked: false,
      role: "USER",
      joinDate: "2024-02-20",
      propertiesCount: 8,
      lastActive: "1 day ago",
    },
    {
      id: "3",
      name: "Spam User",
      email: "spam@fake.com",
      phone: "+91 98765 43214",
      isVerified: false,
      isBlocked: true,
      role: "USER",
      joinDate: "2024-03-10",
      propertiesCount: 0,
      lastActive: "1 week ago",
    },
    {
      id: "4",
      name: "Admin User",
      email: "admin@propertyhub.com",
      phone: "+91 98765 43215",
      isVerified: true,
      isBlocked: false,
      role: "ADMIN",
      joinDate: "2023-12-01",
      propertiesCount: 0,
      lastActive: "30 minutes ago",
    },
  ];

  // Mock data for reports
  const reports: Report[] = [
    {
      id: "1",
      type: "PROPERTY",
      reason: "Fake Listing",
      description: "The property does not exist and the contact number is fake",
      status: "PENDING",
      reportedBy: "John Doe",
      target: "Luxury 3BHK Flat in Heart of City",
      createdAt: "2024-03-15",
    },
    {
      id: "2",
      type: "USER",
      reason: "Suspicious Activity",
      description: "User is posting multiple fake listings",
      status: "REVIEWED",
      reportedBy: "Jane Smith",
      target: "Spam User",
      createdAt: "2024-03-14",
    },
    {
      id: "3",
      type: "PROPERTY",
      reason: "Inappropriate Content",
      description: "Property description contains inappropriate language",
      status: "RESOLVED",
      reportedBy: "Mike Johnson",
      target: "Commercial Office Space",
      createdAt: "2024-03-13",
    },
  ];

  const formatPrice = (price: number) => {
    if (price >= 10000000) {
      return `₹${(price / 10000000).toFixed(1)} Cr`;
    } else if (price >= 100000) {
      return `₹${(price / 100000).toFixed(1)} L`;
    }
    return `₹${price.toLocaleString()}`;
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      PENDING: { variant: "secondary", icon: Clock, label: "Pending" },
      ACTIVE: { variant: "default", icon: CheckCircle, label: "Active" },
      INACTIVE: { variant: "outline", icon: XCircle, label: "Inactive" },
      SOLD: { variant: "default", icon: CheckCircle, label: "Sold" },
      RENTED: { variant: "default", icon: CheckCircle, label: "Rented" },
    };

    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.PENDING;
    const Icon = config.icon;

    return (
      <Badge variant={config.variant as any} className="flex items-center gap-1">
        <Icon className="h-3 w-3" />
        {config.label}
      </Badge>
    );
  };

  const DashboardTab = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Properties</p>
                <p className="text-2xl font-bold">{dashboardStats.totalProperties.toLocaleString()}</p>
              </div>
              <Building className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Users</p>
                <p className="text-2xl font-bold">{dashboardStats.verifiedUsers.toLocaleString()}</p>
              </div>
              <UserCheck className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending Approval</p>
                <p className="text-2xl font-bold">{dashboardStats.pendingApproval}</p>
              </div>
              <Clock className="h-8 w-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Revenue</p>
                <p className="text-2xl font-bold">₹{(dashboardStats.revenue / 100000).toFixed(1)}L</p>
              </div>
              <DollarSign className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Recent Properties
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {properties.slice(0, 5).map((property) => (
                <div key={property.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex-1">
                    <h4 className="font-medium">{property.title}</h4>
                    <p className="text-sm text-gray-600">{property.location}, {property.city}</p>
                    <p className="text-sm font-medium text-primary">{formatPrice(property.price)}</p>
                  </div>
                  <div className="text-right">
                    {getStatusBadge(property.status)}
                    <p className="text-xs text-gray-500 mt-1">{property.postedAgo}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              Recent Reports
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {reports.slice(0, 5).map((report) => (
                <div key={report.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex-1">
                    <h4 className="font-medium">{report.reason}</h4>
                    <p className="text-sm text-gray-600">{report.target}</p>
                    <p className="text-xs text-gray-500">Reported by {report.reportedBy}</p>
                  </div>
                  <div className="text-right">
                    <Badge variant={report.status === "PENDING" ? "destructive" : "secondary"}>
                      {report.status}
                    </Badge>
                    <p className="text-xs text-gray-500 mt-1">{report.createdAt}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const PropertiesTab = () => (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <Input
            placeholder="Search properties..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <Select value={propertyFilter} onValueChange={setPropertyFilter}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Properties</SelectItem>
            <SelectItem value="pending">Pending Approval</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="inactive">Inactive</SelectItem>
            <SelectItem value="sold">Sold</SelectItem>
            <SelectItem value="rented">Rented</SelectItem>
          </SelectContent>
        </Select>

        <Button variant="outline">
          <Download className="h-4 w-4 mr-2" />
          Export
        </Button>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Property</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Seller</TableHead>
                <TableHead>Views</TableHead>
                <TableHead>Inquiries</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {properties.map((property) => (
                <TableRow key={property.id}>
                  <TableCell>
                    <div>
                      <h4 className="font-medium">{property.title}</h4>
                      <p className="text-sm text-gray-600">{property.postedAgo}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4 text-gray-400" />
                      <span>{property.location}, {property.city}</span>
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">{formatPrice(property.price)}</TableCell>
                  <TableCell>{getStatusBadge(property.status)}</TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">{property.seller.name}</p>
                      <p className="text-sm text-gray-600">{property.seller.email}</p>
                    </div>
                  </TableCell>
                  <TableCell>{property.views}</TableCell>
                  <TableCell>{property.inquiries}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem>
                          <Eye className="h-4 w-4 mr-2" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="h-4 w-4 mr-2" />
                          Edit Property
                        </DropdownMenuItem>
                        {property.status === "PENDING" && (
                          <>
                            <DropdownMenuItem>
                              <CheckCircle className="h-4 w-4 mr-2" />
                              Approve
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <XCircle className="h-4 w-4 mr-2" />
                              Reject
                            </DropdownMenuItem>
                          </>
                        )}
                        <DropdownMenuItem className="text-red-600">
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );

  const UsersTab = () => (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <Input
            placeholder="Search users..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <Select value={userFilter} onValueChange={setUserFilter}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Users</SelectItem>
            <SelectItem value="verified">Verified</SelectItem>
            <SelectItem value="blocked">Blocked</SelectItem>
            <SelectItem value="admin">Admins</SelectItem>
            <SelectItem value="moderator">Moderators</SelectItem>
          </SelectContent>
        </Select>

        <Button variant="outline">
          <Download className="h-4 w-4 mr-2" />
          Export
        </Button>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Properties</TableHead>
                <TableHead>Joined</TableHead>
                <TableHead>Last Active</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={`/api/placeholder/40/40`} />
                        <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h4 className="font-medium">{user.name}</h4>
                        <div className="flex items-center gap-1">
                          {user.isVerified && <CheckCircle className="h-3 w-3 text-green-500" />}
                          {user.isBlocked && <XCircle className="h-3 w-3 text-red-500" />}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="flex items-center gap-1">
                        <Mail className="h-3 w-3 text-gray-400" />
                        {user.email}
                      </p>
                      <p className="flex items-center gap-1 text-sm text-gray-600">
                        <Phone className="h-3 w-3 text-gray-400" />
                        {user.phone}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>
                    {user.isBlocked ? (
                      <Badge variant="destructive">Blocked</Badge>
                    ) : user.isVerified ? (
                      <Badge variant="default">Verified</Badge>
                    ) : (
                      <Badge variant="secondary">Unverified</Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    <Badge variant={user.role === "ADMIN" ? "destructive" : user.role === "MODERATOR" ? "default" : "secondary"}>
                      {user.role}
                    </Badge>
                  </TableCell>
                  <TableCell>{user.propertiesCount}</TableCell>
                  <TableCell>{user.joinDate}</TableCell>
                  <TableCell>{user.lastActive}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem>
                          <Eye className="h-4 w-4 mr-2" />
                          View Profile
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="h-4 w-4 mr-2" />
                          Edit User
                        </DropdownMenuItem>
                        {!user.isVerified && (
                          <DropdownMenuItem>
                            <CheckCircle className="h-4 w-4 mr-2" />
                            Verify User
                          </DropdownMenuItem>
                        )}
                        {user.isBlocked ? (
                          <DropdownMenuItem>
                            <UserCheck className="h-4 w-4 mr-2" />
                            Unblock User
                          </DropdownMenuItem>
                        ) : (
                          <DropdownMenuItem className="text-red-600">
                            <UserX className="h-4 w-4 mr-2" />
                            Block User
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuItem className="text-red-600">
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete User
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );

  const ReportsTab = () => (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <Input
            placeholder="Search reports..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        <Button variant="outline">
          <RefreshCw className="h-4 w-4 mr-2" />
          Refresh
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-red-600 mb-2">{dashboardStats.totalReports}</div>
              <p className="text-sm text-gray-600">Total Reports</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-600 mb-2">{dashboardStats.pendingReports}</div>
              <p className="text-sm text-gray-600">Pending Review</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">{dashboardStats.totalReports - dashboardStats.pendingReports}</div>
              <p className="text-sm text-gray-600">Resolved</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Type</TableHead>
                <TableHead>Reason</TableHead>
                <TableHead>Target</TableHead>
                <TableHead>Reported By</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {reports.map((report) => (
                <TableRow key={report.id}>
                  <TableCell>
                    <Badge variant={report.type === "PROPERTY" ? "default" : "secondary"}>
                      {report.type}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div>
                      <h4 className="font-medium">{report.reason}</h4>
                      <p className="text-sm text-gray-600">{report.description}</p>
                    </div>
                  </TableCell>
                  <TableCell>{report.target}</TableCell>
                  <TableCell>{report.reportedBy}</TableCell>
                  <TableCell>
                    <Badge variant={
                      report.status === "PENDING" ? "destructive" :
                      report.status === "RESOLVED" ? "default" : "secondary"
                    }>
                      {report.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{report.createdAt}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem>
                          <Eye className="h-4 w-4 mr-2" />
                          View Details
                        </DropdownMenuItem>
                        {report.status === "PENDING" && (
                          <>
                            <DropdownMenuItem>
                              <CheckCircle className="h-4 w-4 mr-2" />
                              Mark as Resolved
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <XCircle className="h-4 w-4 mr-2" />
                              Dismiss
                            </DropdownMenuItem>
                          </>
                        )}
                        <DropdownMenuItem className="text-red-600">
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete Report
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center space-x-2">
              <LayoutDashboard className="h-8 w-8 text-primary" />
              <h1 className="text-2xl font-bold text-primary">Admin Panel</h1>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <div className="text-sm font-medium">Admin User</div>
              <div className="text-xs text-gray-500">admin@propertyhub.com</div>
            </div>
            <Avatar>
              <AvatarImage src="/api/placeholder/40/40" />
              <AvatarFallback>AD</AvatarFallback>
            </Avatar>
            <Button variant="outline" size="sm" onClick={onLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-white border-r min-h-screen">
          <nav className="p-4 space-y-2">
            <Button
              variant={activeTab === "dashboard" ? "default" : "ghost"}
              className="w-full justify-start"
              onClick={() => setActiveTab("dashboard")}
            >
              <LayoutDashboard className="h-4 w-4 mr-2" />
              Dashboard
            </Button>
            
            <Button
              variant={activeTab === "properties" ? "default" : "ghost"}
              className="w-full justify-start"
              onClick={() => setActiveTab("properties")}
            >
              <Building className="h-4 w-4 mr-2" />
              Properties
            </Button>
            
            <Button
              variant={activeTab === "users" ? "default" : "ghost"}
              className="w-full justify-start"
              onClick={() => setActiveTab("users")}
            >
              <Users className="h-4 w-4 mr-2" />
              Users
            </Button>
            
            <Button
              variant={activeTab === "reports" ? "default" : "ghost"}
              className="w-full justify-start"
              onClick={() => setActiveTab("reports")}
            >
              <AlertTriangle className="h-4 w-4 mr-2" />
              Reports
            </Button>
            
            <Separator className="my-4" />
            
            <Button
              variant="ghost"
              className="w-full justify-start"
              onClick={onLogout}
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6">
          {activeTab === "dashboard" && <DashboardTab />}
          {activeTab === "properties" && <PropertiesTab />}
          {activeTab === "users" && <UsersTab />}
          {activeTab === "reports" && <ReportsTab />}
        </div>
      </div>
    </div>
  );
}