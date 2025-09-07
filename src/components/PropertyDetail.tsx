"use client";

import { useState } from "react";
import { 
  ArrowLeft, 
  Heart, 
  Share2, 
  Phone, 
  MessageCircle, 
  MapPin, 
  Home, 
  Bath, 
  Car, 
  Calendar, 
  CheckCircle, 
  Star,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

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
  pincode: string;
  latitude: number;
  longitude: number;
  bedrooms: number;
  bathrooms: number;
  parking: number;
  furnishing: string;
  amenities: string[];
  images: string[];
  postedAgo: string;
  seller: {
    id: string;
    name: string;
    avatar?: string;
    isVerified: boolean;
    joinDate: string;
    phone: string;
    rating: number;
    totalProperties: number;
  };
  isPromoted: boolean;
  status: string;
}

interface SimilarProperty {
  id: string;
  title: string;
  price: number;
  area: number;
  location: string;
  image: string;
  bedrooms: number;
  bathrooms: number;
}

export default function PropertyDetail({ property, onBack, similarProperties }: { 
  property: Property; 
  onBack?: () => void;
  similarProperties?: SimilarProperty[];
}) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isImageFullscreen, setIsImageFullscreen] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

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

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === property.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? property.images.length - 1 : prev - 1
    );
  };

  const PropertyImageGallery = () => (
    <div className="relative">
      <div className="relative h-96 md:h-[500px] overflow-hidden rounded-lg">
        <img
          src={property.images[currentImageIndex]}
          alt={`${property.title} - Image ${currentImageIndex + 1}`}
          className="w-full h-full object-cover"
        />
        
        {/* Navigation Arrows */}
        {property.images.length > 1 && (
          <>
            <Button
              variant="ghost"
              size="sm"
              className="absolute left-2 top-1/2 transform -translate-y-1/2 h-10 w-10 p-0 bg-black/20 hover:bg-black/40 text-white"
              onClick={prevImage}
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 h-10 w-10 p-0 bg-black/20 hover:bg-black/40 text-white"
              onClick={nextImage}
            >
              <ChevronRight className="h-6 w-6" />
            </Button>
          </>
        )}

        {/* Top Right Actions */}
        <div className="absolute top-4 right-4 flex gap-2">
          <Dialog open={isImageFullscreen} onOpenChange={setIsImageFullscreen}>
            <DialogTrigger asChild>
              <Button size="sm" variant="ghost" className="h-10 w-10 p-0 bg-black/20 hover:bg-black/40 text-white">
                <Maximize2 className="h-5 w-5" />
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[90vh] p-0">
              <div className="relative">
                <img
                  src={property.images[currentImageIndex]}
                  alt={`${property.title} - Fullscreen`}
                  className="w-full h-full max-h-[80vh] object-contain"
                />
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute top-4 right-4 h-10 w-10 p-0 bg-black/20 hover:bg-black/40 text-white"
                  onClick={() => setIsImageFullscreen(false)}
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
            </DialogContent>
          </Dialog>
          
          <Button 
            size="sm" 
            variant="ghost" 
            className={`h-10 w-10 p-0 ${isFavorite ? 'bg-red-500 hover:bg-red-600' : 'bg-black/20 hover:bg-black/40'} text-white`}
            onClick={() => setIsFavorite(!isFavorite)}
          >
            <Heart className={`h-5 w-5 ${isFavorite ? 'fill-current' : ''}`} />
          </Button>
          
          <Button size="sm" variant="ghost" className="h-10 w-10 p-0 bg-black/20 hover:bg-black/40 text-white">
            <Share2 className="h-5 w-5" />
          </Button>
        </div>

        {/* Image Indicators */}
        {property.images.length > 1 && (
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
            {property.images.map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                }`}
                onClick={() => setCurrentImageIndex(index)}
              />
            ))}
          </div>
        )}

        {/* Badges */}
        <div className="absolute top-4 left-4 flex gap-2">
          {property.isPromoted && (
            <Badge className="bg-yellow-500 hover:bg-yellow-600">
              Promoted
            </Badge>
          )}
          {property.isNegotiable && (
            <Badge className="bg-green-500 hover:bg-green-600">
              Negotiable
            </Badge>
          )}
        </div>
      </div>

      {/* Thumbnail Strip */}
      {property.images.length > 1 && (
        <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
          {property.images.map((image, index) => (
            <button
              key={index}
              className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                index === currentImageIndex ? 'border-primary' : 'border-gray-200'
              }`}
              onClick={() => setCurrentImageIndex(index)}
            >
              <img
                src={image}
                alt={`${property.title} - Thumbnail ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );

  const PropertyInfo = () => (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold mb-2">{property.title}</h1>
        <div className="flex items-center text-gray-600 mb-4">
          <MapPin className="h-5 w-5 mr-1" />
          <span>{property.location}, {property.city}, {property.state} - {property.pincode}</span>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div>
          <span className="text-3xl font-bold text-primary">
            {property.price < 100000 ? `${formatPrice(property.price)}/month` : formatPrice(property.price)}
          </span>
          {property.isNegotiable && (
            <Badge className="ml-2 bg-green-100 text-green-800 hover:bg-green-200">
              Negotiable
            </Badge>
          )}
        </div>
        <div className="text-right text-sm text-gray-500">
          <span>Posted {formatPostedAgo(property.postedAgo)}</span>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="text-center p-4 bg-gray-50 rounded-lg">
          <Home className="h-6 w-6 mx-auto mb-2 text-primary" />
          <div className="font-semibold">{property.bedrooms} BHK</div>
          <div className="text-sm text-gray-600">Bedrooms</div>
        </div>
        <div className="text-center p-4 bg-gray-50 rounded-lg">
          <Bath className="h-6 w-6 mx-auto mb-2 text-primary" />
          <div className="font-semibold">{property.bathrooms}</div>
          <div className="text-sm text-gray-600">Bathrooms</div>
        </div>
        <div className="text-center p-4 bg-gray-50 rounded-lg">
          <Car className="h-6 w-6 mx-auto mb-2 text-primary" />
          <div className="font-semibold">{property.parking}</div>
          <div className="text-sm text-gray-600">Parking</div>
        </div>
        <div className="text-center p-4 bg-gray-50 rounded-lg">
          <div className="font-semibold text-lg mb-1">{property.area}</div>
          <div className="text-sm text-gray-600">{property.areaUnit.replace('_', ' ')}</div>
        </div>
      </div>

      <div>
        <h3 className="font-semibold mb-2">Additional Features</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          <div className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-green-500" />
            <span className="text-sm">{property.furnishing.replace('_', ' ')}</span>
          </div>
          {property.amenities.map((amenity, index) => (
            <div key={index} className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span className="text-sm">{amenity}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const SellerInfo = () => (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span>Seller Information</span>
          {property.seller.isVerified && (
            <Badge variant="outline" className="text-xs">
              <CheckCircle className="h-3 w-3 mr-1" />
              Verified
            </Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-start gap-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src={property.seller.avatar} alt={property.seller.name} />
            <AvatarFallback>
              {property.seller.name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-semibold text-lg">{property.seller.name}</h3>
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="text-sm font-medium">{property.seller.rating}</span>
              </div>
            </div>
            
            <div className="text-sm text-gray-600 mb-3">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>Member since {property.seller.joinDate}</span>
              </div>
              <div className="mt-1">
                {property.seller.totalProperties} properties listed
              </div>
            </div>
            
            <div className="flex gap-2">
              <Button className="flex-1" variant="outline">
                <Phone className="h-4 w-4 mr-2" />
                Call Seller
              </Button>
              <Button className="flex-1">
                <MessageCircle className="h-4 w-4 mr-2" />
                Chat
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const SimilarPropertiesList = () => (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold">Similar Properties</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {similarProperties?.map((similarProperty) => (
          <Card key={similarProperty.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-200">
            <img
              src={similarProperty.image}
              alt={similarProperty.title}
              className="w-full h-40 object-cover"
            />
            <CardContent className="p-4">
              <h4 className="font-semibold mb-2 line-clamp-2">{similarProperty.title}</h4>
              <div className="flex items-center text-sm text-gray-600 mb-2">
                <MapPin className="h-4 w-4 mr-1" />
                <span className="line-clamp-1">{similarProperty.location}</span>
              </div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-lg font-bold text-primary">
                  {formatPrice(similarProperty.price)}
                </span>
                <span className="text-sm text-gray-500">
                  {similarProperty.area} sq ft
                </span>
              </div>
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <span>{similarProperty.bedrooms} BHK</span>
                <span>{similarProperty.bathrooms} Bath</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {onBack && (
                <Button variant="ghost" size="sm" onClick={onBack}>
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back
                </Button>
              )}
              <div className="flex items-center space-x-2">
                <Home className="h-8 w-8 text-primary" />
                <h1 className="text-2xl font-bold text-primary">PropertyHub</h1>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                Report Property
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Property Details */}
          <div className="lg:col-span-2 space-y-6">
            <PropertyImageGallery />
            
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="description">Description</TabsTrigger>
                <TabsTrigger value="location">Location</TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview" className="mt-6">
                <PropertyInfo />
              </TabsContent>
              
              <TabsContent value="description" className="mt-6">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-semibold mb-4">Property Description</h3>
                    <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                      {property.description}
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="location" className="mt-6">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-semibold mb-4">Location & Neighborhood</h3>
                    <div className="space-y-4">
                      <div className="bg-gray-100 h-64 rounded-lg flex items-center justify-center">
                        <div className="text-center text-gray-500">
                          <MapPin className="h-12 w-12 mx-auto mb-2" />
                          <p>Interactive Map</p>
                          <p className="text-sm">Google Maps integration would be here</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-medium mb-2">Address</h4>
                          <p className="text-gray-600 text-sm">
                            {property.location}, {property.city}<br />
                            {property.state} - {property.pincode}
                          </p>
                        </div>
                        <div>
                          <h4 className="font-medium mb-2">Nearby Landmarks</h4>
                          <ul className="text-gray-600 text-sm space-y-1">
                            <li>• School: 0.5 km</li>
                            <li>• Hospital: 1.2 km</li>
                            <li>• Metro Station: 0.8 km</li>
                            <li>• Shopping Mall: 1.5 km</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Right Column - Seller Info & Actions */}
          <div className="space-y-6">
            <SellerInfo />
            
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <Button className="w-full" size="lg">
                    <MessageCircle className="h-5 w-5 mr-2" />
                    Contact Seller
                  </Button>
                  <Button variant="outline" className="w-full" size="lg">
                    <Phone className="h-5 w-5 mr-2" />
                    Call Now
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Heart className="h-4 w-4 mr-2" />
                    {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Safety Tips</h3>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Meet in a public place for property viewing</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Verify property documents before payment</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Never pay advance without proper agreement</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Similar Properties Section */}
        <div className="mt-12">
          <SimilarPropertiesList />
        </div>
      </div>
    </div>
  );
}