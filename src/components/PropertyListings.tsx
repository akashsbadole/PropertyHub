"use client";

import { useState, useEffect } from "react";
import { Search, MapPin, Filter, Grid, List, SortAsc, SortDesc, Heart, Share2, Phone, MessageCircle, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";

interface Property {
  id: string;
  title: string;
  description: string;
  price: number;
  isNegotiable: boolean;
  area: number;
  areaUnit: string;
  location: string;
  city: string;
  state: string;
  bedrooms: number;
  bathrooms: number;
  parking: number;
  furnishing: string;
  images: string[];
  postedAgo: string;
  seller: {
    name: string;
    isVerified: boolean;
  };
  isPromoted: boolean;
}

interface FilterState {
  priceRange: [number, number];
  areaRange: [number, number];
  bedrooms: number[];
  bathrooms: number[];
  furnishing: string[];
  propertyType: string[];
  postedWithin: string;
  sortBy: string;
  sortOrder: "asc" | "desc";
}

export default function PropertyListings({ onBack }: { onBack?: () => void }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [location, setLocation] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [filters, setFilters] = useState<FilterState>({
    priceRange: [0, 100000000],
    areaRange: [0, 5000],
    bedrooms: [],
    bathrooms: [],
    furnishing: [],
    propertyType: [],
    postedWithin: "any",
    sortBy: "relevance",
    sortOrder: "desc",
  });
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Mock data for properties
  const properties: Property[] = [
    {
      id: "1",
      title: "Luxury 3BHK Flat in Heart of City",
      description: "Spacious 3BHK flat with modern amenities, balcony, and parking. Located in prime location with easy access to schools, hospitals, and shopping centers.",
      price: 8500000,
      isNegotiable: true,
      area: 1200,
      areaUnit: "SQ_FT",
      location: "Andheri West",
      city: "Mumbai",
      state: "Maharashtra",
      bedrooms: 3,
      bathrooms: 2,
      parking: 1,
      furnishing: "SEMI_FURNISHED",
      images: ["/api/placeholder/400/300", "/api/placeholder/400/300", "/api/placeholder/400/300"],
      postedAgo: "2 hours ago",
      seller: {
        name: "Rajesh Kumar",
        isVerified: true,
      },
      isPromoted: true,
    },
    {
      id: "2",
      title: "2BHK Flat with Balcony",
      description: "Well-maintained 2BHK flat with balcony, 24/7 security, and power backup. Close to metro station and market.",
      price: 6500000,
      isNegotiable: true,
      area: 950,
      areaUnit: "SQ_FT",
      location: "Bandra East",
      city: "Mumbai",
      state: "Maharashtra",
      bedrooms: 2,
      bathrooms: 1,
      parking: 0,
      furnishing: "UNFURNISHED",
      images: ["/api/placeholder/400/300", "/api/placeholder/400/300"],
      postedAgo: "30 minutes ago",
      seller: {
        name: "Priya Sharma",
        isVerified: false,
      },
      isPromoted: false,
    },
    {
      id: "3",
      title: "Spacious Villa with Garden",
      description: "Beautiful independent villa with private garden, swimming pool, and modern amenities. Perfect for families.",
      price: 25000000,
      isNegotiable: false,
      area: 2500,
      areaUnit: "SQ_FT",
      location: "Koramangala",
      city: "Bangalore",
      state: "Karnataka",
      bedrooms: 4,
      bathrooms: 3,
      parking: 2,
      furnishing: "FULLY_FURNISHED",
      images: ["/api/placeholder/400/300", "/api/placeholder/400/300", "/api/placeholder/400/300", "/api/placeholder/400/300"],
      postedAgo: "5 hours ago",
      seller: {
        name: "Amit Patel",
        isVerified: true,
      },
      isPromoted: true,
    },
    {
      id: "4",
      title: "1RK Studio Apartment",
      description: "Compact and affordable studio apartment ideal for bachelors or small families. Well-connected to public transport.",
      price: 3500000,
      isNegotiable: false,
      area: 450,
      areaUnit: "SQ_FT",
      location: "Powai",
      city: "Mumbai",
      state: "Maharashtra",
      bedrooms: 1,
      bathrooms: 1,
      parking: 0,
      furnishing: "UNFURNISHED",
      images: ["/api/placeholder/400/300"],
      postedAgo: "1 hour ago",
      seller: {
        name: "Sunita Reddy",
        isVerified: true,
      },
      isPromoted: false,
    },
    {
      id: "5",
      title: "3BHK Premium Flat",
      description: "Premium 3BHK flat with sea view, modern amenities, and premium fittings. Located in upscale neighborhood.",
      price: 12000000,
      isNegotiable: true,
      area: 1500,
      areaUnit: "SQ_FT",
      location: "Juhu",
      city: "Mumbai",
      state: "Maharashtra",
      bedrooms: 3,
      bathrooms: 2,
      parking: 1,
      furnishing: "SEMI_FURNISHED",
      images: ["/api/placeholder/400/300", "/api/placeholder/400/300", "/api/placeholder/400/300"],
      postedAgo: "3 hours ago",
      seller: {
        name: "Vikram Mehta",
        isVerified: true,
      },
      isPromoted: true,
    },
    {
      id: "6",
      title: "Independent House",
      description: "Spacious independent house with garden, parking, and modern amenities. Perfect for large families.",
      price: 18000000,
      isNegotiable: true,
      area: 2000,
      areaUnit: "SQ_FT",
      location: "Thane",
      city: "Mumbai",
      state: "Maharashtra",
      bedrooms: 4,
      bathrooms: 3,
      parking: 2,
      furnishing: "FULLY_FURNISHED",
      images: ["/api/placeholder/400/300", "/api/placeholder/400/300", "/api/placeholder/400/300", "/api/placeholder/400/300"],
      postedAgo: "4 hours ago",
      seller: {
        name: "Anita Desai",
        isVerified: false,
      },
      isPromoted: false,
    },
    {
      id: "7",
      title: "Modern Commercial Office Space",
      description: "Modern office space in prime commercial area with excellent connectivity and amenities.",
      price: 45000000,
      isNegotiable: true,
      area: 3000,
      areaUnit: "SQ_FT",
      location: "Connaught Place",
      city: "Delhi",
      state: "Delhi",
      bedrooms: 0,
      bathrooms: 2,
      parking: 5,
      furnishing: "UNFURNISHED",
      images: ["/api/placeholder/400/300", "/api/placeholder/400/300"],
      postedAgo: "1 day ago",
      seller: {
        name: "Business Properties Ltd",
        isVerified: true,
      },
      isPromoted: true,
    },
    {
      id: "8",
      title: "PG Accommodation for Students",
      description: "Well-furnished PG accommodation with food, Wi-Fi, and all amenities. Ideal for students and working professionals.",
      price: 8000,
      isNegotiable: true,
      area: 200,
      areaUnit: "SQ_FT",
      location: "Indiranagar",
      city: "Bangalore",
      state: "Karnataka",
      bedrooms: 1,
      bathrooms: 1,
      parking: 0,
      furnishing: "FULLY_FURNISHED",
      images: ["/api/placeholder/400/300", "/api/placeholder/400/300"],
      postedAgo: "6 hours ago",
      seller: {
        name: "PG Stays",
        isVerified: true,
      },
      isPromoted: false,
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

  const formatPostedAgo = (postedAgo: string) => {
    return postedAgo;
  };

  const PropertyCard = ({ property }: { property: Property }) => (
    <Card className="overflow-hidden hover:shadow-lg transition-all duration-200 group">
      <div className="relative">
        <img
          src={property.images[0]}
          alt={property.title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-200"
        />
        <div className="absolute top-2 left-2 flex gap-1">
          {property.isPromoted && (
            <Badge className="bg-yellow-500 hover:bg-yellow-600 text-xs">
              Promoted
            </Badge>
          )}
          {property.isNegotiable && (
            <Badge className="bg-green-500 hover:bg-green-600 text-xs">
              Negotiable
            </Badge>
          )}
        </div>
        <div className="absolute top-2 right-2 flex gap-1">
          <Button size="sm" variant="ghost" className="h-8 w-8 p-0 bg-white/80 hover:bg-white">
            <Heart className="h-4 w-4" />
          </Button>
          <Button size="sm" variant="ghost" className="h-8 w-8 p-0 bg-white/80 hover:bg-white">
            <Share2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-semibold text-lg line-clamp-2 flex-1 pr-2">{property.title}</h3>
          {property.seller.isVerified && (
            <Badge variant="outline" className="text-xs">
              Verified
            </Badge>
          )}
        </div>
        
        <div className="flex items-center text-sm text-gray-600 mb-2">
          <MapPin className="h-4 w-4 mr-1 flex-shrink-0" />
          <span className="line-clamp-1">{property.location}, {property.city}</span>
        </div>
        
        <div className="flex items-center justify-between mb-3">
          <span className="text-xl font-bold text-primary">
            {property.price < 100000 ? `${formatPrice(property.price)}/month` : formatPrice(property.price)}
          </span>
          <span className="text-sm text-gray-500">
            {property.area} {property.areaUnit.replace('_', ' ')}
          </span>
        </div>
        
        <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
          {property.bedrooms > 0 && (
            <span>{property.bedrooms} BHK</span>
          )}
          {property.bathrooms > 0 && (
            <span>{property.bathrooms} Bath</span>
          )}
          {property.parking > 0 && (
            <span>{property.parking} Parking</span>
          )}
        </div>
        
        <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
          <span>{formatPostedAgo(property.postedAgo)}</span>
          <span>by {property.seller.name}</span>
        </div>
        
        <div className="flex gap-2">
          <Button size="sm" className="flex-1" variant="outline">
            <Phone className="h-4 w-4 mr-1" />
            Call
          </Button>
          <Button size="sm" className="flex-1">
            <MessageCircle className="h-4 w-4 mr-1" />
            Chat
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  const PropertyListItem = ({ property }: { property: Property }) => (
    <Card className="overflow-hidden hover:shadow-lg transition-all duration-200">
      <div className="flex flex-col sm:flex-row">
        <div className="relative sm:w-64 sm:h-48 h-48">
          <img
            src={property.images[0]}
            alt={property.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-2 left-2 flex gap-1">
            {property.isPromoted && (
              <Badge className="bg-yellow-500 hover:bg-yellow-600 text-xs">
                Promoted
              </Badge>
            )}
            {property.isNegotiable && (
              <Badge className="bg-green-500 hover:bg-green-600 text-xs">
                Negotiable
              </Badge>
            )}
          </div>
        </div>
        <CardContent className="flex-1 p-4">
          <div className="flex items-start justify-between mb-2">
            <h3 className="font-semibold text-lg line-clamp-2 flex-1 pr-2">{property.title}</h3>
            {property.seller.isVerified && (
              <Badge variant="outline" className="text-xs">
                Verified
              </Badge>
            )}
          </div>
          
          <div className="flex items-center text-sm text-gray-600 mb-2">
            <MapPin className="h-4 w-4 mr-1 flex-shrink-0" />
            <span className="line-clamp-1">{property.location}, {property.city}</span>
          </div>
          
          <p className="text-sm text-gray-600 mb-3 line-clamp-2">{property.description}</p>
          
          <div className="flex flex-wrap items-center gap-4 mb-3">
            <span className="text-xl font-bold text-primary">
              {property.price < 100000 ? `${formatPrice(property.price)}/month` : formatPrice(property.price)}
            </span>
            <span className="text-sm text-gray-500">
              {property.area} {property.areaUnit.replace('_', ' ')}
            </span>
            {property.bedrooms > 0 && (
              <span className="text-sm text-gray-600">{property.bedrooms} BHK</span>
            )}
            {property.bathrooms > 0 && (
              <span className="text-sm text-gray-600">{property.bathrooms} Bath</span>
            )}
          </div>
          
          <div className="flex items-center justify-between">
            <div className="text-xs text-gray-500">
              <span>{formatPostedAgo(property.postedAgo)}</span>
              <span className="mx-2">•</span>
              <span>by {property.seller.name}</span>
            </div>
            <div className="flex gap-2">
              <Button size="sm" variant="outline">
                <Phone className="h-4 w-4 mr-1" />
                Call
              </Button>
              <Button size="sm">
                <MessageCircle className="h-4 w-4 mr-1" />
                Chat
              </Button>
            </div>
          </div>
        </CardContent>
      </div>
    </Card>
  );

  const FilterPanel = () => (
    <div className="space-y-6">
      <div>
        <h4 className="font-semibold mb-3">Price Range</h4>
        <div className="px-3">
          <Slider
            value={filters.priceRange}
            onValueChange={(value) => setFilters({...filters, priceRange: value as [number, number]})}
            max={100000000}
            min={0}
            step={100000}
            className="w-full"
          />
          <div className="flex justify-between text-sm text-gray-600 mt-2">
            <span>{formatPrice(filters.priceRange[0])}</span>
            <span>{formatPrice(filters.priceRange[1])}</span>
          </div>
        </div>
      </div>

      <Separator />

      <div>
        <h4 className="font-semibold mb-3">Area Range</h4>
        <div className="px-3">
          <Slider
            value={filters.areaRange}
            onValueChange={(value) => setFilters({...filters, areaRange: value as [number, number]})}
            max={5000}
            min={0}
            step={100}
            className="w-full"
          />
          <div className="flex justify-between text-sm text-gray-600 mt-2">
            <span>{filters.areaRange[0]} sq ft</span>
            <span>{filters.areaRange[1]} sq ft</span>
          </div>
        </div>
      </div>

      <Separator />

      <div>
        <h4 className="font-semibold mb-3">Bedrooms</h4>
        <div className="space-y-2">
          {[1, 2, 3, 4, "5+"].map((bedroom) => (
            <div key={bedroom} className="flex items-center space-x-2">
              <Checkbox
                id={`bedroom-${bedroom}`}
                checked={filters.bedrooms.includes(bedroom as number)}
                onCheckedChange={(checked) => {
                  if (checked) {
                    setFilters({...filters, bedrooms: [...filters.bedrooms, bedroom as number]});
                  } else {
                    setFilters({...filters, bedrooms: filters.bedrooms.filter(b => b !== bedroom)});
                  }
                }}
              />
              <label htmlFor={`bedroom-${bedroom}`} className="text-sm">
                {bedroom} {bedroom === "5+" ? "" : "BHK"}
              </label>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      <div>
        <h4 className="font-semibold mb-3">Furnishing</h4>
        <div className="space-y-2">
          {["UNFURNISHED", "SEMI_FURNISHED", "FULLY_FURNISHED"].map((furnishing) => (
            <div key={furnishing} className="flex items-center space-x-2">
              <Checkbox
                id={`furnishing-${furnishing}`}
                checked={filters.furnishing.includes(furnishing)}
                onCheckedChange={(checked) => {
                  if (checked) {
                    setFilters({...filters, furnishing: [...filters.furnishing, furnishing]});
                  } else {
                    setFilters({...filters, furnishing: filters.furnishing.filter(f => f !== furnishing)});
                  }
                }}
              />
              <label htmlFor={`furnishing-${furnishing}`} className="text-sm">
                {furnishing.replace('_', ' ')}
              </label>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      <div>
        <h4 className="font-semibold mb-3">Posted Within</h4>
        <Select value={filters.postedWithin} onValueChange={(value) => setFilters({...filters, postedWithin: value})}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="any">Any time</SelectItem>
            <SelectItem value="today">Today</SelectItem>
            <SelectItem value="week">This week</SelectItem>
            <SelectItem value="month">This month</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex gap-2">
        <Button variant="outline" className="flex-1" onClick={() => setIsFilterOpen(false)}>
          Apply Filters
        </Button>
        <Button variant="ghost" className="flex-1" onClick={() => {
          setFilters({
            priceRange: [0, 100000000],
            areaRange: [0, 5000],
            bedrooms: [],
            bathrooms: [],
            furnishing: [],
            propertyType: [],
            postedWithin: "any",
            sortBy: "relevance",
            sortOrder: "desc",
          });
        }}>
          Clear All
        </Button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col lg:flex-row items-center gap-4">
            <div className="flex items-center gap-4 w-full lg:w-auto">
              {onBack && (
                <Button variant="ghost" size="sm" onClick={onBack}>
                  ← Back
                </Button>
              )}
              <div className="flex items-center space-x-2">
                <Home className="h-8 w-8 text-primary" />
                <h1 className="text-2xl font-bold text-primary">PropertyHub</h1>
              </div>
            </div>
            <div className="flex-1 w-full">
              <div className="bg-gray-100 rounded-lg p-2 flex flex-col sm:flex-row gap-2">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    placeholder="Search properties..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 border-0 focus:ring-0 bg-transparent"
                  />
                </div>
                <div className="flex-1 relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    placeholder="Enter location..."
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="pl-10 border-0 focus:ring-0 bg-transparent"
                  />
                </div>
                <Button className="bg-primary hover:bg-primary/90 text-white px-6">
                  Search
                </Button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Filters Sidebar (Desktop) */}
          <div className="hidden lg:block w-80 flex-shrink-0">
            <Card className="p-6 sticky top-24">
              <FilterPanel />
            </Card>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Controls Bar */}
            <div className="bg-white rounded-lg p-4 mb-6 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">
                  Showing {properties.length} properties
                </span>
              </div>
              
              <div className="flex items-center gap-2">
                <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
                  <SheetTrigger asChild>
                    <Button variant="outline" size="sm" className="lg:hidden">
                      <Filter className="h-4 w-4 mr-2" />
                      Filters
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left" className="w-80 overflow-y-auto">
                    <SheetHeader>
                      <SheetTitle>Filters</SheetTitle>
                      <SheetDescription>
                        Customize your property search
                      </SheetDescription>
                    </SheetHeader>
                    <div className="mt-6">
                      <FilterPanel />
                    </div>
                  </SheetContent>
                </Sheet>

                <Select value={filters.sortBy} onValueChange={(value) => setFilters({...filters, sortBy: value})}>
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="relevance">Relevance</SelectItem>
                    <SelectItem value="price">Price</SelectItem>
                    <SelectItem value="date">Date Posted</SelectItem>
                    <SelectItem value="area">Area</SelectItem>
                  </SelectContent>
                </Select>

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
              </div>
            </div>

            {/* Property Listings */}
            <div className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-4"}>
              {properties.map((property) => (
                viewMode === "grid" ? (
                  <PropertyCard key={property.id} property={property} />
                ) : (
                  <PropertyListItem key={property.id} property={property} />
                )
              ))}
            </div>

            {/* Load More */}
            <div className="text-center mt-8">
              <Button variant="outline" size="lg">
                Load More Properties
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}