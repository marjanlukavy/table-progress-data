import { Button, ButtonGroup, Flex, View } from "@adobe/react-spectrum";
import { useMediaQuery } from "@react-spectrum/utils";
import { PaginationProps } from "./types";

const Pagination = ({
  currentPage,
  totalPages = 1,
  onPageChange,
}: PaginationProps) => {
  const handlePageChange = (newPage: number): void => {
    if (newPage >= 1 && newPage <= totalPages) {
      onPageChange(newPage);
    }
  };
  const isSmallDevice = useMediaQuery("(max-width: 640px)");

  return (
    <View paddingX="size-100" paddingY="size-200">
      <ButtonGroup>
        <Flex>
          {!isSmallDevice ? (
            <Button
              onPress={() => handlePageChange(currentPage - 1)}
              variant={"accent"}
            >
              Previous
            </Button>
          ) : null}

          {Array.from({ length: totalPages }, (_, i) => (
            <Button
              key={i}
              variant={i + 1 === currentPage ? "accent" : "primary"}
              onPress={() => handlePageChange(i + 1)}
            >
              {i + 1}
            </Button>
          ))}
          {!isSmallDevice ? (
            <Button
              onPress={() => handlePageChange(currentPage + 1)}
              variant={"accent"}
            >
              Next
            </Button>
          ) : null}
        </Flex>
      </ButtonGroup>
    </View>
  );
};

export default Pagination;
