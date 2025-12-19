interface PaginationProps {
  currentPage: number;
  totalPages: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
}

const Pagination = ({ 
  currentPage, 
  totalPages, 
  pageSize, 
  onPageChange, 
  onPageSizeChange 
}: PaginationProps) => {

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value);
    if (val > 0 && val <= totalPages) {
      onPageChange(val);
    }
  };

  return (
    <div className="pagination-container">
      {/* Page Size */}
      <div className="page-size-selector">
        <label htmlFor="pageSize">Rows per page:</label>
        <select 
          id="pageSize" 
          value={pageSize} 
          onChange={(e) => onPageSizeChange(Number(e.target.value))}
        >
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="25">25</option>
          <option value="50">50</option>
        </select>
      </div>

      {/* Page Controls */}
      <div className="pagination-controls">
        <div className="page-jump">
          <label htmlFor="currentPageInput">Page</label>
          <input 
            type="number" 
            id="currentPageInput" 
            value={currentPage} 
            onChange={handleInputChange}
            min="1" 
            max={totalPages}
            aria-labelledby="Current Page Input"
          />
          <span>of {totalPages}</span>
        </div>

        {/* Navigation Buttons */}
        <div className="pagination-buttons">
          <button 
            className="btn-nav" 
            title="Previous Page"
            disabled={currentPage === 1}
            onClick={() => onPageChange(currentPage - 1)}
          >
            &laquo;
          </button>
          <button 
            className="btn-nav" 
            title="Next Page"
            disabled={currentPage === totalPages}
            onClick={() => onPageChange(currentPage + 1)}
          >
            &raquo;
          </button>
        </div>
      </div>
    </div>
  );
};

export default Pagination;