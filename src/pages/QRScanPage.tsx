
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, Fingerprint, QrCode } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const QRScanPage: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [scanning, setScanning] = useState(false);
  
  const handleScanComplete = () => {
    setScanning(false);
    toast({
      title: "Attendance Recorded",
      description: "Your attendance has been successfully recorded.",
      variant: "success",
    });
    
    // Navigate back after a delay to show the toast
    setTimeout(() => {
      navigate('/');
    }, 2000);
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <Button variant="outline" size="icon" onClick={() => navigate('/')}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h2 className="text-3xl font-bold tracking-tight">Record Attendance</h2>
      </div>
      
      <Tabs defaultValue="qr" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="qr">QR Code</TabsTrigger>
          <TabsTrigger value="biometric">Biometric</TabsTrigger>
        </TabsList>
        <TabsContent value="qr">
          <Card>
            <CardHeader>
              <CardTitle>QR Code Scanning</CardTitle>
              <CardDescription>Scan the QR code displayed by your instructor</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center">
              {!scanning ? (
                <div className="text-center space-y-4">
                  <div className="w-64 h-64 bg-muted rounded-lg flex items-center justify-center">
                    <QrCode className="h-16 w-16 text-muted-foreground" />
                  </div>
                  <Button 
                    onClick={() => setScanning(true)}
                    className="bg-dccp-primary hover:bg-dccp-secondary"
                  >
                    Start Scanning
                  </Button>
                </div>
              ) : (
                <div className="relative w-full max-w-md">
                  <div className="w-full aspect-square bg-black rounded-lg overflow-hidden">
                    <div className="qr-scanner-overlay w-full h-full">
                      <div className="scan-line"></div>
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2/3 h-2/3 border-2 border-dccp-accent rounded-lg"></div>
                    </div>
                  </div>
                  <div className="mt-4 text-center">
                    <p className="text-muted-foreground">Scanning for QR code...</p>
                    <div className="flex justify-center space-x-2 mt-4">
                      <Button variant="outline" onClick={() => setScanning(false)}>
                        Cancel
                      </Button>
                      {/* For demo purposes, this button simulates a successful scan */}
                      <Button onClick={handleScanComplete} className="bg-dccp-primary hover:bg-dccp-secondary">
                        Simulate Successful Scan
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="biometric">
          <Card>
            <CardHeader>
              <CardTitle>Biometric Verification</CardTitle>
              <CardDescription>Use your fingerprint to record attendance</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center">
              <div className="text-center space-y-4">
                <div className="w-32 h-32 bg-muted rounded-full flex items-center justify-center mx-auto">
                  <Fingerprint className="h-16 w-16 text-muted-foreground animate-pulse-light" />
                </div>
                <p className="text-muted-foreground">Place your finger on the scanner</p>
                <Button 
                  onClick={handleScanComplete} 
                  className="bg-dccp-primary hover:bg-dccp-secondary"
                >
                  Simulate Fingerprint Scan
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default QRScanPage;
