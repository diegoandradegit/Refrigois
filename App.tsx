import React, { useState, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { QuoteModal } from './components/QuoteModal';
import { WhatsAppButton } from './components/WhatsAppButton';
import { AnnouncementPopup } from './components/AnnouncementPopup';
import { Home } from './pages/Home';
import { ErrorBoundary } from './components/ErrorBoundary';

// Code-splitting por rota: cada página vira um chunk JS separado, carregado
// só quando o visitante navega até ela — melhora o tempo de carregamento
// inicial (o que a home carrega) e o Core Web Vitals do site inteiro.
const ServicesPage = lazy(() => import('./pages/ServicesPage').then(m => ({ default: m.ServicesPage })));
const ServiceCategoryPage = lazy(() => import('./pages/ServiceCategoryPage').then(m => ({ default: m.ServiceCategoryPage })));
const IndividualServicePage = lazy(() => import('./pages/IndividualServicePage').then(m => ({ default: m.IndividualServicePage })));
const ProjectsPage = lazy(() => import('./pages/ProjectsPage').then(m => ({ default: m.ProjectsPage })));
const IndividualProjectPage = lazy(() => import('./pages/IndividualProjectPage').then(m => ({ default: m.IndividualProjectPage })));
const ProductsPage = lazy(() => import('./pages/ProductsPage').then(m => ({ default: m.ProductsPage })));
const IndividualProductPage = lazy(() => import('./pages/IndividualProductPage').then(m => ({ default: m.IndividualProductPage })));
const ContactPage = lazy(() => import('./pages/ContactPage').then(m => ({ default: m.ContactPage })));
const BlogPage = lazy(() => import('./pages/BlogPage').then(m => ({ default: m.BlogPage })));
const BlogPostPage = lazy(() => import('./pages/BlogPostPage').then(m => ({ default: m.BlogPostPage })));
const BlogCategoryPage = lazy(() => import('./pages/BlogCategoryPage').then(m => ({ default: m.BlogCategoryPage })));
const SegmentsPage = lazy(() => import('./pages/SegmentsPage').then(m => ({ default: m.SegmentsPage })));
const SegmentPage = lazy(() => import('./pages/SegmentPage').then(m => ({ default: m.SegmentPage })));
const CityPage = lazy(() => import('./pages/CityPage').then(m => ({ default: m.CityPage })));
const PrivacyPolicyPage = lazy(() => import('./pages/PrivacyPolicyPage').then(m => ({ default: m.PrivacyPolicyPage })));
const TermsOfUsePage = lazy(() => import('./pages/TermsOfUsePage').then(m => ({ default: m.TermsOfUsePage })));
const CookiePolicyPage = lazy(() => import('./pages/CookiePolicyPage').then(m => ({ default: m.CookiePolicyPage })));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage').then(m => ({ default: m.NotFoundPage })));

const PageFallback: React.FC = () => (
  <div className="min-h-[60vh] flex items-center justify-center">
    <div className="w-10 h-10 border-4 border-brand-200 border-t-brand-600 rounded-full animate-spin" />
  </div>
);

const App: React.FC = () => {
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);

  const openQuote = () => setIsQuoteModalOpen(true);
  const closeQuote = () => setIsQuoteModalOpen(false);

  return (
    <Router>
      <div className="min-h-screen font-sans text-slate-900">
        <Header onOpenQuote={openQuote} />
        
        <ErrorBoundary>
          <Suspense fallback={<PageFallback />}>
            <Routes>
              <Route path="/" element={<Home onOpenQuote={openQuote} />} />
              <Route path="/servicos" element={<ServicesPage onOpenQuote={openQuote} />} />
              <Route path="/servicos/:categorySlug" element={<ServiceCategoryPage onOpenQuote={openQuote} />} />
              <Route path="/servicos/:categorySlug/:slug" element={<IndividualServicePage onOpenQuote={openQuote} />} />
              <Route path="/projetos" element={<ProjectsPage onOpenQuote={openQuote} />} />
              <Route path="/projetos/:slug" element={<IndividualProjectPage onOpenQuote={openQuote} />} />
              <Route path="/produtos" element={<ProductsPage onOpenQuote={openQuote} />} />
              <Route path="/produtos/:slug" element={<IndividualProductPage onOpenQuote={openQuote} />} />
              <Route path="/contato" element={<ContactPage onOpenQuote={openQuote} />} />
              <Route path="/blog" element={<BlogPage onOpenQuote={openQuote} />} />
              <Route path="/blog/pagina/:page" element={<BlogPage onOpenQuote={openQuote} />} />
              <Route path="/blog/categoria/:categorySlug" element={<BlogCategoryPage onOpenQuote={openQuote} />} />
              <Route path="/blog/categoria/:categorySlug/pagina/:page" element={<BlogCategoryPage onOpenQuote={openQuote} />} />
              <Route path="/blog/:slug" element={<BlogPostPage onOpenQuote={openQuote} />} />
              <Route path="/solucoes" element={<SegmentsPage onOpenQuote={openQuote} />} />
              <Route path="/solucoes/:slug" element={<SegmentPage onOpenQuote={openQuote} />} />
              <Route path="/cidades/:slug" element={<CityPage onOpenQuote={openQuote} />} />
              <Route path="/politica-de-privacidade" element={<PrivacyPolicyPage onOpenQuote={openQuote} />} />
              <Route path="/termos-de-uso" element={<TermsOfUsePage onOpenQuote={openQuote} />} />
              <Route path="/politica-de-cookies" element={<CookiePolicyPage onOpenQuote={openQuote} />} />
              <Route path="*" element={<NotFoundPage onOpenQuote={openQuote} />} />
            </Routes>
          </Suspense>
        </ErrorBoundary>

        <Footer />
        <WhatsAppButton />
        
        <QuoteModal isOpen={isQuoteModalOpen} onClose={closeQuote} />
        <AnnouncementPopup onOpenQuote={openQuote} />
      </div>
    </Router>
  );
};

export default App;
