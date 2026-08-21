export interface Testimonial {
  id: string;
  quote: string;
  author: string;
}

/**
 * Depoimentos fornecidos pela empresa. Não inventar nomes de clientes.
 */
export const testimonials: Testimonial[] = [
  {
    id: 't1',
    quote: 'Se tem outro na cidade não conheço.',
    author: 'Cliente UltraMunck',
  },
  {
    id: 't2',
    quote: 'Equipe pontual e altamente técnica!',
    author: 'Cliente UltraMunck',
  },
  {
    id: 't3',
    quote: 'Muito bom, profissionais!',
    author: 'Cliente UltraMunck',
  },
];
