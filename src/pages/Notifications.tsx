import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowLeft, 
  Bell,
  CheckCircle,
  Clock,
  AlertTriangle,
  MessageSquare,
  MapPin,
  Settings
} from 'lucide-react';

const Notifications = () => {
  // Mock notification data
  const notifications = [
    {
      id: 1,
      title: "Issue Resolved",
      message: "Your pothole report on Main Street has been resolved.",
      type: "resolved",
      time: "2 hours ago",
      isRead: false,
      complaintId: 1
    },
    {
      id: 2,
      title: "Status Update",
      message: "Your street light report has been assigned to the Electric Department.",
      type: "assigned",
      time: "1 day ago",
      isRead: false,
      complaintId: 2
    },
    {
      id: 3,
      title: "New Issue Nearby",
      message: "A water leak has been reported 0.5 miles from your location.",
      type: "nearby",
      time: "2 days ago",
      isRead: true,
      complaintId: null
    },
    {
      id: 4,
      title: "Reminder",
      message: "Don't forget to rate your resolved complaint.",
      type: "reminder",
      time: "3 days ago",
      isRead: true,
      complaintId: 1
    },
    {
      id: 5,
      title: "System Update",
      message: "CivicConnect app has been updated with new features.",
      type: "system",
      time: "1 week ago",
      isRead: true,
      complaintId: null
    }
  ];

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'resolved':
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'assigned':
      case 'in-progress':
        return <Clock className="h-5 w-5 text-orange-600" />;
      case 'nearby':
        return <MapPin className="h-5 w-5 text-blue-600" />;
      case 'reminder':
        return <Bell className="h-5 w-5 text-purple-600" />;
      case 'system':
        return <Settings className="h-5 w-5 text-gray-600" />;
      default:
        return <MessageSquare className="h-5 w-5 text-blue-600" />;
    }
  };

  const getNotificationBadgeColor = (type: string) => {
    switch (type) {
      case 'resolved':
        return 'bg-green-100 text-green-800';
      case 'assigned':
      case 'in-progress':
        return 'bg-orange-100 text-orange-800';
      case 'nearby':
        return 'bg-blue-100 text-blue-800';
      case 'reminder':
        return 'bg-purple-100 text-purple-800';
      case 'system':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-blue-100 text-blue-800';
    }
  };

  const unreadCount = notifications.filter(n => !n.isRead).length;

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
              <h1 className="text-xl font-bold">Notifications</h1>
              <p className="text-sm text-muted-foreground">
                Stay updated on your reports
              </p>
            </div>
          </div>
          {unreadCount > 0 && (
            <Badge variant="secondary" className="bg-primary text-primary-foreground">
              {unreadCount} new
            </Badge>
          )}
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        {/* Notification Settings */}
        <Card className="civic-card-gradient civic-shadow-soft border-0 mb-6">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Settings className="h-5 w-5" />
              <span>Notification Settings</span>
            </CardTitle>
            <CardDescription>
              Manage how you receive updates
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                <div className="flex items-center space-x-2">
                  <Bell className="h-4 w-4 text-blue-600" />
                  <span className="text-sm font-medium">Push Notifications</span>
                </div>
                <div className="w-4 h-4 bg-blue-600 rounded-full" />
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-2">
                  <MessageSquare className="h-4 w-4 text-gray-600" />
                  <span className="text-sm font-medium">Email Updates</span>
                </div>
                <div className="w-4 h-4 bg-gray-600 rounded-full" />
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4 text-gray-600" />
                  <span className="text-sm font-medium">Nearby Issues</span>
                </div>
                <div className="w-4 h-4 bg-gray-300 rounded-full" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Notifications List */}
        <div className="space-y-4">
          {notifications.map((notification) => (
            <Card 
              key={notification.id} 
              className={`civic-card-gradient civic-shadow-soft border-0 civic-transition hover:civic-shadow-medium ${
                !notification.isRead ? 'bg-gradient-to-r from-blue-50 to-white' : ''
              }`}
            >
              <CardContent className="p-4">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 mt-1">
                    {getNotificationIcon(notification.type)}
                  </div>
                  <div className="flex-1 space-y-2">
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <h3 className={`font-medium ${!notification.isRead ? 'text-foreground' : 'text-muted-foreground'}`}>
                            {notification.title}
                          </h3>
                          {!notification.isRead && (
                            <div className="w-2 h-2 bg-primary rounded-full" />
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {notification.message}
                        </p>
                      </div>
                      <div className="flex flex-col items-end space-y-2">
                        <span className="text-xs text-muted-foreground">
                          {notification.time}
                        </span>
                        <Badge 
                          variant="secondary" 
                          className={`text-xs ${getNotificationBadgeColor(notification.type)}`}
                        >
                          {notification.type}
                        </Badge>
                      </div>
                    </div>
                    {notification.complaintId && (
                      <div className="pt-2">
                        <Link to={`/complaint/${notification.complaintId}`}>
                          <Button variant="outline" size="sm">
                            View Complaint
                          </Button>
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {notifications.length === 0 && (
          <Card className="civic-card-gradient civic-shadow-soft border-0">
            <CardContent className="p-8 text-center">
              <Bell className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">No notifications yet</h3>
              <p className="text-muted-foreground mb-4">
                You'll receive updates here when there are changes to your reports.
              </p>
              <Link to="/report-issue">
                <Button className="civic-gradient">
                  Report Your First Issue
                </Button>
              </Link>
            </CardContent>
          </Card>
        )}

        {/* Mark All Read */}
        {unreadCount > 0 && (
          <div className="mt-6 text-center">
            <Button variant="outline">
              Mark All as Read
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Notifications;