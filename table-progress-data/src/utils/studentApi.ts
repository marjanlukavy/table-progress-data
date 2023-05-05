import { ITEMS_PER_PAGE } from "./constants";

export async function getStudents(
  currentPage = 1,
  itemsPerPage = ITEMS_PER_PAGE
) {
  let url = `/api/students?page=${currentPage}&itemsPerPage=${itemsPerPage}`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Error fetching students");
  }

  const { data, totalCount, nextPage } = await response.json();

  return {
    data,
    totalCount,
    nextPage,
  };
}
