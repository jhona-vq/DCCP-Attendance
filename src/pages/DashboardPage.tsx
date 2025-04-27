
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { mockCourses, mockAttendanceRecords, calculateAttendanceStats } from '@/data/mockData';
import { Calendar, Clock, QrCode, ChevronRight } from 'lucide-react';

const DashboardPage: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const todayDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const today = new Date();
  const dayOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][today.getDay()];
  
  const todayClasses = mockCourses.filter(course => 
    course.schedule.some(schedule => schedule.day === dayOfWeek)
  );

  const stats = calculateAttendanceStats(mockAttendanceRecords);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <Button onClick={() => navigate('/scan')} className="bg-dccp-primary hover:bg-dccp-secondary">
          <QrCode className="mr-2 h-4 w-4" />
          Scan Attendance
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div className="space-y-0.5">
              <CardTitle className="text-base font-medium">Attendance Rate</CardTitle>
              <CardDescription>Overall performance</CardDescription>
            </div>
            <div className="bg-primary/10 text-primary p-2 rounded-full">
              <Clock className="h-4 w-4 text-primary" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.percentage}%</div>
            <Progress className="mt-2" value={stats.percentage} />
            <div className="mt-2 grid grid-cols-3 text-xs">
              <div>
                <span className="text-green-500 font-medium">{stats.present}</span> Present
              </div>
              <div>
                <span className="text-yellow-500 font-medium">{stats.late}</span> Late
              </div>
              <div>
                <span className="text-red-500 font-medium">{stats.absent}</span> Absent
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div className="space-y-0.5">
              <CardTitle className="text-base font-medium">Today</CardTitle>
              <CardDescription>{todayDate}</CardDescription>
            </div>
            <div className="bg-primary/10 text-primary p-2 rounded-full">
              <Calendar className="h-4 w-4 text-primary" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-lg font-medium">
              {todayClasses.length === 0 ? (
                <p className="text-muted-foreground">No classes scheduled for today</p>
              ) : (
                <p>{todayClasses.length} classes today</p>
              )}
            </div>
            <div className="mt-2">
              {todayClasses.slice(0, 2).map((course) => {
                const schedule = course.schedule.find(s => s.day === dayOfWeek);
                return schedule ? (
                  <div key={course.id} className="flex items-center justify-between py-1 text-sm">
                    <span className="font-medium">{course.code}</span>
                    <span className="text-muted-foreground">
                      {schedule.startTime} - {schedule.endTime}
                    </span>
                    <span className="text-muted-foreground">{schedule.room}</span>
                  </div>
                ) : null;
              })}
              {todayClasses.length > 2 && (
                <Button variant="link" className="mt-1 p-0 h-auto" onClick={() => navigate('/schedule')}>
                  Show all classes
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div className="space-y-0.5">
              <CardTitle className="text-base font-medium">Quick Access</CardTitle>
              <CardDescription>Common actions</CardDescription>
            </div>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button 
              variant="outline" 
              className="w-full justify-between"
              onClick={() => navigate('/scan')}
            >
              Scan Attendance QR Code <QrCode className="h-4 w-4" />
            </Button>
            <Button 
              variant="outline" 
              className="w-full justify-between"
              onClick={() => navigate('/attendance')}
            >
              View Attendance History <ChevronRight className="h-4 w-4" />
            </Button>
            <Button 
              variant="outline" 
              className="w-full justify-between"
              onClick={() => navigate('/schedule')}
            >
              View Class Schedule <ChevronRight className="h-4 w-4" />
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 grid-cols-1">
        <Card>
          <CardHeader>
            <CardTitle>My Courses</CardTitle>
            <CardDescription>Courses for current semester</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockCourses.map((course) => {
                const courseStats = calculateAttendanceStats(mockAttendanceRecords, course.id);
                return (
                  <div
                    key={course.id}
                    className="flex flex-col sm:flex-row sm:items-center justify-between p-3 rounded-lg border"
                  >
                    <div className="flex flex-col mb-2 sm:mb-0">
                      <div className="flex items-center">
                        <span className="text-sm font-medium bg-dccp-light text-dccp-primary px-2 py-0.5 rounded mr-2">
                          {course.code}
                        </span>
                        <h3 className="font-medium">{course.name}</h3>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        Faculty: {course.facultyName}
                      </p>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="hidden md:flex flex-col text-sm">
                        <span className="text-muted-foreground">Attendance</span>
                        <div className="flex items-center">
                          <span className="font-medium">{courseStats.percentage}%</span>
                          <div className="w-32 ml-2">
                            <Progress value={courseStats.percentage} className="h-2" />
                          </div>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" onClick={() => navigate(`/course/${course.id}`)}>
                        <span className="hidden sm:inline mr-2">View</span> Details
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardPage;
