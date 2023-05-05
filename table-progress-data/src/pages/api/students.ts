import { NextApiRequest, NextApiResponse } from "next";
import { studentData } from "@/utils/studentData";
import { ITEMS_PER_PAGE } from "@/utils/constants";

export type Student = {
  studentName: string;
  courseName: string;
  lessonName: string;
  progress: number;
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const currentPage = parseInt(req.query.page as string) || 1;
  const itemsPerPage =
    parseInt(req.query.itemsPerPage as string) || ITEMS_PER_PAGE;

  const start = (currentPage - 1) * itemsPerPage;
  const end = currentPage * itemsPerPage;
  const paginatedData = studentData.slice(start, end);

  try {
    res.status(200).json({
      data: paginatedData,
      totalCount: studentData.length,
      nextPage: currentPage + 1,
    });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
}
