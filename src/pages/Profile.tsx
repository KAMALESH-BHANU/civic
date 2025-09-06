import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  ArrowLeft, 
  User,
  Mail,
  Phone,
  MapPin,
  Bell,
  Shield,
  Globe,
  LogOut,
  Edit,
  Camera,
  Settings,
  HelpCircle,
  FileText
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    fullName: "John Doe",
    email: "john.doe@email.com",
    phone: "+1 (555) 123-4567",
    address: "123 Main Street, City, State 12345",
    language: "en",
    notifications: {
      push: true,
      email: true,
      sms: false
    }
  });
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSave = () => {
    setIsEditing(false);
    toast({
      title: "Profile Updated",
      description: "Your profile information has been saved successfully.",
    });
  };

  const handleLogout = () => {
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
    setTimeout(() => {
      navigate('/login');
    }, 1500);
  };

  const stats = {
    totalReports: 12,
    resolvedIssues: 8,
    communityRank: "Active Citizen",
    memberSince: "January 2024"
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="bg-white border-b civic-shadow-soft p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link to="/dashboard">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <div>
              <h1 className="text-xl font-bold">Profile</h1>
              <p className="text-sm text-muted-foreground">Manage your account</p>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsEditing(!isEditing)}
          >
            <Edit className="h-4 w-4 mr-2" />
            {isEditing ? 'Cancel' : 'Edit'}
          </Button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 space-y-6">
        {/* Profile Header */}
        <Card className="civic-card-gradient civic-shadow-soft border-0">
          <CardContent className="p-6">
            <div className="flex items-center space-x-6">
              <div className="relative">
                <Avatar className="h-24 w-24">
                  <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400" />
                  <AvatarFallback className="text-xl bg-primary text-primary-foreground">
                    {profileData.fullName.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                {isEditing && (
                  <Button
                    size="sm"
                    className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full civic-gradient"
                  >
                    <Camera className="h-4 w-4" />
                  </Button>
                )}
              </div>
              <div className="flex-1 space-y-2">
                <h2 className="text-2xl font-bold">{profileData.fullName}</h2>
                <p className="text-muted-foreground">{stats.communityRank}</p>
                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                  <span>Member since {stats.memberSince}</span>
                  <span>•</span>
                  <span>{stats.totalReports} reports submitted</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="civic-card-gradient civic-shadow-soft border-0">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-primary">{stats.totalReports}</div>
              <div className="text-sm text-muted-foreground">Total Reports</div>
            </CardContent>
          </Card>
          <Card className="civic-card-gradient civic-shadow-soft border-0">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-success">{stats.resolvedIssues}</div>
              <div className="text-sm text-muted-foreground">Resolved</div>
            </CardContent>
          </Card>
          <Card className="civic-card-gradient civic-shadow-soft border-0">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-warning">{stats.totalReports - stats.resolvedIssues}</div>
              <div className="text-sm text-muted-foreground">Pending</div>
            </CardContent>
          </Card>
          <Card className="civic-card-gradient civic-shadow-soft border-0">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">4.8</div>
              <div className="text-sm text-muted-foreground">Rating</div>
            </CardContent>
          </Card>
        </div>

        {/* Personal Information */}
        <Card className="civic-card-gradient civic-shadow-soft border-0">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <User className="h-5 w-5" />
              <span>Personal Information</span>
            </CardTitle>
            <CardDescription>
              {isEditing ? "Update your personal details" : "Your account information"}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name</Label>
                {isEditing ? (
                  <Input
                    id="fullName"
                    value={profileData.fullName}
                    onChange={(e) => setProfileData(prev => ({ ...prev, fullName: e.target.value }))}
                  />
                ) : (
                  <div className="flex items-center space-x-2 p-3 bg-muted rounded-md">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <span>{profileData.fullName}</span>
                  </div>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                {isEditing ? (
                  <Input
                    id="email"
                    type="email"
                    value={profileData.email}
                    onChange={(e) => setProfileData(prev => ({ ...prev, email: e.target.value }))}
                  />
                ) : (
                  <div className="flex items-center space-x-2 p-3 bg-muted rounded-md">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span>{profileData.email}</span>
                  </div>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                {isEditing ? (
                  <Input
                    id="phone"
                    type="tel"
                    value={profileData.phone}
                    onChange={(e) => setProfileData(prev => ({ ...prev, phone: e.target.value }))}
                  />
                ) : (
                  <div className="flex items-center space-x-2 p-3 bg-muted rounded-md">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span>{profileData.phone}</span>
                  </div>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="language">Language</Label>
                {isEditing ? (
                  <Select value={profileData.language} onValueChange={(value) => setProfileData(prev => ({ ...prev, language: value }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="es">Spanish</SelectItem>
                      <SelectItem value="fr">French</SelectItem>
                    </SelectContent>
                  </Select>
                ) : (
                  <div className="flex items-center space-x-2 p-3 bg-muted rounded-md">
                    <Globe className="h-4 w-4 text-muted-foreground" />
                    <span>English</span>
                  </div>
                )}
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              {isEditing ? (
                <Input
                  id="address"
                  value={profileData.address}
                  onChange={(e) => setProfileData(prev => ({ ...prev, address: e.target.value }))}
                />
              ) : (
                <div className="flex items-center space-x-2 p-3 bg-muted rounded-md">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span>{profileData.address}</span>
                </div>
              )}
            </div>
            {isEditing && (
              <div className="flex space-x-2 pt-4">
                <Button onClick={handleSave} className="civic-gradient">
                  Save Changes
                </Button>
                <Button variant="outline" onClick={() => setIsEditing(false)}>
                  Cancel
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Notification Preferences */}
        <Card className="civic-card-gradient civic-shadow-soft border-0">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Bell className="h-5 w-5" />
              <span>Notification Preferences</span>
            </CardTitle>
            <CardDescription>
              Choose how you want to receive updates
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Bell className="h-5 w-5 text-blue-600" />
                  <div>
                    <p className="font-medium">Push Notifications</p>
                    <p className="text-sm text-muted-foreground">Receive instant updates on your device</p>
                  </div>
                </div>
                <div className="w-5 h-5 bg-blue-600 rounded-full" />
              </div>
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-green-600" />
                  <div>
                    <p className="font-medium">Email Updates</p>
                    <p className="text-sm text-muted-foreground">Get detailed updates via email</p>
                  </div>
                </div>
                <div className="w-5 h-5 bg-green-600 rounded-full" />
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-gray-600" />
                  <div>
                    <p className="font-medium">SMS Alerts</p>
                    <p className="text-sm text-muted-foreground">Urgent updates via text message</p>
                  </div>
                </div>
                <div className="w-5 h-5 bg-gray-300 rounded-full" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="civic-card-gradient civic-shadow-soft border-0">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Settings className="h-5 w-5" />
              <span>Quick Actions</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Link to="/my-complaints">
              <Button variant="ghost" className="w-full justify-start">
                <FileText className="h-4 w-4 mr-3" />
                View My Reports
              </Button>
            </Link>
            <Button variant="ghost" className="w-full justify-start">
              <Shield className="h-4 w-4 mr-3" />
              Privacy Settings
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <HelpCircle className="h-4 w-4 mr-3" />
              Help & Support
            </Button>
            <Button 
              variant="ghost" 
              className="w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/10"
              onClick={handleLogout}
            >
              <LogOut className="h-4 w-4 mr-3" />
              Sign Out
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Profile;