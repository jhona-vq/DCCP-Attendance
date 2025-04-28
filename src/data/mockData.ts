
import { 
  User, 
  Course, 
  AttendanceRecord, 
  NotificationItem,
  AttendanceStats
} from '@/types';

export const currentUser: User = {
  id: 'u1',
  name: 'Jhona Villanueva',
  email: 'jhonav@dccp.edu.ph',
  role: 'student',
  studentId: '205841',
  department: 'Bachelor of Science in Information Technology',
  avatar: '/placeholder.svg',
};

export const mockCourses: Course[] = [
  {
    id: 'c1',
    code: 'ITW 322',
    name: 'Linux Operating System',
    facultyId: 'f1',
    facultyName: 'Kray Ann Kitma',
    yearAndSection: 'BSIT 3-2',
    schedule: [
      {
        day: 'Wednesday',
        startTime: '1:00',
        endTime: '2:00',
        room: 'Room 302'
      },
      {
        day: 'Friday',
        startTime: '1:00',
        endTime: '2:00',
        room: 'Room 302'
      }
    ]
  },
  {
    id: 'c2',
    code: 'ITW 328',
    name: 'Professional Ethics in IT and Comp. Issues',
    facultyId: 'f2',
    facultyName: '',
    yearAndSection: 'BSIT 3-2',
    schedule: [
      {
       day: 'Tuesday',
        startTime: '11:00',
        endTime: '12:00',
        room: 'Room 501'
      }
    ]
  },
  {
    id: 'c3',
    code: 'ITW 321',
    name: 'System Analysis And Design',
    facultyId: 'f3',
    facultyName: 'Dr.Marvin Arenas',
    yearAndSection: 'BSIT 3-2',
    schedule: [
      {
       day: 'Tuesday',
        startTime: '1:00',
        endTime: '2:00',
        room: 'Room 302'
      },
      {
        day: 'Thursday',
        startTime: '1:00',
        endTime: '2:00',
        room: 'Room 302'
      }
    ]
  },
  {
    id: 'c4',
    code: 'ITW 327',
    name: 'Project Management',
    facultyId: 'f4',
    facultyName: 'Kray Ann Kitma',
    yearAndSection: 'BSIT 3-2',
    schedule: [
      {
        day: 'Tuesday',
        startTime: '2:30',
        endTime: '4:00',
        room: 'Room 302'
      },
      {
        day: 'Thursday',
        startTime: '2:30',
        endTime: '4:00',
        room: 'Room 302'
      }
    ]
  },
  {
    id: 'c5',
    code: 'ITW 323',
    name: 'Computer Programming 5 (Web Design & Development)',
    facultyId: 'f5',
    facultyName: 'Kray Ann Kitma',
    yearAndSection: 'BSIT 3-2',
    schedule: [
      {
        day: 'Tuesday',
        startTime: '4:00',
        endTime: '5:30',
        room: 'Room 302'
      },
      {
        day: 'Thursday',
        startTime: '4:00',
        endTime: '5:30',
        room: 'Room 302'
      }
    ]
  },
  {
    id: 'c6',
    code: 'ITW 325',
    name: 'Fundamentals of Business Analytics',
    facultyId: 'f4',
    facultyName: '',
    yearAndSection: 'BSIT 3-2',
    schedule: [
      {
        day: 'Saturday',
        startTime: '8:00',
        endTime: '11:00',
        room: 'Room 402'
      }
    ]
  },
  {
    id: 'c7',
    code: 'ITW 324',
    name: 'System Administration and Maintainance',
    facultyId: 'f4',
    facultyName: 'Sir. Jodel Urbano',
    yearAndSection: 'BSIT 3-2',
    schedule: [
      {
        day: 'Saturday',
        startTime: '11:00',
        endTime: '2:00',
        room: 'Room 302'
      }
    ]
  },
  {
    id: 'c8',
    code: 'ITW 326',
    name: 'Information Assurance and Security',
    facultyId: 'f4',
    facultyName: 'Sir. Jodel Urbano',
    yearAndSection: 'BSIT 3-2',
    schedule: [
      {
        day: 'Saturday',
        startTime: '2:00',
        endTime: '5:00',
        room: 'Room 402'
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
  ...generateRandomAttendance('c1', 'Linux Operating System'),
  ...generateRandomAttendance('c2', 'Professional Ethics in IT and Comp. Issues'),
  ...generateRandomAttendance('c3', 'System Analysis And Design'),
  ...generateRandomAttendance('c4', 'Project Management'),
  ...generateRandomAttendance('c5', 'Computer Programming 5 (Web Design & Development'),
  ...generateRandomAttendance('c6', 'Fundamentals of Business Analytics'),
  ...generateRandomAttendance('c7', 'System Administration and Maintainance'),
  ...generateRandomAttendance('c8', 'Information Assurance and Security')
];

export const mockNotifications: NotificationItem[] = [
  {
    id: 'n1',
    title: 'Class Cancelled',
    message: 'ITW 327 Project Management class for tomorrow has been cancelled.',
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
    message: 'New assignment posted for ITw 322 Linux Operating System.',
    timestamp: '2025-04-25T16:45:00',
    read: true,
    type: 'info'
  },
  {
    id: 'n4',
    title: 'Perfect Attendance',
    message: 'Congratulations! You have perfect attendance for ITW 321 System Analysis And Design this month.',
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
