import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

export interface BreadcrumbItem {
  label: string;
  href?: string; // omitido no último item (página atual)
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  dark?: boolean; // usar quando o breadcrumb fica sobre um fundo escuro (hero)
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items, dark = false }) => {
  const base = dark ? 'text-slate-300 hover:text-white' : 'text-slate-500 hover:text-brand-600';
  const current = dark ? 'text-white' : 'text-slate-700';
  const sep = dark ? 'text-slate-500' : 'text-slate-300';

  return (
    <nav aria-label="breadcrumb" className="flex items-center flex-wrap gap-1.5 text-xs md:text-sm mb-4">
      <Link to="/" className={`flex items-center ${base} transition-colors`} aria-label="Início">
        <Home size={14} />
      </Link>
      {items.map((item, i) => (
        <React.Fragment key={i}>
          <ChevronRight size={14} className={sep} />
          {item.href ? (
            <Link to={item.href} className={`${base} transition-colors font-medium`}>
              {item.label}
            </Link>
          ) : (
            <span className={`${current} font-bold`} aria-current="page">
              {item.label}
            </span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};
