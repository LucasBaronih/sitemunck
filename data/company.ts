export const company = {
  name: 'UltraMunck',
  tagline: 'Locação de Muncks e Micro Escavadeiras',
  bio: 'Somos especializados em transporte e movimentação de cargas pesadas! Atendimento rápido e seguro para sua obra ou projeto.',
  heroHeadline: 'MOVEMOS O QUE PARECE IMPOSSÍVEL.',
  heroSubheadline:
    'Locação de muncks e micro escavadeiras para obras, projetos e operações industriais. Precisão mecânica, atendimento rápido e segurança em cada operação.',
  address: {
    street: 'Av. Luiz Pereira Leite, 179',
    district: 'Jardim Oriente',
    city: 'Piracicaba',
    state: 'SP',
    zip: '13426-239',
    full: 'Av. Luiz Pereira Leite, 179 - Jardim Oriente, Piracicaba - SP, 13426-239',
  },
  whatsapp: {
    number: '(19) 99921-4954',
    link: 'https://wa.me/5519999214954',
    message:
      'Olá, vim pelo site da UltraMunck e gostaria de solicitar um orçamento para locação de munck/micro escavadeira.',
  },
  instagram: {
    handle: '@ultramunck',
    link: 'https://instagram.com/ultramunck',
  },
  hours: 'Aberto até as 17:00',
  geo: {
    lat: -22.7253,
    lng: -47.6491,
  },
} as const;

export const navLinks = [
  { label: 'Início', href: '#inicio' },
  { label: 'Serviços', href: '#servicos' },
  { label: 'Frota', href: '#frota' },
  { label: 'Diferenciais', href: '#diferenciais' },
  { label: 'Depoimentos', href: '#depoimentos' },
  { label: 'Contato', href: '#contato' },
] as const;

export function getWhatsAppLink(customMessage?: string): string {
  const msg = customMessage ?? company.whatsapp.message;
  return `${company.whatsapp.link}?text=${encodeURIComponent(msg)}`;
}
