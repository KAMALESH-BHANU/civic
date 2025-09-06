import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { StatusBadge } from '@/components/ui/status-badge';
import { PriorityBadge } from '@/components/ui/priority-badge';
import { 
  ArrowLeft, 
  Filter,
  MapPin,
  Calendar,
  FileText,
  Eye
} from 'lucide-react';

const MyComplaints = () => {
  const [filterStatus, setFilterStatus] = useState<string>('all');

  // Mock data for complaints
  const complaints = [
    {
      id: 1,
      title: "Pothole on Main Street",
      category: "Road & Infrastructure",
      status: "resolved" as const,
      priority: "high" as const,
      location: "123 Main Street",
      submittedDate: "2024-01-15",
      description: "Large pothole causing traffic issues",
      assignedTo: "City Works Department"
    },
    {
      id: 2,
      title: "Broken Street Light",
      category: "Street Lighting",
      status: "in-progress" as const,
      priority: "medium" as const,
      location: "Oak Avenue & 5th Street",
      submittedDate: "2024-01-20",
      description: "Street light has been flickering for weeks",
      assignedTo: "Electric Department"
    },
    {
      id: 3,
      title: "Waste Collection Issue",
      category: "Waste Management",
      status: "assigned" as const,
      priority: "low" as const,
      location: "Elm Street Residential Area",
      submittedDate: "2024-01-22",
      description: "Garbage not collected for 3 days",
      assignedTo: "Sanitation Department"
    },
    {
      id: 4,
      title: "Park Vandalism",
      category: "Parks & Recreation",
      status: "submitted" as const,
      priority: "critical" as const,
      location: "Central Park",
      submittedDate: "2024-01-25",
      description: "Graffiti on playground equipment",
      assignedTo: null
    }
  ];

  const filteredComplaints = filterStatus === 'all' 
    ? complaints 
    : complaints.filter(complaint => complaint.status === filterStatus);

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
              <h1 className="text-xl font-bold">My Complaints</h1>
              <p className="text-sm text-muted-foreground">Track your submitted reports</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="submitted">Submitted</SelectItem>
                <SelectItem value="assigned">Assigned</SelectItem>
                <SelectItem value="in-progress">In Progress</SelectItem>
                <SelectItem value="resolved">Resolved</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        {/* Summary Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <Card className="civic-card-gradient civic-shadow-soft border-0">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-primary">{complaints.length}</div>
              <div className="text-sm text-muted-foreground">Total</div>
            </CardContent>
          </Card>
          <Card className="civic-card-gradient civic-shadow-soft border-0">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-success">
                {complaints.filter(c => c.status === 'resolved').length}
              </div>
              <div className="text-sm text-muted-foreground">Resolved</div>
            </CardContent>
          </Card>
          <Card className="civic-card-gradient civic-shadow-soft border-0">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-warning">
                {complaints.filter(c => c.status === 'in-progress').length}
              </div>
              <div className="text-sm text-muted-foreground">In Progress</div>
            </CardContent>
          </Card>
          <Card className="civic-card-gradient civic-shadow-soft border-0">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">
                {complaints.filter(c => c.status === 'submitted').length}
              </div>
              <div className="text-sm text-muted-foreground">Submitted</div>
            </CardContent>
          </Card>
        </div>

        {/* Complaints List */}
        <div className="space-y-4">
          {filteredComplaints.map((complaint) => (
            <Card key={complaint.id} className="civic-card-gradient civic-shadow-soft border-0">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <CardTitle className="text-lg">{complaint.title}</CardTitle>
                    <div className="flex items-center space-x-2">
                      <StatusBadge status={complaint.status} />
                      <PriorityBadge priority={complaint.priority} />
                    </div>
                  </div>
                  <Link to={`/complaint/${complaint.id}`}>
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4 mr-2" />
                      View
                    </Button>
                  </Link>
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
                  {complaint.assignedTo && (
                    <div className="flex items-center space-x-2">
                      <span className="text-muted-foreground">Assigned to:</span>
                      <span className="font-medium">{complaint.assignedTo}</span>
                    </div>
                  )}
                </div>
                <p className="text-muted-foreground">{complaint.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredComplaints.length === 0 && (
          <Card className="civic-card-gradient civic-shadow-soft border-0">
            <CardContent className="p-8 text-center">
              <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">No complaints found</h3>
              <p className="text-muted-foreground mb-4">
                {filterStatus === 'all' 
                  ? "You haven't submitted any complaints yet." 
                  : `No complaints with status "${filterStatus}" found.`}
              </p>
              <Link to="/report-issue">
                <Button className="civic-gradient">
                  Report Your First Issue
                </Button>
              </Link>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default MyComplaints;