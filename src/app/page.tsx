"use client";

import { useState } from "react";
import {
  Search,
  MapPin,
  Home,
  Building,
  Landmark,
  Users,
  Car,
  Filter,
  Grid,
  List,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PropertyListings from "@/components/PropertyListings";
import PropertyDetail from "@/components/PropertyDetail";
import PostPropertyWizard from "@/components/PostPropertyWizard";
import AuthModal from "@/components/AuthModal";
import AdminPanel from "@/components/AdminPanel";

// Utility function for consistent number formatting
const formatPrice = (price: number): string => {
  return new Intl.NumberFormat("en-IN").format(price);
};

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [location, setLocation] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [currentView, setCurrentView] = useState<
    "home" | "listings" | "detail" | "post" | "admin"
  >("home");
  const [selectedPropertyId, setSelectedPropertyId] = useState<string | null>(
    null
  );
  const [user, setUser] = useState<any>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  // Mock data for categories
  const categories = [
    { id: 1, name: "Flats", icon: Building, count: 1234 },
    { id: 2, name: "Houses", icon: Home, count: 856 },
    { id: 3, name: "Plots", icon: Landmark, count: 432 },
    { id: 4, name: "PG/Hostels", icon: Users, count: 267 },
    { id: 5, name: "Commercial", icon: Building, count: 189 },
    { id: 6, name: "Parking", icon: Car, count: 94 },
  ];

  // Mock data for promoted properties
  const promotedProperties = [
    {
      id: 1,
      title: "Luxury 3BHK Flat in Heart of City",
      price: 8500000,
      location: "Andheri West, Mumbai",
      area: 1200,
      bedrooms: 3,
      bathrooms: 2,
      image: "/api/placeholder/400/300",
      isNegotiable: true,
      postedAgo: "2 hours ago",
    },
    {
      id: 2,
      title: "Spacious Villa with Garden",
      price: 25000000,
      location: "Koramangala, Bangalore",
      area: 2500,
      bedrooms: 4,
      bathrooms: 3,
      image: "/api/placeholder/400/300",
      isNegotiable: false,
      postedAgo: "5 hours ago",
    },
    {
      id: 3,
      title: "Modern Commercial Office Space",
      price: 45000000,
      location: "Connaught Place, Delhi",
      area: 3000,
      bedrooms: 0,
      bathrooms: 2,
      image: "/api/placeholder/400/300",
      isNegotiable: true,
      postedAgo: "1 day ago",
    },
  ];

  // Mock data for nearby properties
  const nearbyProperties = [
    {
      id: 4,
      title: "2BHK Flat with Balcony",
      price: 6500000,
      location: "Bandra East, Mumbai",
      area: 950,
      bedrooms: 2,
      bathrooms: 1,
      image: "/api/placeholder/300/200",
      isNegotiable: true,
      postedAgo: "30 minutes ago",
    },
    {
      id: 5,
      title: "1RK Studio Apartment",
      price: 3500000,
      location: "Powai, Mumbai",
      area: 450,
      bedrooms: 1,
      bathrooms: 1,
      image: "/api/placeholder/300/200",
      isNegotiable: false,
      postedAgo: "1 hour ago",
    },
    {
      id: 6,
      title: "3BHK Premium Flat",
      price: 12000000,
      location: "Juhu, Mumbai",
      area: 1500,
      bedrooms: 3,
      bathrooms: 2,
      image: "/api/placeholder/300/200",
      isNegotiable: true,
      postedAgo: "3 hours ago",
    },
    {
      id: 7,
      title: "Independent House",
      price: 18000000,
      location: "Thane, Mumbai",
      area: 2000,
      bedrooms: 4,
      bathrooms: 3,
      image: "/api/placeholder/300/200",
      isNegotiable: true,
      postedAgo: "4 hours ago",
    },
  ];

  const handleAuthSuccess = (loggedInUser: any) => {
    // For testing purposes, let's make the first user an admin
    if (
      loggedInUser.email === "admin@propertyhub.com" ||
      loggedInUser.name === "Admin User"
    ) {
      loggedInUser.role = "ADMIN";
    }
    setUser(loggedInUser);
  };

  const handleLogout = () => {
    setUser(null);
  };

  // Mock data for property detail
  const mockPropertyDetail = {
    id: "1",
    title: "Luxury 3BHK Flat in Heart of City",
    description: `This spacious and luxurious 3BHK flat is located in the prime area of Andheri West, Mumbai. The apartment offers modern living with premium amenities and excellent connectivity.

Key Features:
- Spacious living room with large windows for natural light
- Modern kitchen with premium fittings and appliances
- Master bedroom with attached bathroom and walk-in closet
- Two additional bedrooms with built-in wardrobes
- Balcony with city view
- 24/7 security and power backup
- Dedicated parking space
- Access to swimming pool, gym, and community hall
- Children's play area and landscaped gardens

The property is well-connected to schools, hospitals, shopping centers, and public transportation. The neighborhood is safe and family-friendly with all necessary amenities within walking distance.

Ideal for families looking for a comfortable and luxurious lifestyle in the heart of the city.`,
    price: 8500000,
    isNegotiable: true,
    area: 1200,
    areaUnit: "SQ_FT",
    location: "Andheri West",
    city: "Mumbai",
    state: "Maharashtra",
    pincode: "400053",
    latitude: 19.1196,
    longitude: 72.8465,
    bedrooms: 3,
    bathrooms: 2,
    parking: 1,
    furnishing: "SEMI_FURNISHED",
    amenities: [
      "Swimming Pool",
      "Gym",
      "Power Backup",
      "24/7 Security",
      "Lift",
      "Park",
      "Community Hall",
      "Children's Play Area",
    ],
    images: [
      "/api/placeholder/800/600",
      "/api/placeholder/800/600",
      "/api/placeholder/800/600",
      "/api/placeholder/800/600",
      "/api/placeholder/800/600",
    ],
    postedAgo: "2 hours ago",
    seller: {
      id: "seller1",
      name: "Rajesh Kumar",
      avatar: "/api/placeholder/100/100",
      isVerified: true,
      joinDate: "January 2022",
      phone: "+91 98765 43210",
      rating: 4.8,
      totalProperties: 12,
    },
    isPromoted: true,
    status: "ACTIVE",
  };

  // Mock data for similar properties
  const mockSimilarProperties = [
    {
      id: "2",
      title: "2BHK Flat with Balcony",
      price: 6500000,
      area: 950,
      location: "Bandra East",
      image: "/api/placeholder/400/300",
      bedrooms: 2,
      bathrooms: 1,
    },
    {
      id: "3",
      title: "3BHK Premium Flat",
      price: 12000000,
      area: 1500,
      location: "Juhu",
      image: "/api/placeholder/400/300",
      bedrooms: 3,
      bathrooms: 2,
    },
    {
      id: "4",
      title: "Spacious 4BHK Villa",
      price: 25000000,
      area: 2500,
      location: "Malad",
      image: "/api/placeholder/400/300",
      bedrooms: 4,
      bathrooms: 3,
    },
  ];

  const PropertyCard = ({ property }: { property: any }) => (
    <Card
      className="overflow-hidden hover:shadow-lg transition-shadow duration-200 cursor-pointer"
      onClick={() => {
        setSelectedPropertyId(property.id);
        setCurrentView("detail");
      }}
    >
      <div className="relative">
        <img
          src={property.image}
          alt={property.title}
          className="w-full h-48 object-cover"
        />
        {property.isNegotiable && (
          <Badge className="absolute top-2 left-2 bg-green-500 hover:bg-green-600">
            Negotiable
          </Badge>
        )}
      </div>
      <CardContent className="p-4">
        <h3 className="font-semibold text-lg mb-2 line-clamp-2">
          {property.title}
        </h3>
        <div className="flex items-center text-sm text-gray-600 mb-2">
          <MapPin className="h-4 w-4 mr-1" />
          <span className="line-clamp-1">{property.location}</span>
        </div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-xl font-bold text-primary">
            ₹{formatPrice(property.price)}
          </span>
          <span className="text-sm text-gray-500">
            {formatPrice(property.area)} sq ft
          </span>
        </div>
        <div className="flex items-center gap-4 text-sm text-gray-600">
          {property.bedrooms > 0 && <span>{property.bedrooms} BHK</span>}
          {property.bathrooms > 0 && <span>{property.bathrooms} Bath</span>}
        </div>
        <div className="flex items-center justify-between mt-3">
          <span className="text-xs text-gray-500">{property.postedAgo}</span>
          <Button
            size="sm"
            variant="outline"
            onClick={(e) => {
              e.stopPropagation();
              setSelectedPropertyId(property.id);
              setCurrentView("detail");
            }}
          >
            View Details
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div>
      {currentView === "home" ? (
        <div className="min-h-screen bg-gray-50">
          {/* Header */}
          <header className="bg-white shadow-sm sticky top-0 z-10">
            <div className="container mx-auto px-4 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Home className="h-8 w-8 text-primary" />
                  <h1 className="text-2xl font-bold text-primary">
                    PropertyHub
                  </h1>
                </div>
                <div className="flex items-center space-x-2">
                  {user ? (
                    <div className="flex items-center gap-3">
                      <div className="text-right hidden sm:block">
                        <div className="text-sm font-medium">{user.name}</div>
                        <div className="text-xs text-gray-500">
                          {user.email || user.phone}
                        </div>
                      </div>
                      <div className="relative">
                        <div className="h-8 w-8 bg-primary rounded-full flex items-center justify-center text-white text-sm font-medium">
                          {user.name.charAt(0).toUpperCase()}
                        </div>
                      </div>
                      {user.role === "ADMIN" && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setCurrentView("admin")}
                        >
                          Admin Panel
                        </Button>
                      )}
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleLogout}
                      >
                        Logout
                      </Button>
                    </div>
                  ) : (
                    <>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setIsAuthModalOpen(true)}
                      >
                        Login
                      </Button>
                      {user ? (
                        <Button
                          size="sm"
                          onClick={() => setCurrentView("post")}
                        >
                          Post Property
                        </Button>
                      ) : (
                        <Button
                          size="sm"
                          onClick={() => setIsAuthModalOpen(true)}
                        >
                          Post Property
                        </Button>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>
          </header>

          {/* Hero Section with Search */}
          <section className="bg-primary text-white py-12">
            <div className="container mx-auto px-4">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-4">
                  Find Your Dream Property
                </h2>
                <p className="text-lg opacity-90">
                  Discover thousands of properties across India
                </p>
              </div>

              <div className="max-w-4xl mx-auto">
                <div className="bg-white rounded-lg shadow-lg p-2 flex flex-col sm:flex-row gap-2">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Input
                      placeholder="Search properties, location, or keywords..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 border-0 focus:ring-0 text-gray-900"
                    />
                  </div>
                  <div className="flex-1 relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Input
                      placeholder="Enter location..."
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="pl-10 border-0 focus:ring-0 text-gray-900"
                    />
                  </div>
                  <Button
                    className="bg-primary hover:bg-primary/90 text-white px-8"
                    onClick={() => setCurrentView("listings")}
                  >
                    Search
                  </Button>
                </div>
              </div>
            </div>
          </section>

          {/* Categories Section */}
          <section className="py-12">
            <div className="container mx-auto px-4">
              <h2 className="text-2xl font-bold mb-6">Browse Categories</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
                {categories.map((category) => {
                  const Icon = category.icon;
                  return (
                    <Card
                      key={category.id}
                      className="cursor-pointer hover:shadow-md transition-shadow duration-200"
                    >
                      <CardContent className="p-4 text-center">
                        <Icon className="h-8 w-8 mx-auto mb-2 text-primary" />
                        <h3 className="font-semibold">{category.name}</h3>
                        <p className="text-sm text-gray-500">
                          {formatPrice(category.count)} properties
                        </p>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          </section>

          {/* Promoted Properties Carousel */}
          <section className="py-12 bg-white">
            <div className="container mx-auto px-4">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">Promoted Properties</h2>
                <Badge variant="secondary">Featured</Badge>
              </div>

              <Carousel className="w-full">
                <CarouselContent className="-ml-2 md:-ml-4">
                  {promotedProperties.map((property) => (
                    <CarouselItem
                      key={property.id}
                      className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3"
                    >
                      <PropertyCard property={property} />
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
            </div>
          </section>

          {/* Nearby Properties Section */}
          <section className="py-12">
            <div className="container mx-auto px-4">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">Nearby Properties</h2>
                <div className="flex items-center gap-2">
                  <Button
                    variant={viewMode === "grid" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setViewMode("grid")}
                  >
                    <Grid className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setViewMode("list")}
                  >
                    <List className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Filter className="h-4 w-4 mr-2" />
                    Filters
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentView("listings")}
                  >
                    View All
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              </div>

              <div
                className={
                  viewMode === "grid"
                    ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                    : "space-y-4"
                }
              >
                {nearbyProperties.map((property) => (
                  <PropertyCard key={property.id} property={property} />
                ))}
              </div>

              <div className="text-center mt-8">
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => setCurrentView("listings")}
                >
                  View All Properties
                </Button>
              </div>
            </div>
          </section>

          {/* Footer */}
          <footer className="bg-gray-800 text-white py-8">
            <div className="container mx-auto px-4">
              <div className="flex flex-col md:flex-row justify-between items-center">
                <div className="flex items-center space-x-2 mb-4 md:mb-0">
                  <Home className="h-6 w-6" />
                  <span className="text-lg font-semibold">PropertyHub</span>
                </div>
                <div className="text-center md:text-right">
                  <p className="text-sm opacity-75">
                    © 2024 PropertyHub. All rights reserved.
                  </p>
                  <p className="text-xs opacity-50 mt-1">
                    Your trusted property marketplace
                  </p>
                </div>
              </div>
            </div>
          </footer>
        </div>
      ) : currentView === "listings" ? (
        <PropertyListings onBack={() => setCurrentView("home")} />
      ) : currentView === "detail" ? (
        <PropertyDetail
          property={mockPropertyDetail}
          similarProperties={mockSimilarProperties}
          onBack={() => setCurrentView("listings")}
        />
      ) : currentView === "post" ? (
        !user ? (
          <div className="min-h-screen bg-gray-50 flex items-center justify-center">
            <Card className="w-full max-w-md">
              <CardContent className="p-8 text-center">
                <h2 className="text-2xl font-bold mb-4">Login Required</h2>
                <p className="text-gray-600 mb-6">
                  You need to be logged in to post a property.
                </p>
                <Button onClick={() => setIsAuthModalOpen(true)}>
                  Login to Continue
                </Button>
              </CardContent>
            </Card>
          </div>
        ) : (
          <PostPropertyWizard
            onCancel={() => setCurrentView("home")}
            onSuccess={() => {
              alert("Property posted successfully!");
              setCurrentView("home");
            }}
          />
        )
      ) : currentView === "admin" ? (
        <AdminPanel onLogout={handleLogout} />
      ) : null}

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onSuccess={handleAuthSuccess}
      />
    </div>
  );
}
