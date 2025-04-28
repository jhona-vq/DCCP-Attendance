
import { Subject } from '@/types/academic';

export const mockSubjects: Subject[] = [
  // BSIT Subjects
  {
    id: 'bsit101',
    code: 'IT 101',
    name: 'Introduction to Computing',
    units: 3,
    program: 'BSIT',
    yearLevel: '1st Year',
    semester: '1st Semester'
  },
  {
    id: 'bsit102',
    code: 'IT 102',
    name: 'Computer Programming 1',
    units: 3,
    program: 'BSIT',
    yearLevel: '1st Year',
    semester: '1st Semester'
  },
  {
    id: 'bsit103',
    code: 'IT 103',
    name: 'Computer Programming 2',
    units: 3,
    program: 'BSIT',
    yearLevel: '1st Year',
    semester: '2nd Semester'
  },
  
  // BSHM Subjects
  {
    id: 'bshm101',
    code: 'HM 101',
    name: 'Introduction to Hospitality Management',
    units: 3,
    program: 'BSHM',
    yearLevel: '1st Year',
    semester: '1st Semester'
  },
  {
    id: 'bshm102',
    code: 'HM 102',
    name: 'Food Safety and Sanitation',
    units: 3,
    program: 'BSHM',
    yearLevel: '1st Year',
    semester: '1st Semester'
  },
  
  // BSBA Subjects
  {
    id: 'bsba101',
    code: 'BA 101',
    name: 'Principles of Management',
    units: 3,
    program: 'BSBA',
    yearLevel: '1st Year',
    semester: '1st Semester'
  },
  {
    id: 'bsba102',
    code: 'BA 102',
    name: 'Basic Economics',
    units: 3,
    program: 'BSBA',
    yearLevel: '1st Year',
    semester: '1st Semester'
  },
  
  // DHRT Subjects
  {
    id: 'dhrt101',
    code: 'HRT 101',
    name: 'Front Office Operations',
    units: 3,
    program: 'DHRT',
    yearLevel: '1st Year',
    semester: '1st Semester'
  },
  {
    id: 'dhrt102',
    code: 'HRT 102',
    name: 'Housekeeping Operations',
    units: 3,
    program: 'DHRT',
    yearLevel: '1st Year',
    semester: '1st Semester'
  }
];

export const getSubjectsByProgramAndSemester = (
  program: string,
  yearLevel: string,
  semester: string
): Subject[] => {
  return mockSubjects.filter(
    subject =>
      subject.program === program &&
      subject.yearLevel === yearLevel &&
      subject.semester === semester
  );
};
