import { useNavigate } from "react-router-dom";

interface PaginationProps {
  links: {
    nextPage: boolean;
    prevPage: boolean;
    currentPage: number;
    loopableLinks: { number: number }[];
  };
  basePath: string; // e.g. "/recipes"
}

const Pagination = ({ links, basePath }: PaginationProps) => {
  const navigate = useNavigate();
  const { nextPage, prevPage, currentPage, loopableLinks } = links;
  const totalPages = loopableLinks.length;

  const handlePageChange = (pageNumber: number) => {
    if (pageNumber == 0) {
      return;
    }
    if (pageNumber == totalPages + 1) {
      return;
    }

    window.location.href = `${basePath}?page=${pageNumber}`;
    window.scrollTo(0, 0);
  };

  // Smart page number display with ellipsis
  const getDisplayedPages = () => {
    const pages: (number | string)[] = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      return loopableLinks.map((link) => link.number);
    }

    // Always show first page
    pages.push(1);

    // Calculate range around current page
    let start = Math.max(currentPage - 1, 2);
    let end = Math.min(currentPage + 1, totalPages - 1);

    // Add ellipsis if needed after first page
    if (currentPage > 3) {
      pages.push("...");
    }

    // Add pages around current
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    // Add ellipsis if needed before last page
    if (currentPage < totalPages - 2) {
      pages.push("...");
    }

    // Always show last page if different from first
    if (totalPages > 1) {
      pages.push(totalPages);
    }

    return pages;
  };

  return (
    <div className="flex items-center justify-center mt-8 px-4 sm:px-0 gap-1">
      {/* Previous Button */}
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={!prevPage}
        className={`inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium ${
          !prevPage
            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
            : "bg-white text-gray-700 hover:bg-gray-50 hover:text-black"
        }`}
      >
        <svg
          className="h-5 w-5 mr-1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
            clipRule="evenodd"
          />
        </svg>
        Previous
      </button>

      {/* Page Numbers - Desktop */}
      <div className="hidden md:flex">
        <nav className="flex items-center space-x-1" aria-label="Pagination">
          {getDisplayedPages().map((page, index) =>
            typeof page === "string" ? (
              <span
                key={`ellipsis-${index}`}
                className="px-4 py-2 text-gray-500"
              >
                {page}
              </span>
            ) : (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`px-4 py-2 border rounded-md text-sm font-medium min-w-[40px] ${
                  currentPage === page
                    ? "bg-black text-white border-black"
                    : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                }`}
              >
                {page}
              </button>
            )
          )}
        </nav>
      </div>

      {/* Mobile Page Info */}
      <div className="md:hidden flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium bg-white text-gray-700">
        Page {currentPage} of {totalPages}
      </div>

      {/* Next Button */}
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={!nextPage}
        className={`inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium ${
          !nextPage
            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
            : "bg-white text-gray-700 hover:bg-gray-50 hover:text-black"
        }`}
      >
        Next
        <svg
          className="h-5 w-5 ml-1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
            clipRule="evenodd"
          />
        </svg>
      </button>
    </div>
  );
};

export default Pagination;
