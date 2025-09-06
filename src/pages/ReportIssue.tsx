import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { 
  ArrowLeft, 
  Camera, 
  MapPin, 
  Upload,
  Mic,
  MicOff,
  Send
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const ReportIssue = () => {
  const [formData, setFormData] = useState({
    category: '',
    priority: '',
    description: '',
    location: 'Current Location (GPS)'
  });
  const [isRecording, setIsRecording] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  const categories = [
    'Waste Management',
    'Road & Infrastructure',
    'Street Lighting',
    'Water & Sewage',
    'Public Safety',
    'Parks & Recreation',
    'Noise Pollution',
    'Other'
  ];

  const priorities = [
    { value: 'low', label: 'Low' },
    { value: 'medium', label: 'Medium' },
    { value: 'high', label: 'High' },
    { value: 'critical', label: 'Critical' }
  ];

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleVoiceRecording = () => {
    setIsRecording(!isRecording);
    // Voice recording logic would go here
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    toast({
      title: "Issue Reported Successfully!",
      description: "Your report has been submitted and will be reviewed by the relevant department.",
    });
    
    setTimeout(() => {
      navigate('/my-complaints');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="bg-white border-b civic-shadow-soft p-4">
        <div className="flex items-center space-x-4">
          <Link to="/dashboard">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-xl font-bold">Report Issue</h1>
            <p className="text-sm text-muted-foreground">Help improve your community</p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Photo Upload */}
          <Card className="civic-card-gradient civic-shadow-soft border-0">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Camera className="h-5 w-5" />
                <span>Upload Photo</span>
              </CardTitle>
              <CardDescription>
                Take a photo or upload from gallery
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border-2 border-dashed border-muted rounded-lg p-8 text-center">
                {selectedImage ? (
                  <div className="space-y-4">
                    <img 
                      src={selectedImage} 
                      alt="Selected issue" 
                      className="max-h-48 mx-auto rounded-lg"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setSelectedImage(null)}
                    >
                      Remove Photo
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <Upload className="h-12 w-12 mx-auto text-muted-foreground" />
                    <div>
                      <Label htmlFor="photo-upload" className="cursor-pointer">
                        <Button type="button" className="civic-gradient">
                          <Camera className="h-4 w-4 mr-2" />
                          Take Photo
                        </Button>
                      </Label>
                      <Input
                        id="photo-upload"
                        type="file"
                        accept="image/*"
                        capture="environment"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Or tap to select from gallery
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Location */}
          <Card className="civic-card-gradient civic-shadow-soft border-0">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <MapPin className="h-5 w-5" />
                <span>Location</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2 p-3 bg-green-50 rounded-lg">
                <MapPin className="h-5 w-5 text-success" />
                <span className="text-success font-medium">{formData.location}</span>
              </div>
              <Button variant="outline" className="mt-3" type="button">
                Change Location
              </Button>
            </CardContent>
          </Card>

          {/* Category and Priority */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="civic-card-gradient civic-shadow-soft border-0">
              <CardHeader>
                <CardTitle>Category</CardTitle>
                <CardDescription>Select the type of issue</CardDescription>
              </CardHeader>
              <CardContent>
                <Select onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>

            <Card className="civic-card-gradient civic-shadow-soft border-0">
              <CardHeader>
                <CardTitle>Priority</CardTitle>
                <CardDescription>How urgent is this issue?</CardDescription>
              </CardHeader>
              <CardContent>
                <Select onValueChange={(value) => setFormData(prev => ({ ...prev, priority: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    {priorities.map((priority) => (
                      <SelectItem key={priority.value} value={priority.value}>
                        {priority.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>
          </div>

          {/* Description */}
          <Card className="civic-card-gradient civic-shadow-soft border-0">
            <CardHeader>
              <CardTitle>Description</CardTitle>
              <CardDescription>Provide details about the issue</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                placeholder="Describe the issue in detail..."
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                className="min-h-[120px]"
                required
              />
              <div className="flex items-center space-x-2">
                <Button
                  type="button"
                  variant={isRecording ? "destructive" : "outline"}
                  size="sm"
                  onClick={handleVoiceRecording}
                >
                  {isRecording ? (
                    <>
                      <MicOff className="h-4 w-4 mr-2" />
                      Stop Recording
                    </>
                  ) : (
                    <>
                      <Mic className="h-4 w-4 mr-2" />
                      Voice Note
                    </>
                  )}
                </Button>
                {isRecording && (
                  <span className="text-sm text-destructive animate-pulse">Recording...</span>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Submit Button */}
          <Card className="civic-card-gradient civic-shadow-soft border-0">
            <CardContent className="pt-6">
              <Button 
                type="submit" 
                className="w-full civic-gradient civic-transition hover:scale-105"
                size="lg"
              >
                <Send className="h-5 w-5 mr-2" />
                Submit Report
              </Button>
            </CardContent>
          </Card>
        </form>
      </div>
    </div>
  );
};

export default ReportIssue;