"use client";

import { useState } from "react";
import { 
  X, 
  Mail, 
  Phone, 
  Lock, 
  Eye, 
  EyeOff, 
  User, 
  MapPin, 
  Calendar,
  CheckCircle,
  ArrowRight,
  ArrowLeft,
  Chrome,
  Facebook,
  Apple,
  Shield
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: (user: any) => void;
}

export default function AuthModal({ isOpen, onClose, onSuccess }: AuthModalProps) {
  const [authMode, setAuthMode] = useState<"login" | "signup" | "otp">("login");
  const [loginMethod, setLoginMethod] = useState<"email" | "phone">("email");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    name: "",
    otp: "",
    agreeTerms: false,
  });

  const [isLoading, setIsLoading] = useState(false);

  const updateFormData = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleLogin = async () => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsLoading(false);
    
    // Mock successful login
    const mockUser = {
      id: "user1",
      name: formData.name || "John Doe",
      email: formData.email,
      phone: formData.phone,
      isVerified: true,
      avatar: "/api/placeholder/100/100"
    };
    
    onSuccess?.(mockUser);
    onClose();
  };

  const handleSignup = async () => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsLoading(false);
    
    // For signup, we'll send OTP
    setOtpSent(true);
    setAuthMode("otp");
  };

  const handleSendOTP = async () => {
    setIsLoading(true);
    
    // Simulate OTP sending
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsLoading(false);
    setOtpSent(true);
  };

  const handleVerifyOTP = async () => {
    setIsLoading(true);
    
    // Simulate OTP verification
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsLoading(false);
    setOtpVerified(true);
    
    // Auto login after OTP verification
    setTimeout(() => {
      const mockUser = {
        id: "user1",
        name: formData.name || "John Doe",
        email: formData.email,
        phone: formData.phone,
        isVerified: true,
        avatar: "/api/placeholder/100/100"
      };
      
      onSuccess?.(mockUser);
      onClose();
    }, 1000);
  };

  const handleSocialLogin = async (provider: string) => {
    setIsLoading(true);
    
    // Simulate social login
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsLoading(false);
    
    // Mock successful social login
    const mockUser = {
      id: `user_${provider}`,
      name: `${provider.charAt(0).toUpperCase() + provider.slice(1)} User`,
      email: `user@${provider}.com`,
      phone: "",
      isVerified: true,
      avatar: "/api/placeholder/100/100"
    };
    
    onSuccess?.(mockUser);
    onClose();
  };

  const isFormValid = () => {
    if (authMode === "login") {
      if (loginMethod === "email") {
        return formData.email && formData.password;
      } else {
        return formData.phone && formData.password;
      }
    } else if (authMode === "signup") {
      return (
        formData.name &&
        formData.email &&
        formData.phone &&
        formData.password &&
        formData.confirmPassword &&
        formData.password === formData.confirmPassword &&
        formData.agreeTerms
      );
    } else if (authMode === "otp") {
      return formData.otp.length === 6;
    }
    return false;
  };

  const LoginForm = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-center mb-2">Welcome Back</h2>
        <p className="text-gray-600 text-center">Sign in to your account</p>
      </div>

      <Tabs value={loginMethod} onValueChange={(value) => setLoginMethod(value as "email" | "phone")}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="email">Email</TabsTrigger>
          <TabsTrigger value="phone">Phone</TabsTrigger>
        </TabsList>

        <TabsContent value="email" className="space-y-4">
          <div>
            <Label htmlFor="email">Email Address</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                className="pl-10"
                value={formData.email}
                onChange={(e) => updateFormData("email", e.target.value)}
              />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="phone" className="space-y-4">
          <div>
            <Label htmlFor="phone">Phone Number</Label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                id="phone"
                type="tel"
                placeholder="+91 98765 43210"
                className="pl-10"
                value={formData.phone}
                onChange={(e) => updateFormData("phone", e.target.value)}
              />
            </div>
          </div>
        </TabsContent>
      </Tabs>

      <div>
        <Label htmlFor="password">Password</Label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            className="pl-10 pr-10"
            value={formData.password}
            onChange={(e) => updateFormData("password", e.target.value)}
          />
          <Button
            variant="ghost"
            size="sm"
            className="absolute right-0 top-0 h-full px-3 py-2"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <Checkbox id="remember" />
        <Label htmlFor="remember" className="text-sm">Remember me</Label>
        <Button variant="link" className="text-sm p-0 h-auto">
          Forgot password?
        </Button>
      </div>

      <Button
        className="w-full"
        onClick={handleLogin}
        disabled={!isFormValid() || isLoading}
      >
        {isLoading ? (
          <>
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
            Signing in...
          </>
        ) : (
          "Sign In"
        )}
      </Button>

      <div className="text-center">
        <Button
          variant="link"
          className="text-sm"
          onClick={() => setAuthMode("otp")}
        >
          Sign in with OTP
        </Button>
      </div>
    </div>
  );

  const SignupForm = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-center mb-2">Create Account</h2>
        <p className="text-gray-600 text-center">Join PropertyHub today</p>
      </div>

      <div>
        <Label htmlFor="name">Full Name</Label>
        <div className="relative">
          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <Input
            id="name"
            placeholder="Enter your full name"
            className="pl-10"
            value={formData.name}
            onChange={(e) => updateFormData("name", e.target.value)}
          />
        </div>
      </div>

      <div>
        <Label htmlFor="signup-email">Email Address</Label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <Input
            id="signup-email"
            type="email"
            placeholder="Enter your email"
            className="pl-10"
            value={formData.email}
            onChange={(e) => updateFormData("email", e.target.value)}
          />
        </div>
      </div>

      <div>
        <Label htmlFor="signup-phone">Phone Number</Label>
        <div className="relative">
          <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <Input
            id="signup-phone"
            type="tel"
            placeholder="+91 98765 43210"
            className="pl-10"
            value={formData.phone}
            onChange={(e) => updateFormData("phone", e.target.value)}
          />
        </div>
      </div>

      <div>
        <Label htmlFor="signup-password">Password</Label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <Input
            id="signup-password"
            type={showPassword ? "text" : "password"}
            placeholder="Create a password"
            className="pl-10 pr-10"
            value={formData.password}
            onChange={(e) => updateFormData("password", e.target.value)}
          />
          <Button
            variant="ghost"
            size="sm"
            className="absolute right-0 top-0 h-full px-3 py-2"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      <div>
        <Label htmlFor="confirm-password">Confirm Password</Label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <Input
            id="confirm-password"
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirm your password"
            className="pl-10 pr-10"
            value={formData.confirmPassword}
            onChange={(e) => updateFormData("confirmPassword", e.target.value)}
          />
          <Button
            variant="ghost"
            size="sm"
            className="absolute right-0 top-0 h-full px-3 py-2"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </Button>
        </div>
        {formData.password !== formData.confirmPassword && formData.confirmPassword && (
          <p className="text-red-500 text-sm mt-1">Passwords do not match</p>
        )}
      </div>

      <div className="flex items-start space-x-2">
        <Checkbox
          id="terms"
          checked={formData.agreeTerms}
          onCheckedChange={(checked) => updateFormData("agreeTerms", checked)}
        />
        <Label htmlFor="terms" className="text-sm leading-relaxed">
          I agree to the{" "}
          <Button variant="link" className="text-sm p-0 h-auto">
            Terms of Service
          </Button>{" "}
          and{" "}
          <Button variant="link" className="text-sm p-0 h-auto">
            Privacy Policy
          </Button>
        </Label>
      </div>

      <Button
        className="w-full"
        onClick={handleSignup}
        disabled={!isFormValid() || isLoading}
      >
        {isLoading ? (
          <>
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
            Creating account...
          </>
        ) : (
          "Create Account"
        )}
      </Button>

      <div className="text-center">
        <Button
          variant="link"
          className="text-sm"
          onClick={() => setAuthMode("login")}
        >
          Already have an account? Sign in
        </Button>
      </div>
    </div>
  );

  const OTPForm = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-center mb-2">Verify OTP</h2>
        <p className="text-gray-600 text-center">
          We've sent a verification code to {loginMethod === "email" ? formData.email : formData.phone}
        </p>
      </div>

      {!otpVerified ? (
        <>
          <div className="text-center">
            <div className="flex justify-center gap-2 mb-4">
              {Array.from({ length: 6 }, (_, i) => (
                <Input
                  key={i}
                  type="text"
                  maxLength={1}
                  className="w-12 h-12 text-center text-xl font-semibold"
                  value={formData.otp[i] || ""}
                  onChange={(e) => {
                    const newOtp = formData.otp.split('');
                    newOtp[i] = e.target.value;
                    updateFormData("otp", newOtp.join(''));
                    
                    // Auto-focus next input
                    if (e.target.value && i < 5) {
                      const nextInput = document.getElementById(`otp-${i + 1}`) as HTMLInputElement;
                      if (nextInput) nextInput.focus();
                    }
                  }}
                  id={`otp-${i}`}
                />
              ))}
            </div>
            <p className="text-sm text-gray-600">
              Enter the 6-digit verification code
            </p>
          </div>

          <Button
            className="w-full"
            onClick={handleVerifyOTP}
            disabled={!isFormValid() || isLoading}
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Verifying...
              </>
            ) : (
              "Verify OTP"
            )}
          </Button>

          <div className="text-center">
            <p className="text-sm text-gray-600 mb-2">
              Didn't receive the code?
            </p>
            <Button
              variant="link"
              className="text-sm"
              onClick={handleSendOTP}
              disabled={isLoading}
            >
              Resend OTP
            </Button>
          </div>
        </>
      ) : (
        <div className="text-center py-8">
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">OTP Verified!</h3>
          <p className="text-gray-600">Redirecting to your account...</p>
        </div>
      )}

      <div className="text-center">
        <Button
          variant="link"
          className="text-sm"
          onClick={() => {
            setAuthMode("login");
            setOtpSent(false);
            setOtpVerified(false);
          }}
        >
          Back to login
        </Button>
      </div>
    </div>
  );

  const SocialLoginButtons = () => (
    <div className="space-y-3">
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <Separator className="w-full" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3">
        <Button
          variant="outline"
          className="w-full"
          onClick={() => handleSocialLogin("google")}
          disabled={isLoading}
        >
          <Chrome className="h-4 w-4 mr-2" />
          Continue with Google
        </Button>

        <Button
          variant="outline"
          className="w-full"
          onClick={() => handleSocialLogin("facebook")}
          disabled={isLoading}
        >
          <Facebook className="h-4 w-4 mr-2" />
          Continue with Facebook
        </Button>

        <Button
          variant="outline"
          className="w-full"
          onClick={() => handleSocialLogin("apple")}
          disabled={isLoading}
        >
          <Apple className="h-4 w-4 mr-2" />
          Continue with Apple
        </Button>
      </div>
    </div>
  );

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl">
              {authMode === "login" ? "Sign In" : authMode === "signup" ? "Sign Up" : "Verify OTP"}
            </DialogTitle>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {authMode === "login" && <LoginForm />}
          {authMode === "signup" && <SignupForm />}
          {authMode === "otp" && <OTPForm />}

          {authMode !== "otp" && <SocialLoginButtons />}

          <Alert>
            <Shield className="h-4 w-4" />
            <AlertDescription>
              Your data is secure with us. We use industry-standard encryption to protect your information.
            </AlertDescription>
          </Alert>
        </div>
      </DialogContent>
    </Dialog>
  );
}