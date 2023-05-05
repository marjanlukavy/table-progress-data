import { SortDirection } from "@/components/StudentTable/types";
import { Student } from "@/pages/api/students";

export const sortData = (
  data: Student[],
  direction: SortDirection
): Student[] => {
  return data.slice().sort((a, b) => {
    let cmp = a?.studentName
      ?.toString()
      .localeCompare(b.studentName.toString());
    if (direction === SortDirection.DESC) {
      cmp *= -1;
    }
    return cmp;
  });
};
