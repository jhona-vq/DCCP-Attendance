
export type Program = 'BSIT' | 'BSHM' | 'BSBA' | 'DHRT';

export type YearLevel = '1st Year' | '2nd Year' | '3rd Year' | '4th Year';

export type Semester = '1st Semester' | '2nd Semester';

export interface Subject {
  id: string;
  code: string;
  name: string;
  units: number;
  program: Program;
  yearLevel: YearLevel;
  semester: Semester;
}

export interface StudentProgram {
  id: string;
  studentId: string;
  program: Program;
  yearLevel: YearLevel;
  currentSemester: Semester;
}
