import { Student } from "@/pages/api/students";

export type SortColumn = keyof Student;

export enum SortDirection {
  ASC = "asc",
  DESC = "desc",
}

export enum StudentColumn {
  STUDENT_NAME = "studentName",
  COURSE_NAME = "courseName",
  LESSON_NAME = "lessonName",
  PROGRESS = "progress",
}

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (newPage: number) => void;
}
