import './Pagination.css';
import { useNavigate, useLocation } from 'react-router-dom';

interface PaginationProps {
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (newPage: number) => void;
  currentPage: number;
}

function Pagination({
  totalItems,
  itemsPerPage,
  onPageChange,
  currentPage,
}: PaginationProps) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const navigate = useNavigate();
  const location = useLocation();

 
  const maxVisiblePages = 6; 
  let pageRangeStart = currentPage - Math.floor(maxVisiblePages / 2);
  let pageRangeEnd = pageRangeStart + maxVisiblePages - 1;

  
  if (pageRangeStart < 1) {
    pageRangeStart = 1;
    pageRangeEnd = Math.min(totalPages, maxVisiblePages);
  } else if (pageRangeEnd > totalPages) {
    pageRangeEnd = totalPages;
    pageRangeStart = Math.max(1, totalPages - maxVisiblePages + 1);
  }

 
  const pageNumbers = Array.from(
    { length: pageRangeEnd - pageRangeStart + 1 },
    (_, index) => pageRangeStart + index
  );

  const handlePageChange = (newPage: number) => {
    const searchParams = new URLSearchParams(location.search);
    searchParams.set('page', newPage.toString());
    const newUrl = `${location.pathname}?${searchParams.toString()}`;

  
    navigate(newUrl);
    onPageChange(newPage);
  };

  return (
    <div className="pagination">
      <button
        className="pagination-button"
        disabled={currentPage === 1}
        onClick={() => handlePageChange(currentPage - 1)}
      >
        &laquo; Prev
      </button>

      {pageNumbers.map((page) => (
        <button
          key={page}
          className={`pagination-button ${page === currentPage ? 'active' : ''}`}
          onClick={() => handlePageChange(page)}
        >
          {page}
        </button>
      ))}

      <button
        className="pagination-button"
        disabled={currentPage === totalPages}
        onClick={() => handlePageChange(currentPage + 1)}
      >
        Next &raquo;
      </button>
    </div>
  );
}

export default Pagination;

