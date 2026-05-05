'use client';

import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface NewsPaginationProps {
  currentPage: number;
  totalPages: number;
}

export default function NewsPagination({ currentPage, totalPages }: NewsPaginationProps) {
  const pages = [];
  const maxVisiblePages = 5;
  
  let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
  let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
  
  if (endPage - startPage < maxVisiblePages - 1) {
    startPage = Math.max(1, endPage - maxVisiblePages + 1);
  }
  
  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  return (
    <div className="flex items-center justify-center gap-2 mt-12">
      {/* Previous Button */}
      {currentPage > 1 ? (
        <Link
          href={currentPage === 2 ? '/news' : `/news?page=${currentPage - 1}`}
          className="flex items-center gap-1 px-4 py-2 rounded-lg border border-zinc-200 dark:border-zinc-800 hover:bg-cyan-50 dark:hover:bg-cyan-950 hover:border-cyan-500 dark:hover:border-cyan-500 transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          <span className="hidden sm:inline">Previous</span>
        </Link>
      ) : (
        <div className="flex items-center gap-1 px-4 py-2 rounded-lg border border-zinc-200 dark:border-zinc-800 opacity-50 cursor-not-allowed">
          <ChevronLeft className="w-4 h-4" />
          <span className="hidden sm:inline">Previous</span>
        </div>
      )}

      {/* First page */}
      {startPage > 1 && (
        <>
          <Link
            href="/news"
            className="px-4 py-2 rounded-lg border border-zinc-200 dark:border-zinc-800 hover:bg-cyan-50 dark:hover:bg-cyan-950 hover:border-cyan-500 dark:hover:border-cyan-500 transition-colors"
          >
            1
          </Link>
          {startPage > 2 && <span className="px-2">...</span>}
        </>
      )}

      {/* Page numbers */}
      {pages.map((page) => (
        <Link
          key={page}
          href={page === 1 ? '/news' : `/news?page=${page}`}
          className={`px-4 py-2 rounded-lg border transition-colors ${
            page === currentPage
              ? 'bg-cyan-600 text-white border-cyan-600'
              : 'border-zinc-200 dark:border-zinc-800 hover:bg-cyan-50 dark:hover:bg-cyan-950 hover:border-cyan-500 dark:hover:border-cyan-500'
          }`}
        >
          {page}
        </Link>
      ))}

      {/* Last page */}
      {endPage < totalPages && (
        <>
          {endPage < totalPages - 1 && <span className="px-2">...</span>}
          <Link
            href={`/news?page=${totalPages}`}
            className="px-4 py-2 rounded-lg border border-zinc-200 dark:border-zinc-800 hover:bg-cyan-50 dark:hover:bg-cyan-950 hover:border-cyan-500 dark:hover:border-cyan-500 transition-colors"
          >
            {totalPages}
          </Link>
        </>
      )}

      {/* Next Button */}
      {currentPage < totalPages ? (
        <Link
          href={`/news?page=${currentPage + 1}`}
          className="flex items-center gap-1 px-4 py-2 rounded-lg border border-zinc-200 dark:border-zinc-800 hover:bg-cyan-50 dark:hover:bg-cyan-950 hover:border-cyan-500 dark:hover:border-cyan-500 transition-colors"
        >
          <span className="hidden sm:inline">Next</span>
          <ChevronRight className="w-4 h-4" />
        </Link>
      ) : (
        <div className="flex items-center gap-1 px-4 py-2 rounded-lg border border-zinc-200 dark:border-zinc-800 opacity-50 cursor-not-allowed">
          <span className="hidden sm:inline">Next</span>
          <ChevronRight className="w-4 h-4" />
        </div>
      )}
    </div>
  );
}
