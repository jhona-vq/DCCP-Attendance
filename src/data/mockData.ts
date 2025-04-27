
import { 
  User, 
  Course, 
  AttendanceRecord, 
  NotificationItem,
  AttendanceStats
} from '@/types';

export const currentUser: User = {
  id: 'u1',
  name: 'John Doe',
  email: 'john.doe@dccp.edu.ph',
  role: 'student',
  studentId: 'BSIT-2022-1234',
  department: 'Information Technology',
  avatar: '/placeholder.svg',
};

export const mockCourses: Course[] = [
  {
    id: 'c1',
    code: 'IT 314',
    name: 'Web Development',
    facultyId: 'f1',
    facultyName: 'Dr. Maria Santos',
    schedule: [
      {
        day: 'Monday',
        startTime: '08:00',
        endTime: '10:00',
        room: 'Room 301'
      },
      {
        day: 'Wednesday',
        startTime: '08:00',
        endTime: '10:00',
        room: 'Computer Lab 2'
      }
    ]
  },
  {
    id: 'c2',
    code: 'IT 315',
    name: 'Database Management',
    facultyId: 'f2',
    facultyName: 'Prof. Robert Garcia',
    schedule: [
      {
        day: 'Tuesday',
        startTime: '13:00',
        endTime: '15:00',
        room: 'Room 305'
      },
      {
        day: 'Thursday',
        startTime: '13:00',
        endTime: '15:00',
        room: 'Computer Lab 1'
      }
    ]
  },
  {
    id: 'c3',
    code: 'IT 316',
    name: 'Mobile App Development',
    facultyId: 'f3',
    facultyName: 'Engr. Paulo Cruz',
    schedule: [
      {
        day: 'Monday',
        startTime: '15:00',
        endTime: '17:00',
        room: 'Computer Lab 3'
      },
      {
        day: 'Friday',
        startTime: '14:00',
        endTime: '17:00',
        room: 'Computer Lab 3'
      }
    ]
  },
  {
    id: 'c4',
    code: 'IT 317',
    name: 'Network Security',
    facultyId: 'f4',
    facultyName: 'Dr. James Rivera',
    schedule: [
      {
        day: 'Wednesday',
        startTime: '13:00',
        endTime: '16:00',
        room: 'Network Lab'
      }
    ]
  },
  {
    id: 'c5',
    code: 'IT 318',
    name: 'Systems Analysis and Design',
    facultyId: 'f5',
    facultyName: 'Prof. Anna Lim',
    schedule: [
      {
        day: 'Thursday',
        startTime: '08:00',
        endTime: '10:00',
        room: 'Room 304'
      },
      {
        day: 'Friday',
        startTime: '10:00',
        endTime: '12:00',
        room: 'Room 304'
      }
    ]
  }
];

const generateRandomAttendance = (courseId: string, courseName: string): AttendanceRecord[] => {
  const records: AttendanceRecord[] = [];
  const statusOptions: ('present' | 'absent' | 'late')[] = ['present', 'present', 'present', 'present', 'late', 'absent'];
  
  // Generate records for the last 30 days
  for (let i = 30; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    
    if (date.getDay() === 0 || date.getDay() === 6) {
      // Skip weekends
      continue;
    }
    
    const status = statusOptions[Math.floor(Math.random() * statusOptions.length)];
    const hours = Math.floor(Math.random() * 4) + 8; // Random hour between 8 and 12
    const minutes = Math.floor(Math.random() * 60);
    const checkInTime = status !== 'absent' ? `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}` : undefined;
    
    records.push({
      id: `ar-${courseId}-${date.toISOString().split('T')[0]}`,
      courseId,
      courseName,
      date: date.toISOString().split('T')[0],
      status,
      checkInTime,
      remarks: status === 'late' ? 'Arrived 5 minutes after class started' : undefined
    });
  }
  
  return records;
};

export const mockAttendanceRecords: AttendanceRecord[] = [
  ...generateRandomAttendance('c1', 'Web Development'),
  ...generateRandomAttendance('c2', 'Database Management'),
  ...generateRandomAttendance('c3', 'Mobile App Development'),
  ...generateRandomAttendance('c4', 'Network Security'),
  ...generateRandomAttendance('c5', 'Systems Analysis and Design')
];

export const mockNotifications: NotificationItem[] = [
  {
    id: 'n1',
    title: 'Class Cancelled',
    message: 'IT 314 Web Development class for tomorrow has been cancelled.',
    timestamp: '2025-04-27T14:30:00',
    read: false,
    type: 'warning'
  },
  {
    id: 'n2',
    title: 'Attendance Warning',
    message: 'You have missed 3 classes for IT 315 Database Management.',
    timestamp: '2025-04-26T10:15:00',
    read: true,
    type: 'error'
  },
  {
    id: 'n3',
    title: 'New Assignment',
    message: 'New assignment posted for IT 316 Mobile App Development.',
    timestamp: '2025-04-25T16:45:00',
    read: true,
    type: 'info'
  },
  {
    id: 'n4',
    title: 'Perfect Attendance',
    message: 'Congratulations! You have perfect attendance for IT 317 Network Security this month.',
    timestamp: '2025-04-24T09:00:00',
    read: true,
    type: 'success'
  }
];

export const calculateAttendanceStats = (records: AttendanceRecord[], courseId?: string): AttendanceStats => {
  const filteredRecords = courseId 
    ? records.filter(record => record.courseId === courseId)
    : records;
  
  const present = filteredRecords.filter(record => record.status === 'present').length;
  const absent = filteredRecords.filter(record => record.status === 'absent').length;
  const late = filteredRecords.filter(record => record.status === 'late').length;
  const total = filteredRecords.length;
  const percentage = total > 0 ? Math.round((present / total) * 100) : 0;
  
  return {
    present,
    absent,
    late,
    total,
    percentage
  };
};

export const mockUsers: User[] = [
  currentUser,
  {
    id: 'u2',
    name: 'Maria Santos',
    email: 'maria.santos@dccp.edu.ph',
    role: 'faculty',
    department: 'Information Technology',
    avatar: '/placeholder.svg',
  },
  {
    id: 'u3',
    name: 'Admin User',
    email: 'admin@dccp.edu.ph',
    role: 'admin',
    avatar: '/placeholder.svg',
  }
];
