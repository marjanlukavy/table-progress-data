import SortOrderUp from "@spectrum-icons/workflow/SortOrderUp";
import SortOrderDown from "@spectrum-icons/workflow/SortOrderDown";
import { SortDirection } from "./types";

const SortingArrow = ({ direction }: { direction: SortDirection }) => {
  return direction === SortDirection.ASC ? <SortOrderUp /> : <SortOrderDown />;
};

export default SortingArrow;
