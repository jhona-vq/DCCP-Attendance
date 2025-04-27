
import React from 'react';
import { useAuth } from '@/context/AuthContext';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { mockAttendanceRecords, calculateAttendanceStats } from '@/data/mockData';
import { User, Mail, Calendar, School, MapPin, Building } from 'lucide-react';

const ProfilePage: React.FC = () => {
  const { user } = useAuth();
  
  if (!user) return null;
  
  const attendanceStats = calculateAttendanceStats(mockAttendanceRecords);
  
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">My Profile</h2>
        <p className="text-muted-foreground">View and manage your account information</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Profile Information</CardTitle>
            <CardDescription>Your personal and account details</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center text-center">
            <Avatar className="h-24 w-24 mb-4">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback className="text-2xl">{user.name.substring(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            <h3 className="text-xl font-bold">{user.name}</h3>
            <p className="text-muted-foreground">{user.role.charAt(0).toUpperCase() + user.role.slice(1)}</p>
            {user.role === 'student' && (
              <div className="bg-dccp-light text-dccp-primary px-2 py-1 rounded-md mt-2 text-sm">
                {user.studentId}
              </div>
            )}
            <div className="mt-4 w-full">
              <Button className="w-full" variant="outline">
                Update Profile Picture
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Account Details</CardTitle>
            <CardDescription>Your personal information and academic details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <Label>Full Name</Label>
                </div>
                <p className="text-sm font-medium">{user.name}</p>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <Label>Email Address</Label>
                </div>
                <p className="text-sm font-medium">{user.email}</p>
              </div>
              
              {user.role === 'student' && (
                <>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <School className="h-4 w-4 text-muted-foreground" />
                      <Label>Student ID</Label>
                    </div>
                    <p className="text-sm font-medium">{user.studentId}</p>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <Label>Academic Year</Label>
                    </div>
                    <p className="text-sm font-medium">2024-2025</p>
                  </div>
                </>
              )}
              
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Building className="h-4 w-4 text-muted-foreground" />
                  <Label>Department</Label>
                </div>
                <p className="text-sm font-medium">{user.department}</p>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <Label>Campus</Label>
                </div>
                <p className="text-sm font-medium">DCCP Baguio</p>
              </div>
            </div>
            
            {user.role === 'student' && (
              <div className="pt-4 border-t">
                <h4 className="text-sm font-medium mb-2">Attendance Summary</h4>
                <div className="grid grid-cols-4 gap-2 text-center">
                  <div className="p-2 bg-muted rounded-md">
                    <p className="text-sm text-muted-foreground">Present</p>
                    <p className="text-lg font-bold text-green-600">{attendanceStats.present}</p>
                  </div>
                  <div className="p-2 bg-muted rounded-md">
                    <p className="text-sm text-muted-foreground">Late</p>
                    <p className="text-lg font-bold text-yellow-600">{attendanceStats.late}</p>
                  </div>
                  <div className="p-2 bg-muted rounded-md">
                    <p className="text-sm text-muted-foreground">Absent</p>
                    <p className="text-lg font-bold text-red-600">{attendanceStats.absent}</p>
                  </div>
                  <div className="p-2 bg-muted rounded-md">
                    <p className="text-sm text-muted-foreground">Rate</p>
                    <p className="text-lg font-bold text-dccp-primary">{attendanceStats.percentage}%</p>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
          <CardFooter className="border-t pt-4 flex justify-between">
            <p className="text-xs text-muted-foreground">
              Last updated: April 27, 2025
            </p>
            <Button>Edit Information</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default ProfilePage;
