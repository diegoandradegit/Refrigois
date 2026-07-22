import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { serviceCategoriesData, servicesData } from '../data';
import { trackQuoteModalOpen } from '../utils/analytics';

interface HeaderProps {
  onOpenQuote: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenQuote }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [desktopServicesOpen, setDesktopServicesOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isHomePage = location.pathname === '/';
  // On other pages, header should always have solid background to avoid white text on white bg
  const shouldBeSolid = isScrolled || !isHomePage;

  const navLinks = [
    { name: 'Início', href: '/' },
    { name: 'Produtos', href: '/produtos' },
    { name: 'Soluções', href: '/solucoes' },
    { name: 'Portfólio', href: '/projetos' },
    { name: 'Blog', href: '/blog' },
    { name: 'Contato', href: '/contato' },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        shouldBeSolid ? 'bg-white shadow-md py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <img 
              src="/logo.png" 
              alt="Refrigóis" 
              referrerPolicy="no-referrer"
              className={`h-12 md:h-16 w-auto object-contain transition-all duration-300 ${!shouldBeSolid ? 'brightness-0 invert' : ''}`}
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className={`text-sm font-medium tracking-wide hover:text-brand-500 transition-colors ${
                shouldBeSolid ? 'text-slate-900' : 'text-white'
              }`}
            >
              Início
            </Link>

            {/* Serviços dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setDesktopServicesOpen(true)}
              onMouseLeave={() => setDesktopServicesOpen(false)}
            >
              <Link
                to="/servicos"
                className={`flex items-center gap-1 text-sm font-medium tracking-wide hover:text-brand-500 transition-colors ${
                  shouldBeSolid ? 'text-slate-900' : 'text-white'
                }`}
              >
                Serviços
                <ChevronDown size={14} className={`transition-transform ${desktopServicesOpen ? 'rotate-180' : ''}`} />
              </Link>

              {desktopServicesOpen && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4 w-[560px]">
                  <div className="bg-white rounded-sm shadow-xl border border-slate-100 grid grid-cols-2 divide-x divide-slate-100 overflow-hidden">
                    {serviceCategoriesData.map((category) => (
                      <div key={category.slug} className="p-5">
                        <Link
                          to={`/servicos/${category.slug}`}
                          className="block text-sm font-bold text-slate-900 uppercase tracking-wide mb-3 hover:text-brand-600 transition-colors"
                        >
                          {category.title}
                        </Link>
                        <ul className="space-y-2">
                          {servicesData
                            .filter((s) => s.categorySlug === category.slug)
                            .map((s) => (
                              <li key={s.id}>
                                <Link
                                  to={`/servicos/${category.slug}/${s.slug}`}
                                  className="block text-sm text-slate-600 hover:text-brand-600 transition-colors"
                                >
                                  {s.title}
                                </Link>
                              </li>
                            ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {navLinks.slice(1).map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className={`text-sm font-medium tracking-wide hover:text-brand-500 transition-colors ${
                  shouldBeSolid ? 'text-slate-900' : 'text-white'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <button
              onClick={() => {
                trackQuoteModalOpen('header_desktop');
                onOpenQuote();
              }}
              className={`px-5 py-2 text-sm font-medium uppercase tracking-wider border transition-all ${
                shouldBeSolid 
                  ? 'border-brand-600 text-brand-600 hover:bg-brand-600 hover:text-white' 
                  : 'border-white text-white hover:bg-white hover:text-brand-900'
              }`}
            >
              Orçamento
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Menu"
          >
            {mobileMenuOpen ? (
              <X className={shouldBeSolid ? 'text-slate-900' : 'text-white'} />
            ) : (
              <Menu className={shouldBeSolid ? 'text-slate-900' : 'text-white'} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-xl border-t border-slate-100 py-6 px-4 flex flex-col space-y-1 max-h-[80vh] overflow-y-auto">
          <Link
            to="/"
            className="text-lg font-bold text-slate-900 py-2 border-b border-slate-100"
            onClick={() => setMobileMenuOpen(false)}
          >
            Início
          </Link>

          {/* Serviços accordion */}
          <div className="border-b border-slate-100">
            <button
              className="w-full flex items-center justify-between text-lg font-bold text-slate-900 py-2"
              onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
            >
              Serviços
              <ChevronDown size={18} className={`transition-transform ${mobileServicesOpen ? 'rotate-180' : ''}`} />
            </button>
            {mobileServicesOpen && (
              <div className="pb-3 pl-3 space-y-4">
                {serviceCategoriesData.map((category) => (
                  <div key={category.slug}>
                    <Link
                      to={`/servicos/${category.slug}`}
                      className="block text-sm font-bold text-brand-600 uppercase tracking-wide mb-2"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {category.title}
                    </Link>
                    <ul className="space-y-2">
                      {servicesData
                        .filter((s) => s.categorySlug === category.slug)
                        .map((s) => (
                          <li key={s.id}>
                            <Link
                              to={`/servicos/${category.slug}/${s.slug}`}
                              className="block text-sm text-slate-600"
                              onClick={() => setMobileMenuOpen(false)}
                            >
                              {s.title}
                            </Link>
                          </li>
                        ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}
          </div>

          {navLinks.slice(1).map((link) => (
            <Link
              key={link.name}
              to={link.href}
              className="text-lg font-bold text-slate-900 py-2 border-b border-slate-100"
              onClick={() => setMobileMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          <button
            onClick={() => {
              trackQuoteModalOpen('header_mobile');
              onOpenQuote();
              setMobileMenuOpen(false);
            }}
            className="w-full py-3 bg-brand-600 text-white uppercase font-bold tracking-widest mt-4 rounded-sm hover:bg-brand-700 transition-colors"
          >
            Solicitar Orçamento
          </button>
        </div>
      )}
    </header>
  );
};
