import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { Button } from './Button';
import { trackPhoneClick, trackQuoteModalOpen } from '../utils/analytics';

interface ContactProps {
  onOpenQuote: () => void;
  compact?: boolean;
}

export const Contact: React.FC<ContactProps> = ({ onOpenQuote, compact = false }) => {
  return (
    <section id="contact" className="py-16 md:py-24 bg-white border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          
          {/* Info */}
          <div>
            <h2 className="text-xs md:text-sm font-bold tracking-widest text-brand-600 uppercase mb-3">Fale Conosco</h2>
            <h3 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
              Precisando de soluções em refrigeração comercial?
            </h3>
            <p className="text-slate-600 mb-8 leading-relaxed text-sm md:text-base">
              Solicite um orçamento sem compromisso ou chame nossa equipe para uma avaliação técnica. Nossa equipe está pronta para atender você com agilidade e qualidade.
            </p>

            {!compact && (
            <div className="space-y-6 mb-10">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-brand-50 text-brand-600 rounded-sm mt-1">
                  <MapPin size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 mb-1">Endereço & Dados</h4>
                  <p className="text-slate-600 text-sm">
                    Rua Pioneira Gertrude Heck Fritzen 5821<br />
                    Conj. Joao de Barro I<br />
                    Maringá - PR, 87053-124<br />
                    CNPJ: 41.179.761/0001-30
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-brand-50 text-brand-600 rounded-sm mt-1">
                  <Phone size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 mb-1">Telefone / WhatsApp</h4>
                  <a
                    href="tel:+5544999368420"
                    onClick={() => trackPhoneClick('contact_page')}
                    className="text-slate-600 text-sm hover:text-brand-600 transition-colors"
                  >
                    (44) 99936-8420
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-brand-50 text-brand-600 rounded-sm mt-1">
                  <Mail size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 mb-1">E-mail</h4>
                  <p className="text-slate-600 text-sm">contato@refrigois.com.br</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-brand-50 text-brand-600 rounded-sm mt-1">
                  <Clock size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 mb-1">Horário de Atendimento</h4>
                  <p className="text-slate-600 text-sm">
                    Segunda a Sexta: 08:00 às 18:00<br />
                    Plantão Técnico 24h para Contratos
                  </p>
                </div>
              </div>
            </div>
            )}

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                onClick={() => {
                  trackQuoteModalOpen('contact_section');
                  onOpenQuote();
                }}
                className="w-full sm:w-auto bg-brand-600 hover:bg-brand-700 border-brand-600 text-white"
              >
                Solicitar Orçamento
              </Button>
              {compact && (
                <Link
                  to="/contato"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-bold transition-all duration-200 uppercase tracking-wider text-slate-500 hover:text-brand-600 w-full sm:w-auto"
                >
                  Ver endereço e horários
                </Link>
              )}
            </div>
          </div>

          {/* Map */}
          <div className="h-[400px] lg:h-auto min-h-[400px] rounded-sm overflow-hidden shadow-lg border border-slate-200">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3660.0428455142783!2d-51.931602022216204!3d-23.45891895784123!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ecdb5ad9094565%3A0xc9ecebc295330deb!2sRefrigois%20Refrigera%C3%A7%C3%A3o%20Comercial!5e0!3m2!1spt-BR!2sbr!4v1784536854235!5m2!1spt-BR!2sbr" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen={true} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="Localização Refrigois"
            ></iframe>
          </div>
          
        </div>
      </div>
    </section>
  );
};