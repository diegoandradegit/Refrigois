import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  basePath: string; // ex: '/blog' ou '/blog/categoria/camara-fria'
}

// Gera o link de cada página: página 1 é a URL base (sem /pagina/1),
// as demais usam /pagina/N — mantém a home do blog com URL limpa.
function pageHref(basePath: string, page: number) {
  return page <= 1 ? basePath : `${basePath}/pagina/${page}`;
}

export const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, basePath }) => {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav aria-label="Paginação" className="flex items-center justify-center gap-2 mt-12 md:mt-16">
      <Link
        to={pageHref(basePath, currentPage - 1)}
        aria-disabled={currentPage <= 1}
        tabIndex={currentPage <= 1 ? -1 : undefined}
        className={`flex items-center justify-center w-10 h-10 rounded-sm border transition-colors ${
          currentPage <= 1
            ? 'border-slate-100 text-slate-300 pointer-events-none'
            : 'border-slate-200 text-slate-600 hover:border-brand-500 hover:text-brand-600'
        }`}
      >
        <ChevronLeft size={18} />
      </Link>

      {pages.map((page) => (
        <Link
          key={page}
          to={pageHref(basePath, page)}
          aria-current={page === currentPage ? 'page' : undefined}
          className={`flex items-center justify-center w-10 h-10 rounded-sm text-sm font-bold transition-colors ${
            page === currentPage
              ? 'bg-brand-600 text-white'
              : 'border border-slate-200 text-slate-600 hover:border-brand-500 hover:text-brand-600'
          }`}
        >
          {page}
        </Link>
      ))}

      <Link
        to={pageHref(basePath, currentPage + 1)}
        aria-disabled={currentPage >= totalPages}
        tabIndex={currentPage >= totalPages ? -1 : undefined}
        className={`flex items-center justify-center w-10 h-10 rounded-sm border transition-colors ${
          currentPage >= totalPages
            ? 'border-slate-100 text-slate-300 pointer-events-none'
            : 'border-slate-200 text-slate-600 hover:border-brand-500 hover:text-brand-600'
        }`}
      >
        <ChevronRight size={18} />
      </Link>
    </nav>
  );
};
