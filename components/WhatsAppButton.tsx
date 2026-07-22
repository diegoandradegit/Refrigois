import React from 'react';
import { MessageCircle } from 'lucide-react';
import { trackWhatsAppClick } from '../utils/analytics';

export const WhatsAppButton: React.FC = () => {
  const whatsappNumber = "5544999368420";
  const message = encodeURIComponent("Olá! Estou no site da Refrigois e gostaria de tirar dúvidas sobre serviços de refrigeração.");

  return (
    <a
      href={`https://wa.me/${whatsappNumber}?text=${message}`}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackWhatsAppClick('floating_button')}
      className="fixed bottom-6 right-6 z-40 bg-green-600 text-white p-4 rounded-full shadow-lg hover:bg-green-700 hover:scale-110 transition-all duration-300 flex items-center justify-center group"
      aria-label="Conversar no WhatsApp"
    >
      <MessageCircle size={28} fill="white" className="text-green-600" />
      <span className="absolute right-full mr-3 bg-white text-slate-800 text-xs font-bold py-1 px-2 rounded shadow-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
        Falar com Técnico
      </span>
    </a>
  );
};