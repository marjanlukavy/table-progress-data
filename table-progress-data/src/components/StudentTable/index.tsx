import React, { useEffect, useState } from "react";
import {
  Cell,
  Column,
  Flex,
  ProgressBar,
  Row,
  TableBody,
  TableHeader,
  TableView,
} from "@adobe/react-spectrum";

import Pagination from "./Pagination";
import { Student } from "@/pages/api/students";
import { getStudents } from "@/utils/studentApi";
import { ITEMS_PER_PAGE } from "@/utils/constants";
import { sortData } from "@/utils/studentTable/sortData";
import SortingArrow from "./SortingArrow";
import { SortDirection } from "./types";

const StudentTable = (): JSX.Element => {
  const [studentData, setStudentData] = useState<Student[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sortDirection, setSortDirection] = useState<SortDirection>(
    SortDirection.ASC
  );

  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage, sortDirection]);

  const fetchData = async (page: number): Promise<void> => {
    const response = await getStudents(page, ITEMS_PER_PAGE);

    const sortedData = sortData(response.data, sortDirection);
    setStudentData(sortedData);
    setTotalPages(Math.ceil(response.totalCount / ITEMS_PER_PAGE));
  };

  const handlePageChange = (newPage: number): void => {
    setCurrentPage(newPage);
  };

  const handleSort = (direction: SortDirection) => {
    setSortDirection(direction);
    setStudentData(sortData(studentData, direction));
  };

  return (
    <Flex direction="column" alignItems="center">
      <Flex flexGrow={1} width="100%">
        <TableView
          aria-label="Student table"
          width="100%"
          height="100%"
          onSortChange={() => {
            const newDirection =
              sortDirection === SortDirection.ASC
                ? SortDirection.DESC
                : SortDirection.ASC;

            handleSort(newDirection);
          }}
        >
          <TableHeader>
            <Column key="studentName" allowsSorting>
              <Flex
                alignItems="center"
                gap="size-100"
                UNSAFE_style={{
                  cursor: "pointer",
                  userSelect: "none",
                }}
              >
                Student Name
                <SortingArrow direction={sortDirection} />
              </Flex>
            </Column>
            <Column key="courseName">Course Name</Column>
            <Column key="lessonName">Lesson Name</Column>
            <Column key="progress" align="end">
              Progress
            </Column>
          </TableHeader>
          <TableBody>
            {studentData.map((student) => (
              <Row key={student.studentName}>
                <Cell>{student.studentName}</Cell>
                <Cell>{student.courseName}</Cell>
                <Cell>{student.lessonName}</Cell>
                <Cell>
                  <ProgressBar label=" " value={student.progress} />
                </Cell>
              </Row>
            ))}
          </TableBody>
        </TableView>
      </Flex>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </Flex>
  );
};

export default StudentTable;
