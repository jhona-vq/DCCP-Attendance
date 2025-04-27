
import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { mockCourses } from '@/data/mockData';
import { ClassSchedule } from '@/types';

const SchedulePage: React.FC = () => {
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const today = new Date().getDay();
  // Convert JS day (0 = Sunday, 1 = Monday) to our day array index (0 = Monday)
  const currentDayIndex = today === 0 ? 5 : today - 1;
  const currentDay = days[currentDayIndex];
  
  const hours = Array.from({ length: 12 }, (_, i) => i + 7); // 7AM to 6PM
  
  // Group courses by day
  const scheduleByDay = days.reduce((acc, day) => {
    acc[day] = mockCourses.filter(course => 
      course.schedule.some(schedule => schedule.day === day)
    );
    return acc;
  }, {} as Record<string, typeof mockCourses>);

  // Function to position class in the schedule grid
  const getClassPosition = (schedule: ClassSchedule) => {
    const startHour = parseInt(schedule.startTime.split(':')[0]);
    const startMinutes = parseInt(schedule.startTime.split(':')[1]);
    const endHour = parseInt(schedule.endTime.split(':')[0]);
    const endMinutes = parseInt(schedule.endTime.split(':')[1]);
    
    const start = (startHour - 7) + (startMinutes / 60);
    const duration = (endHour - startHour) + ((endMinutes - startMinutes) / 60);
    
    return {
      start: `${start * 5}rem`,
      height: `${duration * 5}rem`,
    };
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Class Schedule</h2>
        <p className="text-muted-foreground">View your weekly class schedule</p>
      </div>

      <Tabs defaultValue={currentDay.toLowerCase()}>
        <TabsList className="grid grid-cols-3 lg:grid-cols-6 mb-4">
          {days.map((day) => (
            <TabsTrigger 
              key={day} 
              value={day.toLowerCase()}
              className={day === currentDay ? 'bg-dccp-primary text-primary-foreground' : ''}
            >
              {day.substring(0, 3)}
            </TabsTrigger>
          ))}
        </TabsList>
        
        {days.map((day) => (
          <TabsContent key={day} value={day.toLowerCase()}>
            <Card>
              <CardHeader>
                <CardTitle>{day}</CardTitle>
                <CardDescription>
                  {scheduleByDay[day].length === 0 ? 
                    'No classes scheduled for this day' : 
                    `${scheduleByDay[day].length} classes scheduled`
                  }
                </CardDescription>
              </CardHeader>
              <CardContent>
                {scheduleByDay[day].length === 0 ? (
                  <div className="h-32 flex items-center justify-center border rounded-md">
                    <p className="text-muted-foreground">No classes scheduled for this day</p>
                  </div>
                ) : (
                  <div className="relative">
                    <div className="absolute left-16 right-0 grid grid-cols-1 md:grid-cols-2 gap-4">
                      {scheduleByDay[day].map((course) => {
                        const schedule = course.schedule.find(s => s.day === day);
                        if (!schedule) return null;
                        
                        const position = getClassPosition(schedule);
                        
                        return (
                          <div 
                            key={`${course.id}-${day}`}
                            className="border rounded-md p-2 bg-dccp-light text-dccp-dark shadow-sm"
                            style={{
                              position: 'absolute',
                              top: position.start,
                              height: position.height,
                              left: 0,
                              right: 0,
                            }}
                          >
                            <div className="font-medium">{course.code}</div>
                            <div className="text-xs">{course.name}</div>
                            <div className="text-xs mt-1">
                              {schedule.startTime} - {schedule.endTime}
                            </div>
                            <div className="text-xs mt-1">
                              {schedule.room}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    
                    <div className="border-r pr-2 text-right">
                      {hours.map((hour) => (
                        <div key={hour} className="h-20 text-xs text-muted-foreground">
                          {hour % 12 === 0 ? 12 : hour % 12}:00 {hour >= 12 ? 'PM' : 'AM'}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                <div className="mt-6">
                  <h4 className="font-medium mb-2">Courses for {day}</h4>
                  <div className="space-y-2">
                    {scheduleByDay[day].map((course) => {
                      const schedule = course.schedule.find(s => s.day === day);
                      if (!schedule) return null;
                      
                      return (
                        <div key={course.id} className="flex items-center justify-between p-2 border rounded-md">
                          <div>
                            <div className="flex items-center">
                              <span className="text-sm font-medium bg-dccp-light text-dccp-primary px-2 py-0.5 rounded mr-2">
                                {course.code}
                              </span>
                              <span className="font-medium">{course.name}</span>
                            </div>
                            <div className="text-sm text-muted-foreground mt-1">
                              {schedule.room}
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-sm font-medium">
                              {schedule.startTime} - {schedule.endTime}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              Faculty: {course.facultyName}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default SchedulePage;
