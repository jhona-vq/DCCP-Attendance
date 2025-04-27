
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'faculty' | 'admin';
  studentId?: string;
  department?: string;
  avatar?: string;
}

export interface Course {
  id: string;
  code: string;
  name: string;
  facultyId: string;
  facultyName: string;
  yearAndSection: 'BSIT 1-1' | 'BSIT 1-2' | 'BSIT 2-1' | 'BSIT 2-2' | 'BSIT 3-1' | 'BSIT 3-2' | 'BSIT 4-1' | 'BSIT 4-2';
  schedule: ClassSchedule[];
}

export interface ClassSchedule {
  day: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday';
  startTime: string;
  endTime: string;
  room: string;
}

export interface AttendanceRecord {
  id: string;
  courseId: string;
  courseName: string;
  date: string;
  status: 'present' | 'absent' | 'late';
  checkInTime?: string;
  remarks?: string;
}

export interface AttendanceStats {
  present: number;
  absent: number;
  late: number;
  total: number;
  percentage: number;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  type: 'info' | 'warning' | 'success' | 'error';
}
