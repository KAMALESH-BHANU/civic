import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  FileText, 
  MapPin, 
  Bell, 
  User, 
  Camera,
  Clock,
  CheckCircle,
  AlertTriangle
} from 'lucide-react';
import civicHeroBg from '@/assets/civic-hero-bg.jpg';

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div 
        className="relative h-64 bg-cover bg-center civic-hero-gradient"
        style={{
          backgroundImage: `linear-gradient(135deg, rgba(59, 130, 246, 0.9) 0%, rgba(147, 197, 253, 0.9) 100%), url(${civicHeroBg})`
        }}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white space-y-4">
            <h1 className="text-4xl font-bold">Welcome to CivicConnect</h1>
            <p className="text-xl opacity-90">Make your community better, one report at a time</p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 -mt-20 relative z-10">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="civic-card-gradient civic-shadow-soft border-0">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-blue-100 flex items-center justify-center">
                <FileText className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-2xl font-bold text-primary">12</h3>
              <p className="text-muted-foreground">Reports Submitted</p>
            </CardContent>
          </Card>
          <Card className="civic-card-gradient civic-shadow-soft border-0">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-green-100 flex items-center justify-center">
                <CheckCircle className="h-6 w-6 text-success" />
              </div>
              <h3 className="text-2xl font-bold text-success">8</h3>
              <p className="text-muted-foreground">Issues Resolved</p>
            </CardContent>
          </Card>
          <Card className="civic-card-gradient civic-shadow-soft border-0">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-orange-100 flex items-center justify-center">
                <Clock className="h-6 w-6 text-warning" />
              </div>
              <h3 className="text-2xl font-bold text-warning">4</h3>
              <p className="text-muted-foreground">In Progress</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Link to="/report-issue">
            <Card className="civic-card-gradient civic-shadow-soft border-0 civic-transition hover:scale-105 hover:civic-shadow-medium cursor-pointer">
              <CardHeader>
                <div className="w-16 h-16 mx-auto mb-4 rounded-full civic-gradient flex items-center justify-center">
                  <Camera className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-center text-xl">Report Issue</CardTitle>
                <CardDescription className="text-center">
                  Report a new civic issue in your community
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>

          <Link to="/my-complaints">
            <Card className="civic-card-gradient civic-shadow-soft border-0 civic-transition hover:scale-105 hover:civic-shadow-medium cursor-pointer">
              <CardHeader>
                <div className="w-16 h-16 mx-auto mb-4 rounded-full civic-gradient flex items-center justify-center">
                  <FileText className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-center text-xl">My Complaints</CardTitle>
                <CardDescription className="text-center">
                  Track your submitted reports and their status
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>

          <Link to="/nearby-issues">
            <Card className="civic-card-gradient civic-shadow-soft border-0 civic-transition hover:scale-105 hover:civic-shadow-medium cursor-pointer">
              <CardHeader>
                <div className="w-16 h-16 mx-auto mb-4 rounded-full civic-gradient flex items-center justify-center">
                  <MapPin className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-center text-xl">Nearby Issues</CardTitle>
                <CardDescription className="text-center">
                  See what&apos;s happening in your area
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>
        </div>

        {/* Recent Activity */}
        <Card className="civic-card-gradient civic-shadow-soft border-0 mb-8">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Your latest civic engagement</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-4 p-4 rounded-lg bg-green-50">
              <CheckCircle className="h-6 w-6 text-success" />
              <div className="flex-1">
                <p className="font-medium">Pothole on Main Street</p>
                <p className="text-sm text-muted-foreground">Status updated to Resolved</p>
              </div>
              <span className="text-sm text-muted-foreground">2 hours ago</span>
            </div>
            <div className="flex items-center space-x-4 p-4 rounded-lg bg-orange-50">
              <Clock className="h-6 w-6 text-warning" />
              <div className="flex-1">
                <p className="font-medium">Broken Street Light</p>
                <p className="text-sm text-muted-foreground">Assigned to Electric Department</p>
              </div>
              <span className="text-sm text-muted-foreground">1 day ago</span>
            </div>
            <div className="flex items-center space-x-4 p-4 rounded-lg bg-blue-50">
              <AlertTriangle className="h-6 w-6 text-primary" />
              <div className="flex-1">
                <p className="font-medium">Waste Collection Issue</p>
                <p className="text-sm text-muted-foreground">Report submitted successfully</p>
              </div>
              <span className="text-sm text-muted-foreground">3 days ago</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t civic-shadow-soft">
        <div className="flex justify-around py-2">
          <Link to="/dashboard" className="flex flex-col items-center p-2 text-primary">
            <FileText className="h-6 w-6" />
            <span className="text-xs mt-1">Home</span>
          </Link>
          <Link to="/notifications" className="flex flex-col items-center p-2 text-muted-foreground hover:text-primary">
            <Bell className="h-6 w-6" />
            <span className="text-xs mt-1">Alerts</span>
          </Link>
          <Link to="/report-issue" className="flex flex-col items-center p-2 text-muted-foreground hover:text-primary">
            <Camera className="h-6 w-6" />
            <span className="text-xs mt-1">Report</span>
          </Link>
          <Link to="/nearby-issues" className="flex flex-col items-center p-2 text-muted-foreground hover:text-primary">
            <MapPin className="h-6 w-6" />
            <span className="text-xs mt-1">Nearby</span>
          </Link>
          <Link to="/profile" className="flex flex-col items-center p-2 text-muted-foreground hover:text-primary">
            <User className="h-6 w-6" />
            <span className="text-xs mt-1">Profile</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;