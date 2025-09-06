import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { StatusBadge } from '@/components/ui/status-badge';
import { PriorityBadge } from '@/components/ui/priority-badge';
import { 
  ArrowLeft, 
  MapPin,
  Calendar,
  FileText,
  User,
  Clock,
  CheckCircle,
  AlertTriangle,
  MessageSquare
} from 'lucide-react';

const ComplaintDetail = () => {
  const { id } = useParams();

  // Mock data for the complaint
  const complaint = {
    id: parseInt(id || '1'),
    title: "Pothole on Main Street",
    category: "Road & Infrastructure",
    status: "in-progress" as "submitted" | "assigned" | "in-progress" | "resolved",
    priority: "high" as const,
    location: "123 Main Street",
    submittedDate: "2024-01-15",
    description: "Large pothole causing traffic issues and potential damage to vehicles. The hole is approximately 2 feet in diameter and 6 inches deep.",
    assignedTo: "City Works Department",
    assignedDate: "2024-01-16",
    expectedResolution: "2024-01-30",
    photo: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w800",
    updates: [
      {
        date: "2024-01-25",
        status: "In Progress",
        message: "Work crew has been dispatched to assess the damage and prepare repair materials.",
        department: "City Works Department"
      },
      {
        date: "2024-01-16",
        status: "Assigned",
        message: "Issue has been assigned to the Road Maintenance team for review and scheduling.",
        department: "City Works Department"
      },
      {
        date: "2024-01-15",
        status: "Submitted",
        message: "Report submitted successfully. Thank you for helping improve our community.",
        department: "System"
      }
    ]
  };

  const getProgressValue = (status: string) => {
    switch (status) {
      case 'submitted': return 25;
      case 'assigned': return 50;
      case 'in-progress': return 75;
      case 'resolved': return 100;
      default: return 0;
    }
  };

  const getProgressColor = (status: string) => {
    switch (status) {
      case 'submitted': return 'bg-blue-600';
      case 'assigned': return 'bg-orange-600';
      case 'in-progress': return 'bg-yellow-600';
      case 'resolved': return 'bg-green-600';
      default: return 'bg-gray-600';
    }
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="bg-white border-b civic-shadow-soft p-4">
        <div className="flex items-center space-x-4">
          <Link to="/my-complaints">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-xl font-bold">Complaint Details</h1>
            <p className="text-sm text-muted-foreground">Track your report progress</p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 space-y-6">
        {/* Main Info Card */}
        <Card className="civic-card-gradient civic-shadow-soft border-0">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <CardTitle className="text-xl">{complaint.title}</CardTitle>
                <div className="flex items-center space-x-2">
                  <StatusBadge status={complaint.status} />
                  <PriorityBadge priority={complaint.priority} />
                </div>
              </div>
              <div className="text-sm text-muted-foreground">
                ID: #{complaint.id}
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="flex items-center space-x-2">
                <FileText className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">Category:</span>
                <span className="font-medium">{complaint.category}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">Submitted:</span>
                <span className="font-medium">{complaint.submittedDate}</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">Location:</span>
                <span className="font-medium">{complaint.location}</span>
              </div>
              <div className="flex items-center space-x-2">
                <User className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">Assigned to:</span>
                <span className="font-medium">{complaint.assignedTo}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Progress Card */}
        <Card className="civic-card-gradient civic-shadow-soft border-0">
          <CardHeader>
            <CardTitle>Progress Status</CardTitle>
            <CardDescription>Track the resolution progress</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Progress</span>
                <span>{getProgressValue(complaint.status)}%</span>
              </div>
              <Progress 
                value={getProgressValue(complaint.status)} 
                className="h-3"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-2 text-center text-sm">
              <div className={`flex flex-col items-center space-y-1 p-2 rounded ${
                complaint.status === 'submitted' || complaint.status === 'assigned' || complaint.status === 'in-progress' || complaint.status === 'resolved'
                  ? 'bg-blue-50 text-blue-700' 
                  : 'text-muted-foreground'
              }`}>
                <CheckCircle className="h-4 w-4" />
                <span>Submitted</span>
              </div>
              <div className={`flex flex-col items-center space-y-1 p-2 rounded ${
                complaint.status === 'assigned' || complaint.status === 'in-progress' || complaint.status === 'resolved'
                  ? 'bg-orange-50 text-orange-700' 
                  : 'text-muted-foreground'
              }`}>
                <User className="h-4 w-4" />
                <span>Assigned</span>
              </div>
              <div className={`flex flex-col items-center space-y-1 p-2 rounded ${
                complaint.status === 'in-progress' || complaint.status === 'resolved'
                  ? 'bg-yellow-50 text-yellow-700' 
                  : 'text-muted-foreground'
              }`}>
                <Clock className="h-4 w-4" />
                <span>In Progress</span>
              </div>
              <div className={`flex flex-col items-center space-y-1 p-2 rounded ${
                complaint.status === 'resolved'
                  ? 'bg-green-50 text-green-700' 
                  : 'text-muted-foreground'
              }`}>
                <CheckCircle className="h-4 w-4" />
                <span>Resolved</span>
              </div>
            </div>
            {complaint.expectedResolution && (
              <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                <div className="flex items-center space-x-2 text-blue-700">
                  <Calendar className="h-4 w-4" />
                  <span className="font-medium">Expected Resolution: {complaint.expectedResolution}</span>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Photo Card */}
        {complaint.photo && (
          <Card className="civic-card-gradient civic-shadow-soft border-0">
            <CardHeader>
              <CardTitle>Attached Photo</CardTitle>
            </CardHeader>
            <CardContent>
              <img 
                src={complaint.photo}
                alt="Issue photo"
                className="w-full max-h-64 object-cover rounded-lg"
              />
            </CardContent>
          </Card>
        )}

        {/* Description Card */}
        <Card className="civic-card-gradient civic-shadow-soft border-0">
          <CardHeader>
            <CardTitle>Description</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground leading-relaxed">
              {complaint.description}
            </p>
          </CardContent>
        </Card>

        {/* Location Map Placeholder */}
        <Card className="civic-card-gradient civic-shadow-soft border-0">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <MapPin className="h-5 w-5" />
              <span>Location</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-48 bg-gray-100 rounded-lg flex items-center justify-center">
              <div className="text-center text-muted-foreground">
                <MapPin className="h-8 w-8 mx-auto mb-2" />
                <p>{complaint.location}</p>
                <p className="text-sm">Map view would be integrated here</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Updates Timeline */}
        <Card className="civic-card-gradient civic-shadow-soft border-0">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <MessageSquare className="h-5 w-5" />
              <span>Status Updates</span>
            </CardTitle>
            <CardDescription>Timeline of your complaint</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {complaint.updates.map((update, index) => (
                <div key={index} className="flex space-x-4">
                  <div className="flex flex-col items-center">
                    <div className={`w-3 h-3 rounded-full ${
                      update.status === 'Resolved' ? 'bg-green-600' :
                      update.status === 'In Progress' ? 'bg-yellow-600' :
                      update.status === 'Assigned' ? 'bg-orange-600' :
                      'bg-blue-600'
                    }`} />
                    {index < complaint.updates.length - 1 && (
                      <div className="w-0.5 h-8 bg-gray-200 mt-2" />
                    )}
                  </div>
                  <div className="flex-1 pb-4">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="font-medium">{update.status}</span>
                      <span className="text-sm text-muted-foreground">•</span>
                      <span className="text-sm text-muted-foreground">{update.date}</span>
                    </div>
                    <p className="text-muted-foreground text-sm">{update.message}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {update.department}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ComplaintDetail;