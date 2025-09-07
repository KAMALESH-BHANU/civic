import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Camera, MapPin, Upload, Mic, MicOff, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Webcam from "react-webcam";

const ReportIssue = () => {
  const [formData, setFormData] = useState({
    category: "",
    priority: "",
    description: "",
    location: "Current Location (GPS)",
  });

  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [showCameraModal, setShowCameraModal] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [finalTranscript, setFinalTranscript] = useState(""); // ✅ store accumulated speech

  const webcamRef = useRef<Webcam>(null);
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  const navigate = useNavigate();
  const { toast } = useToast();

  const categories = [
    "Waste Management",
    "Road & Infrastructure",
    "Street Lighting",
    "Water & Sewage",
    "Public Safety",
    "Parks & Recreation",
    "Noise Pollution",
    "Other",
  ];

  const priorities = [
    { value: "low", label: "Low" },
    { value: "medium", label: "Medium" },
    { value: "high", label: "High" },
    { value: "critical", label: "Critical" },
  ];

  // Camera functions
  const startCamera = () => {
    setCapturedImage(null);
    setShowCameraModal(true);
  };

  const capturePhoto = () => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      if (imageSrc) setCapturedImage(imageSrc);
    }
  };

  const savePhoto = () => {
    if (capturedImage) {
      setSelectedImage(capturedImage);
      setShowCameraModal(false);
      toast({
        title: "Photo saved successfully!",
        description: "Your image has been attached to the report.",
      });
    }
  };

  // Gallery upload
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedImage(reader.result as string);
        toast({
          title: "Photo uploaded successfully!",
          description: "Your image has been attached to the report.",
        });
      };
      reader.readAsDataURL(file);
    }
  };

  // GPS location
  const handleLocationChange = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setFormData(prev => ({ ...prev, location: `GPS: ${latitude.toFixed(6)}, ${longitude.toFixed(6)}` }));
          toast({ title: "Location updated!", description: "Using your current GPS location." });
        },
        (error) => {
          console.error(error);
          toast({ title: "Location access denied", description: "Enable location or enter manually.", variant: "destructive" });
        }
      );
    } else {
      toast({ title: "GPS not supported", description: "Your device doesn't support GPS.", variant: "destructive" });
    }
  };

  // ✅ Voice recording (continuous, accumulates text)
  const handleVoiceRecording = () => {
    const SpeechRecognitionClass = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognitionClass) {
      toast({ title: "Not supported", description: "Your browser does not support voice recognition.", variant: "destructive" });
      return;
    }

    if (!isRecording) {
      recognitionRef.current = new SpeechRecognitionClass();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = "en-US";

      recognitionRef.current.onresult = (event: SpeechRecognitionEvent) => {
        let interimTranscript = "";
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcriptPiece = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            setFinalTranscript(prev => prev + transcriptPiece + " "); // accumulate finalized speech
          } else {
            interimTranscript += transcriptPiece; // live interim
          }
        }
        // Show final + interim together
        setFormData(prev => ({ ...prev, description: finalTranscript + interimTranscript }));
      };

      recognitionRef.current.start();
      setIsRecording(true);
      toast({ title: "Recording started", description: "Speak now, your words will appear in the description." });
    } else {
      recognitionRef.current?.stop();
      setIsRecording(false);
      toast({ title: "Recording stopped", description: "Voice note added to description." });
      setFormData(prev => ({ ...prev, description: finalTranscript })); // save final text
    }
  };

  // Form submit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({ title: "Issue Reported Successfully!", description: "Your report has been submitted." });
    setTimeout(() => navigate("/my-complaints"), 2000);
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="bg-white border-b civic-shadow-soft p-4">
        <div className="flex items-center space-x-4">
          <Link to="/dashboard">
            <Button variant="ghost" size="sm"><ArrowLeft className="h-4 w-4" /></Button>
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
              <CardTitle className="flex items-center space-x-2"><Camera className="h-5 w-5" /><span>Upload Photo</span></CardTitle>
              <CardDescription>Take a photo or upload from gallery</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border-2 border-dashed border-muted rounded-lg p-8 text-center">
                {selectedImage ? (
                  <div className="space-y-4">
                    <img src={selectedImage} alt="Selected issue" className="max-h-48 mx-auto rounded-lg" />
                    <Button type="button" variant="outline" onClick={() => setSelectedImage(null)}>Remove Photo</Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <Upload className="h-12 w-12 mx-auto text-muted-foreground" />
                    <div className="space-y-3">
                      <Button type="button" className="civic-gradient w-full" onClick={startCamera}>
                        <Camera className="h-4 w-4 mr-2" /> Take Photo
                      </Button>
                      <div>
                        <input id="photo-upload" type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                        <label htmlFor="photo-upload" className="w-full inline-block">
                          <Button type="button" className="w-full civic-gradient">Select from Gallery</Button>
                        </label>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Camera Modal */}
          {showCameraModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
              <div className="bg-white rounded-lg p-4 w-[90%] max-w-md text-center">
                <h2 className="text-lg font-semibold mb-2">Take a Photo</h2>
                {!capturedImage ? (
                  <>
                    <Webcam audio={false} ref={webcamRef} screenshotFormat="image/png"
                      width={320} height={240} videoConstraints={{ facingMode: "environment" }}
                      style={{ borderRadius: 8 }}
                    />
                    <div className="flex justify-center mt-4 space-x-2">
                      <Button onClick={capturePhoto}>Capture</Button>
                      <Button variant="destructive" onClick={() => setShowCameraModal(false)}>Cancel</Button>
                    </div>
                  </>
                ) : (
                  <>
                    <img src={capturedImage} alt="Captured" style={{ width: 320, borderRadius: 8 }} />
                    <div className="flex justify-center mt-4 space-x-2">
                      <Button onClick={() => setCapturedImage(null)}>Retake</Button>
                      <Button onClick={savePhoto}>Save</Button>
                    </div>
                  </>
                )}
              </div>
            </div>
          )}

          {/* Location */}
          <Card className="civic-card-gradient civic-shadow-soft border-0">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2"><MapPin className="h-5 w-5" /><span>Location</span></CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2 p-3 bg-green-50 rounded-lg">
                <MapPin className="h-5 w-5 text-success" />
                <span className="text-success font-medium">{formData.location}</span>
              </div>
              <Button variant="outline" className="mt-3" type="button" onClick={handleLocationChange}>Change Location</Button>
            </CardContent>
          </Card>

          {/* Category and Priority */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="civic-card-gradient civic-shadow-soft border-0">
              <CardHeader><CardTitle>Category</CardTitle><CardDescription>Select the type of issue</CardDescription></CardHeader>
              <CardContent>
                <Select onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}>
                  <SelectTrigger><SelectValue placeholder="Choose category" /></SelectTrigger>
                  <SelectContent>{categories.map(cat => <SelectItem key={cat} value={cat}>{cat}</SelectItem>)}</SelectContent>
                </Select>
              </CardContent>
            </Card>
            <Card className="civic-card-gradient civic-shadow-soft border-0">
              <CardHeader><CardTitle>Priority</CardTitle><CardDescription>How urgent is this issue?</CardDescription></CardHeader>
              <CardContent>
                <Select onValueChange={(value) => setFormData(prev => ({ ...prev, priority: value }))}>
                  <SelectTrigger><SelectValue placeholder="Select priority" /></SelectTrigger>
                  <SelectContent>{priorities.map(p => <SelectItem key={p.value} value={p.value}>{p.label}</SelectItem>)}</SelectContent>
                </Select>
              </CardContent>
            </Card>
          </div>

          {/* Description + Voice */}
          <Card className="civic-card-gradient civic-shadow-soft border-0">
            <CardHeader><CardTitle>Description</CardTitle><CardDescription>Provide details about the issue</CardDescription></CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                placeholder="Describe the issue..."
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                className="min-h-[120px]"
                required
              />
              <div className="flex items-center space-x-2">
                <Button type="button" variant={isRecording ? "destructive" : "outline"} size="sm" onClick={handleVoiceRecording}>
                  {isRecording ? <><MicOff className="h-4 w-4 mr-2" />Stop Recording</> : <><Mic className="h-4 w-4 mr-2" />Voice Note</>}
                </Button>
                {isRecording && <span className="text-sm text-destructive animate-pulse">Recording...</span>}
              </div>
            </CardContent>
          </Card>

          {/* Submit */}
          <Card className="civic-card-gradient civic-shadow-soft border-0">
            <CardContent className="pt-6">
              <Button type="submit" className="w-full civic-gradient civic-transition hover:scale-105" size="lg">
                <Send className="h-5 w-5 mr-2" /> Submit Report
              </Button>
            </CardContent>
          </Card>
        </form>
      </div>
    </div>
  );
};

export default ReportIssue;
