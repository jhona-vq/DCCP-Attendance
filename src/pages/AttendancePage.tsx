
import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { mockCourses, mockAttendanceRecords } from '@/data/mockData';
import { AttendanceRecord } from '@/types';
import { Edit } from 'lucide-react';

const AttendancePage: React.FC = () => {
  const { user } = useAuth();
  const [selectedCourse, setSelectedCourse] = useState<string>('all');
  
  const filteredRecords = selectedCourse === 'all'
    ? mockAttendanceRecords
    : mockAttendanceRecords.filter(record => record.courseId === selectedCourse);
    
  // Sort records by date (most recent first)
  const sortedRecords = [...filteredRecords].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const canEditAttendance = user?.role === 'admin' || user?.role === 'faculty';

  const getStatusBadge = (status: AttendanceRecord['status']) => {
    switch (status) {
      case 'present':
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Present</Badge>;
      case 'late':
        return <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">Late</Badge>;
      case 'absent':
        return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">Absent</Badge>;
      default:
        return null;
    }
  };

  const handleEditAttendance = (recordId: string) => {
    // This is where you would implement the edit functionality
    console.log('Editing attendance record:', recordId);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Attendance History</h2>
        <p className="text-muted-foreground">
          {canEditAttendance 
            ? 'View and manage attendance records' 
            : 'View your attendance records'}
        </p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center justify-between space-y-2 md:space-y-0">
            <div>
              <CardTitle>Attendance Records</CardTitle>
              <CardDescription>
                {selectedCourse === 'all' 
                  ? 'Showing attendance for all courses' 
                  : `Showing attendance for ${mockCourses.find(c => c.id === selectedCourse)?.name}`}
              </CardDescription>
            </div>
            <div className="w-full md:w-[180px]">
              <Select value={selectedCourse} onValueChange={setSelectedCourse}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by course" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Courses</SelectItem>
                  {mockCourses.map((course) => (
                    <SelectItem key={course.id} value={course.id}>
                      {course.code} - {course.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Course</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Check-in</TableHead>
                  <TableHead className="hidden md:table-cell">Remarks</TableHead>
                  {canEditAttendance && <TableHead className="w-[100px]">Actions</TableHead>}
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedRecords.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={canEditAttendance ? 6 : 5} className="h-24 text-center">
                      No records found
                    </TableCell>
                  </TableRow>
                ) : (
                  sortedRecords.map((record) => {
                    const formattedDate = new Date(record.date).toLocaleDateString('en-US', {
                      weekday: 'short',
                      month: 'short',
                      day: 'numeric',
                    });
                    
                    return (
                      <TableRow key={record.id}>
                        <TableCell>{formattedDate}</TableCell>
                        <TableCell>
                          <div className="font-medium">
                            {mockCourses.find(c => c.id === record.courseId)?.code}
                          </div>
                          <div className="text-xs text-muted-foreground hidden md:block">
                            {record.courseName}
                          </div>
                        </TableCell>
                        <TableCell>{getStatusBadge(record.status)}</TableCell>
                        <TableCell>{record.checkInTime || '-'}</TableCell>
                        <TableCell className="hidden md:table-cell">
                          {record.remarks || '-'}
                        </TableCell>
                        {canEditAttendance && (
                          <TableCell>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleEditAttendance(record.id)}
                              className="hover:bg-muted"
                            >
                              <Edit className="h-4 w-4" />
                              <span className="sr-only">Edit attendance</span>
                            </Button>
                          </TableCell>
                        )}
                      </TableRow>
                    );
                  })
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AttendancePage;
