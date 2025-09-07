"use client";

import { useState } from "react";
import { 
  ArrowLeft, 
  ArrowRight, 
  Home, 
  Building, 
  Landmark, 
  Users, 
  Car, 
  Store, 
  MapPin,
  Upload,
  Image as ImageIcon,
  Video,
  X,
  Plus,
  CheckCircle,
  Eye,
  Edit,
  Save,
  Send
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface PropertyData {
  category: string;
  title: string;
  description: string;
  price: number;
  isNegotiable: boolean;
  area: number;
  areaUnit: string;
  bedrooms: number;
  bathrooms: number;
  parking: number;
  furnishing: string;
  amenities: string[];
  location: string;
  city: string;
  state: string;
  pincode: string;
  latitude: number;
  longitude: number;
  images: File[];
  videos: File[];
  contactName: string;
  contactPhone: string;
  contactEmail: string;
}

const categories = [
  { id: "flat", name: "Flat/Apartment", icon: Building, description: "Residential flats and apartments" },
  { id: "house", name: "House/Villa", icon: Home, description: "Independent houses and villas" },
  { id: "plot", name: "Plot/Land", icon: Landmark, description: "Residential and commercial plots" },
  { id: "pg", name: "PG/Hostel", icon: Users, description: "Paying guest and hostel accommodations" },
  { id: "commercial", name: "Commercial", icon: Store, description: "Office spaces, shops, and commercial properties" },
  { id: "parking", name: "Parking", icon: Car, description: "Parking spaces and garages" },
];

const amenitiesList = [
  "Swimming Pool",
  "Gym",
  "Power Backup",
  "24/7 Security",
  "Lift",
  "Park",
  "Community Hall",
  "Children's Play Area",
  "Wi-Fi",
  "Air Conditioning",
  "Furnished",
  "Semi-Furnished",
  "Balcony",
  "Parking",
  "Gas Pipeline",
  "Water Supply",
  "Near Metro",
  "Near School",
  "Near Hospital",
  "Near Mall"
];

export default function PostPropertyWizard({ onCancel, onSuccess }: { 
  onCancel?: () => void;
  onSuccess?: () => void;
}) {
  const [currentStep, setCurrentStep] = useState(1);
  const [propertyData, setPropertyData] = useState<PropertyData>({
    category: "",
    title: "",
    description: "",
    price: 0,
    isNegotiable: false,
    area: 0,
    areaUnit: "SQ_FT",
    bedrooms: 0,
    bathrooms: 0,
    parking: 0,
    furnishing: "UNFURNISHED",
    amenities: [],
    location: "",
    city: "",
    state: "",
    pincode: "",
    latitude: 0,
    longitude: 0,
    images: [],
    videos: [],
    contactName: "",
    contactPhone: "",
    contactEmail: "",
  });

  const [imagePreviewUrls, setImagePreviewUrls] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const totalSteps = 5;
  const progress = (currentStep / totalSteps) * 100;

  const updatePropertyData = (field: keyof PropertyData, value: any) => {
    setPropertyData(prev => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    const newImages = [...propertyData.images, ...files];
    const newPreviewUrls = [...imagePreviewUrls, ...files.map(file => URL.createObjectURL(file))];
    
    updatePropertyData("images", newImages);
    setImagePreviewUrls(newPreviewUrls);
  };

  const removeImage = (index: number) => {
    const newImages = propertyData.images.filter((_, i) => i !== index);
    const newPreviewUrls = imagePreviewUrls.filter((_, i) => i !== index);
    
    updatePropertyData("images", newImages);
    setImagePreviewUrls(newPreviewUrls);
  };

  const toggleAmenity = (amenity: string) => {
    const currentAmenities = propertyData.amenities;
    const updatedAmenities = currentAmenities.includes(amenity)
      ? currentAmenities.filter(a => a !== amenity)
      : [...currentAmenities, amenity];
    
    updatePropertyData("amenities", updatedAmenities);
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    onSuccess?.();
  };

  const Step1Category = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Select Property Category</h2>
        <p className="text-gray-600">Choose the category that best describes your property</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((category) => {
          const Icon = category.icon;
          const isSelected = propertyData.category === category.id;
          
          return (
            <Card
              key={category.id}
              className={`cursor-pointer transition-all duration-200 ${
                isSelected 
                  ? 'border-primary bg-primary/5 shadow-md' 
                  : 'hover:shadow-md hover:border-primary/50'
              }`}
              onClick={() => updatePropertyData("category", category.id)}
            >
              <CardContent className="p-6 text-center">
                <Icon className={`h-12 w-12 mx-auto mb-4 ${
                  isSelected ? 'text-primary' : 'text-gray-400'
                }`} />
                <h3 className="font-semibold mb-2">{category.name}</h3>
                <p className="text-sm text-gray-600">{category.description}</p>
                {isSelected && (
                  <CheckCircle className="h-6 w-6 mx-auto mt-3 text-primary" />
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Alert>
        <AlertDescription>
          Select the most appropriate category for your property to help buyers find it easily.
        </AlertDescription>
      </Alert>
    </div>
  );

  const Step2PropertyDetails = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Property Details</h2>
        <p className="text-gray-600">Provide detailed information about your property</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <Label htmlFor="title">Property Title *</Label>
            <Input
              id="title"
              placeholder="e.g., Spacious 3BHK Flat with Balcony"
              value={propertyData.title}
              onChange={(e) => updatePropertyData("title", e.target.value)}
            />
          </div>

          <div>
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              placeholder="Describe your property in detail..."
              rows={4}
              value={propertyData.description}
              onChange={(e) => updatePropertyData("description", e.target.value)}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="area">Area *</Label>
              <Input
                id="area"
                type="number"
                placeholder="1200"
                value={propertyData.area || ""}
                onChange={(e) => updatePropertyData("area", Number(e.target.value))}
              />
            </div>
            <div>
              <Label htmlFor="areaUnit">Area Unit</Label>
              <Select value={propertyData.areaUnit} onValueChange={(value) => updatePropertyData("areaUnit", value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="SQ_FT">Sq. Ft.</SelectItem>
                  <SelectItem value="SQ_YARDS">Sq. Yards</SelectItem>
                  <SelectItem value="SQ_METERS">Sq. Meters</SelectItem>
                  <SelectItem value="ACRES">Acres</SelectItem>
                  <SelectItem value="GUNTHA">Guntha</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <Label htmlFor="bedrooms">Bedrooms</Label>
              <Select value={propertyData.bedrooms.toString()} onValueChange={(value) => updatePropertyData("bedrooms", Number(value))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0">None</SelectItem>
                  <SelectItem value="1">1</SelectItem>
                  <SelectItem value="2">2</SelectItem>
                  <SelectItem value="3">3</SelectItem>
                  <SelectItem value="4">4</SelectItem>
                  <SelectItem value="5">5+</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="bathrooms">Bathrooms</Label>
              <Select value={propertyData.bathrooms.toString()} onValueChange={(value) => updatePropertyData("bathrooms", Number(value))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0">None</SelectItem>
                  <SelectItem value="1">1</SelectItem>
                  <SelectItem value="2">2</SelectItem>
                  <SelectItem value="3">3</SelectItem>
                  <SelectItem value="4">4+</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="parking">Parking</Label>
              <Select value={propertyData.parking.toString()} onValueChange={(value) => updatePropertyData("parking", Number(value))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0">None</SelectItem>
                  <SelectItem value="1">1</SelectItem>
                  <SelectItem value="2">2</SelectItem>
                  <SelectItem value="3">3+</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label>Furnishing Status</Label>
            <RadioGroup
              value={propertyData.furnishing}
              onValueChange={(value) => updatePropertyData("furnishing", value)}
              className="flex gap-4 mt-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="UNFURNISHED" id="unfurnished" />
                <Label htmlFor="unfurnished">Unfurnished</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="SEMI_FURNISHED" id="semi-furnished" />
                <Label htmlFor="semi-furnished">Semi-Furnished</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="FULLY_FURNISHED" id="fully-furnished" />
                <Label htmlFor="fully-furnished">Fully Furnished</Label>
              </div>
            </RadioGroup>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <Label htmlFor="location">Location *</Label>
            <Input
              id="location"
              placeholder="Enter landmark or area"
              value={propertyData.location}
              onChange={(e) => updatePropertyData("location", e.target.value)}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="city">City *</Label>
              <Input
                id="city"
                placeholder="Mumbai"
                value={propertyData.city}
                onChange={(e) => updatePropertyData("city", e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="state">State *</Label>
              <Input
                id="state"
                placeholder="Maharashtra"
                value={propertyData.state}
                onChange={(e) => updatePropertyData("state", e.target.value)}
              />
            </div>
          </div>

          <div>
            <Label htmlFor="pincode">Pincode</Label>
            <Input
              id="pincode"
              placeholder="400001"
              value={propertyData.pincode}
              onChange={(e) => updatePropertyData("pincode", e.target.value)}
            />
          </div>

          <div>
            <Label>Amenities</Label>
            <div className="grid grid-cols-2 gap-2 mt-2 max-h-64 overflow-y-auto">
              {amenitiesList.map((amenity) => (
                <div key={amenity} className="flex items-center space-x-2">
                  <Checkbox
                    id={amenity}
                    checked={propertyData.amenities.includes(amenity)}
                    onCheckedChange={() => toggleAmenity(amenity)}
                  />
                  <Label htmlFor={amenity} className="text-sm">{amenity}</Label>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const Step3UploadMedia = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Upload Photos & Videos</h2>
        <p className="text-gray-600">Add high-quality images and videos to showcase your property</p>
      </div>

      <div className="space-y-6">
        <div>
          <Label className="text-lg font-semibold">Property Images</Label>
          <p className="text-sm text-gray-600 mb-4">Add at least 3 images for better visibility (Max 20)</p>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {imagePreviewUrls.map((url, index) => (
              <div key={index} className="relative group">
                <img
                  src={url}
                  alt={`Property image ${index + 1}`}
                  className="w-full h-32 object-cover rounded-lg"
                />
                <Button
                  variant="destructive"
                  size="sm"
                  className="absolute top-2 right-2 h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => removeImage(index)}
                >
                  <X className="h-4 w-4" />
                </Button>
                <Badge className="absolute bottom-2 left-2 text-xs">
                  {index + 1}
                </Badge>
              </div>
            ))}
            
            <label className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer hover:border-primary transition-colors">
              <div className="flex flex-col items-center justify-center h-32">
                <Plus className="h-8 w-8 text-gray-400 mb-2" />
                <span className="text-sm text-gray-600">Add Image</span>
              </div>
              <input
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={handleImageUpload}
              />
            </label>
          </div>
        </div>

        <Separator />

        <div>
          <Label className="text-lg font-semibold">Property Videos</Label>
          <p className="text-sm text-gray-600 mb-4">Add video tours for better engagement (Max 5 videos)</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <label className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-primary transition-colors">
              <div className="flex flex-col items-center">
                <Video className="h-12 w-12 text-gray-400 mb-4" />
                <span className="text-lg font-medium text-gray-600">Upload Video</span>
                <span className="text-sm text-gray-500 mt-2">MP4, MOV, AVI (Max 100MB)</span>
              </div>
              <input
                type="file"
                accept="video/*"
                multiple
                className="hidden"
              />
            </label>
          </div>
        </div>

        <Alert>
          <AlertDescription>
            <strong>Tips for better photos:</strong><br />
            • Use good lighting and shoot from multiple angles<br />
            • Include all rooms, bathrooms, and kitchen<br />
            • Show nearby amenities and neighborhood<br />
            • Ensure images are clear and high-resolution
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );

  const Step4Pricing = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Set Price & Details</h2>
        <p className="text-gray-600">Set the right price and provide contact information</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <Label htmlFor="price">Price *</Label>
            <Input
              id="price"
              type="number"
              placeholder="8500000"
              value={propertyData.price || ""}
              onChange={(e) => updatePropertyData("price", Number(e.target.value))}
            />
            <p className="text-sm text-gray-500 mt-1">Enter price in Indian Rupees (₹)</p>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="negotiable"
              checked={propertyData.isNegotiable}
              onCheckedChange={(checked) => updatePropertyData("isNegotiable", !!checked)}
            />
            <Label htmlFor="negotiable">Price is negotiable</Label>
          </div>

          <Separator />

          <div>
            <Label className="text-lg font-semibold">Contact Information</Label>
          </div>

          <div>
            <Label htmlFor="contactName">Contact Name *</Label>
            <Input
              id="contactName"
              placeholder="Your name"
              value={propertyData.contactName}
              onChange={(e) => updatePropertyData("contactName", e.target.value)}
            />
          </div>

          <div>
            <Label htmlFor="contactPhone">Phone Number *</Label>
            <Input
              id="contactPhone"
              placeholder="+91 98765 43210"
              value={propertyData.contactPhone}
              onChange={(e) => updatePropertyData("contactPhone", e.target.value)}
            />
          </div>

          <div>
            <Label htmlFor="contactEmail">Email Address</Label>
            <Input
              id="contactEmail"
              type="email"
              placeholder="your@email.com"
              value={propertyData.contactEmail}
              onChange={(e) => updatePropertyData("contactEmail", e.target.value)}
            />
          </div>
        </div>

        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Pricing Tips</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="text-sm">
                <strong>Research similar properties:</strong> Check prices of similar properties in your area
              </div>
              <div className="text-sm">
                <strong>Consider location:</strong> Properties in prime areas can command higher prices
              </div>
              <div className="text-sm">
                <strong>Factor in amenities:</strong> Additional features can justify higher pricing
              </div>
              <div className="text-sm">
                <strong>Market conditions:</strong> Consider current real estate market trends
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Price Calculator</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between text-sm">
                <span>Price per sq ft:</span>
                <span>₹{propertyData.area > 0 ? Math.round(propertyData.price / propertyData.area).toLocaleString() : '0'}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Category:</span>
                <span>{categories.find(c => c.id === propertyData.category)?.name || 'Not selected'}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Furnishing:</span>
                <span>{propertyData.furnishing.replace('_', ' ')}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );

  const Step5Review = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Review & Publish</h2>
        <p className="text-gray-600">Review your property details before publishing</p>
      </div>

      <Tabs defaultValue="details" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="details">Details</TabsTrigger>
          <TabsTrigger value="media">Media</TabsTrigger>
          <TabsTrigger value="pricing">Pricing</TabsTrigger>
          <TabsTrigger value="contact">Contact</TabsTrigger>
        </TabsList>

        <TabsContent value="details" className="space-y-4">
          <Card>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-3">Basic Information</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Category:</span>
                      <span>{categories.find(c => c.id === propertyData.category)?.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Title:</span>
                      <span className="text-right">{propertyData.title}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Area:</span>
                      <span>{propertyData.area} {propertyData.areaUnit.replace('_', ' ')}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Bedrooms:</span>
                      <span>{propertyData.bedrooms}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Bathrooms:</span>
                      <span>{propertyData.bathrooms}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Parking:</span>
                      <span>{propertyData.parking}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Furnishing:</span>
                      <span>{propertyData.furnishing.replace('_', ' ')}</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-3">Location</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Location:</span>
                      <span className="text-right">{propertyData.location}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">City:</span>
                      <span>{propertyData.city}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">State:</span>
                      <span>{propertyData.state}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Pincode:</span>
                      <span>{propertyData.pincode}</span>
                    </div>
                  </div>
                  
                  <h3 className="font-semibold mb-3 mt-4">Amenities</h3>
                  <div className="flex flex-wrap gap-1">
                    {propertyData.amenities.map((amenity, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {amenity}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="mt-6">
                <h3 className="font-semibold mb-3">Description</h3>
                <p className="text-sm text-gray-700 leading-relaxed">
                  {propertyData.description}
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="media" className="space-y-4">
          <Card>
            <CardContent className="p-6">
              <h3 className="font-semibold mb-4">Images ({propertyData.images.length})</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {imagePreviewUrls.map((url, index) => (
                  <div key={index} className="relative">
                    <img
                      src={url}
                      alt={`Property image ${index + 1}`}
                      className="w-full h-32 object-cover rounded-lg"
                    />
                    <Badge className="absolute bottom-2 left-2 text-xs">
                      {index + 1}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pricing" className="space-y-4">
          <Card>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-3">Price Information</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Price:</span>
                      <span className="font-semibold text-lg">₹{propertyData.price.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Negotiable:</span>
                      <span>{propertyData.isNegotiable ? 'Yes' : 'No'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Price per sq ft:</span>
                      <span>₹{propertyData.area > 0 ? Math.round(propertyData.price / propertyData.area).toLocaleString() : '0'}</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-3">Property Value</h3>
                  <div className="bg-primary/5 rounded-lg p-4">
                    <div className="text-2xl font-bold text-primary mb-2">
                      ₹{propertyData.price.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-600">
                      Estimated property value based on current market rates
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="contact" className="space-y-4">
          <Card>
            <CardContent className="p-6">
              <h3 className="font-semibold mb-4">Contact Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Name:</span>
                    <span>{propertyData.contactName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Phone:</span>
                    <span>{propertyData.contactPhone}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Email:</span>
                    <span>{propertyData.contactEmail || 'Not provided'}</span>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">Privacy Settings</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Phone number will be visible to interested buyers</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Email will be shared only with verified users</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>All contact information is secured</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Alert>
        <AlertDescription>
          <strong>Before publishing:</strong><br />
          • Ensure all information is accurate and complete<br />
          • Verify that your contact details are correct<br />
          • Make sure you have rights to sell/rent this property<br />
          • Property will be reviewed by our team before going live
        </AlertDescription>
      </Alert>
    </div>
  );

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <Step1Category />;
      case 2:
        return <Step2PropertyDetails />;
      case 3:
        return <Step3UploadMedia />;
      case 4:
        return <Step4Pricing />;
      case 5:
        return <Step5Review />;
      default:
        return <Step1Category />;
    }
  };

  const isStepComplete = () => {
    switch (currentStep) {
      case 1:
        return !!propertyData.category;
      case 2:
        return !!propertyData.title && !!propertyData.description && propertyData.area > 0 && 
               !!propertyData.location && !!propertyData.city && !!propertyData.state;
      case 3:
        return propertyData.images.length >= 1;
      case 4:
        return propertyData.price > 0 && !!propertyData.contactName && !!propertyData.contactPhone;
      case 5:
        return true;
      default:
        return false;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {onCancel && (
                <Button variant="ghost" size="sm" onClick={onCancel}>
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Cancel
                </Button>
              )}
              <div className="flex items-center space-x-2">
                <Home className="h-8 w-8 text-primary" />
                <h1 className="text-2xl font-bold text-primary">Post Property</h1>
              </div>
            </div>
            <div className="text-sm text-gray-500">
              Step {currentStep} of {totalSteps}
            </div>
          </div>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Progress</span>
            <span className="text-sm text-gray-500">{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {renderStep()}
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="bg-white border-t sticky bottom-0">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between max-w-6xl mx-auto">
            <Button
              variant="outline"
              onClick={prevStep}
              disabled={currentStep === 1}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Previous
            </Button>

            <div className="flex items-center gap-2">
              {currentStep === 5 ? (
                <Button
                  onClick={handleSubmit}
                  disabled={!isStepComplete() || isSubmitting}
                  className="bg-green-600 hover:bg-green-700"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Publishing...
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4 mr-2" />
                      Publish Property
                    </>
                  )}
                </Button>
              ) : (
                <Button
                  onClick={nextStep}
                  disabled={!isStepComplete()}
                >
                  Next
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}