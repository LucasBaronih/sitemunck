export interface Service {
  id: string;
  index: string;
  title: string;
  description: string;
  icon: string;
  features: string[];
}

export const services: Service[] = [
  {
    id: 'locacao-munck',
    index: '01',
    title: 'LOCAÇÃO DE MUNCK',
    description:
      'Movimentação e transporte de cargas com caminhões munck equipados para operações que exigem precisão e agilidade.',
    icon: 'Truck',
    features: ['Cargas pesadas', 'Operação ágil', 'Equipe especializada'],
  },
  {
    id: 'micro-escavadeiras',
    index: '02',
    title: 'MICRO ESCAVADEIRAS',
    description:
      'Locação de micro escavadeiras para escavações, demolições e serviços em espaços reduzidos onde máquinas maiores não chegam.',
    icon: 'Shovel',
    features: ['Espaços reduzidos', 'Versatilidade', 'Alta precisão'],
  },
  {
    id: 'transporte-cargas',
    index: '03',
    title: 'TRANSPORTE DE CARGAS',
    description:
      'Logística e movimentação especializada de cargas pesadas com foco em segurança e pontualidade.',
    icon: 'Package',
    features: ['Logística especializada', 'Carga segura', 'Pontualidade'],
  },
  {
    id: 'operacoes-industriais',
    index: '04',
    title: 'OPERAÇÕES INDUSTRIAIS',
    description:
      'Soluções para obras e projetos industriais que demandam movimentação técnica de equipamentos e materiais.',
    icon: 'Factory',
    features: ['Obras e projetos', 'Operação técnica', 'Suporte dedicado'],
  },
];
