import React from 'react';
import { Instagram, Facebook, Linkedin, MapPin, Phone, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import { serviceCategoriesData } from '../data';

// TODO: trocar os href="#" pelos links reais assim que o Andrade enviar
const SOCIAL_LINKS = {
  instagram: 'https://www.instagram.com/refrigois',
  linkedin: '#',
  facebook: '#',
  googleBusiness: '#',
};

const GoogleIcon: React.FC<{ size?: number }> = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 10.2v3.9h5.5c-.24 1.35-1.7 3.96-5.5 3.96-3.31 0-6.02-2.74-6.02-6.12S8.19 5.82 11.5 5.82c1.89 0 3.15.8 3.87 1.49l2.64-2.54C16.36 3.16 14.13 2.2 11.5 2.2 6.24 2.2 2 6.5 2 11.94s4.24 9.74 9.5 9.74c5.48 0 9.12-3.85 9.12-9.28 0-.62-.07-1.1-.15-1.57L12 10.2z" />
  </svg>
);

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-400 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <img 
                src="/logo.png" 
                alt="Refrigóis" 
                referrerPolicy="no-referrer"
                className="h-12 md:h-16 w-auto object-contain brightness-0 invert"
              />
            </div>
            <p className="text-sm leading-relaxed mb-6">
              Soluções completas em refrigeração comercial e industrial. Fabricação, instalação e assistência técnica especializada.
            </p>
            <div className="flex gap-4">
              <a
                href={SOCIAL_LINKS.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
                aria-label="Instagram da Refrigóis"
                title="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a
                href={SOCIAL_LINKS.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
                aria-label="Facebook da Refrigóis"
                title="Facebook"
              >
                <Facebook size={20} />
              </a>
              <a
                href={SOCIAL_LINKS.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
                aria-label="LinkedIn da Refrigóis"
                title="LinkedIn"
              >
                <Linkedin size={20} />
              </a>
              <a
                href={SOCIAL_LINKS.googleBusiness}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
                aria-label="Ficha da Refrigóis no Google Meu Negócio"
                title="Google Meu Negócio"
              >
                <GoogleIcon size={20} />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-white font-bold uppercase tracking-wider mb-6">Navegação</h4>
            <ul className="space-y-3 text-sm">
              <li><Link to="/" className="hover:text-brand-400 transition-colors">Início</Link></li>
              <li><Link to="/servicos" className="hover:text-brand-400 transition-colors">Serviços</Link></li>
              <li><Link to="/produtos" className="hover:text-brand-400 transition-colors">Produtos</Link></li>
              <li><Link to="/projetos" className="hover:text-brand-400 transition-colors">Portfólio</Link></li>
              <li><Link to="/contato" className="hover:text-brand-400 transition-colors">Contato</Link></li>
            </ul>
          </div>

          {/* Services List */}
          <div>
            <h4 className="text-white font-bold uppercase tracking-wider mb-6">Serviços</h4>
            <ul className="space-y-3 text-sm">
              {/* Categorias vindas do banco: criar uma nova no painel faz ela
                  aparecer aqui e no menu, sem alterar codigo. */}
              {serviceCategoriesData.map((c) => (
                <li key={c.slug}>
                  <Link to={`/servicos/${c.slug}`} className="hover:text-brand-400 transition-colors">
                    {c.title}
                  </Link>
                </li>
              ))}
              <li><Link to="/solucoes" className="hover:text-brand-400 transition-colors">Soluções por Segmento</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white font-bold uppercase tracking-wider mb-6">Contato</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="shrink-0 mt-1 text-brand-400" />
                <span>Rua Pioneira Gertrude Heck Fritzen 5821, Conj. Joao de Barro I, Maringá - PR<br/>CEP: 87053-124</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="shrink-0 text-brand-400" />
                <span>(44) 99936-8420</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="shrink-0 text-brand-400" />
                <span>contato@refrigois.com.br</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Cobertura regional — texto crawleável para SEO local, sem páginas
            de cidade ainda (essas entram quando houver dados do Search Console) */}
        <div className="border-t border-slate-800 pt-8 mb-8">
          <h4 className="text-white font-bold uppercase tracking-wider mb-4 text-sm">Atendimento em todo o Paraná</h4>
          <p className="text-sm leading-relaxed">
            Fabricação, instalação e manutenção de câmara fria e refrigeração comercial para
            Maringá, Londrina, Paranavaí, Umuarama, Campo Mourão, Cascavel, Cianorte, Apucarana,
            Arapongas, Toledo, Sarandi, Paiçandu, Marialva, Mandaguaçu, Guaíra, Foz do Iguaçu,
            Guarapuava, Ponta Grossa, Curitiba e região.
          </p>
        </div>

        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-slate-500">
          <p>&copy; {new Date().getFullYear()} Refrigois. CNPJ: 41.179.761/0001-30. Todos os direitos reservados.</p>
          <nav className="mt-3 md:mt-0 flex flex-wrap gap-x-5 gap-y-2 justify-center">
            <Link to="/politica-de-privacidade" className="hover:text-brand-400 transition-colors">Política de Privacidade</Link>
            <Link to="/termos-de-uso" className="hover:text-brand-400 transition-colors">Termos de Uso</Link>
            <Link to="/politica-de-cookies" className="hover:text-brand-400 transition-colors">Política de Cookies</Link>
          </nav>
        </div>
      </div>
    </footer>
  );
};