export interface FleetItem {
  id: string;
  name: string;
  category: string;
  image: string;
  description: string;
  specifications: {
    capacity: string;
    reach: string;
    height: string;
  };
}

/**
 * DADOS DA FROTA
 * Imagens reais já disponíveis em /public/images/muncks e /public/images/mini-escavadeiras.
 * Substitua as especificações ("A definir") pelos valores reais quando disponíveis.
 */
export const fleet: FleetItem[] = [
  {
    id: 'munck-01',
    name: 'Munck',
    category: 'Caminhão Munck',
    image: '/images/muncks/SaveClip.App_627057160_17848087728674765_570776591729023714_n.jpg',
    description:
      'Caminhão munck para movimentação e transporte de cargas pesadas com precisão e agilidade.',
    specifications: {
      capacity: 'A definir',
      reach: 'A definir',
      height: 'A definir',
    },
  },
  {
    id: 'munck-02',
    name: 'Munck',
    category: 'Caminhão Munck',
    image: '/images/muncks/SaveClip.App_742760307_17879755581674765_1228251183448042131_n.jpg',
    description:
      'Caminhão munck pronto para operações de elevação e transporte em obras e projetos.',
    specifications: {
      capacity: 'A definir',
      reach: 'A definir',
      height: 'A definir',
    },
  },
  {
    id: 'micro-escavadeira-01',
    name: 'Micro Escavadeira',
    category: 'Micro Escavadeira',
    image: '/images/mini-escavadeiras/image.png',
    description:
      'Micro escavadeira para escavações, demolições e serviços em espaços reduzidos com alta precisão.',
    specifications: {
      capacity: 'A definir',
      reach: 'A definir',
      height: 'A definir',
    },
  },
];
