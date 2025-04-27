
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Fingerprint } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const QRScanPage: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [scanning, setScanning] = useState(false);
  
  const handleScanComplete = () => {
    setScanning(false);
    toast({
      title: "Attendance Recorded",
      description: "Your attendance has been successfully recorded.",
      variant: "default",
    });
    
    // Navigate back after a delay to show the toast
    setTimeout(() => {
      navigate('/');
    }, 2000);
  };
  
  return (
    <div className="container max-w-md mx-auto p-4 space-y-6">
      <Button 
        variant="outline" 
        onClick={() => navigate('/')}
        className="mb-4"
      >
        Back to Dashboard
      </Button>
      
      <Card>
        <CardHeader className="text-center">
          <CardTitle>Fingerprint Authentication</CardTitle>
          <CardDescription>Place your finger on the scanner to record your attendance</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center space-y-6">
            <div className={`w-32 h-32 rounded-full bg-muted flex items-center justify-center transition-all duration-300 ${scanning ? 'animate-pulse' : ''}`}>
              <Fingerprint className={`h-16 w-16 ${scanning ? 'text-primary animate-pulse' : 'text-muted-foreground'}`} />
            </div>
            
            {!scanning ? (
              <Button 
                onClick={() => setScanning(true)}
                className="w-full bg-dccp-primary hover:bg-dccp-secondary"
              >
                Start Scanning
              </Button>
            ) : (
              <div className="space-y-4 w-full">
                <p className="text-center text-muted-foreground animate-pulse">
                  Scanning fingerprint...
                </p>
                <div className="flex justify-center gap-2">
                  <Button variant="outline" onClick={() => setScanning(false)}>
                    Cancel
                  </Button>
                  <Button 
                    onClick={handleScanComplete}
                    className="bg-dccp-primary hover:bg-dccp-secondary"
                  >
                    Simulate Scan
                  </Button>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default QRScanPage;

