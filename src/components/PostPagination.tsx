import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

interface PostPaginationProps {
  pageCount: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const PostPagination: React.FC<PostPaginationProps> = ({
  pageCount,
  currentPage,
  onPageChange,
}) => {
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
            aria-disabled={currentPage === 1}
          />
        </PaginationItem>
        {[...Array(pageCount)].map((_, i) => (
          <PaginationItem key={i}>
            <PaginationLink onClick={() => onPageChange(i + 1)} isActive={currentPage === i + 1}>
              {i + 1}
            </PaginationLink>
          </PaginationItem>
        ))}
        <PaginationItem>
          <PaginationNext
            onClick={() => onPageChange(Math.min(currentPage + 1, pageCount))}
            aria-disabled={currentPage === pageCount}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default PostPagination;
