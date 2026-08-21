export interface Differential {
  id: string;
  index: string;
  title: string;
  description: string;
  icon: string;
}

export const differentials: Differential[] = [
  {
    id: 'atendimento',
    index: '01',
    title: 'ATENDIMENTO RÁPIDO',
    description: 'Resposta e atendimento direcionado ao cliente.',
    icon: 'Zap',
  },
  {
    id: 'seguranca',
    index: '02',
    title: 'SEGURANÇA',
    description: 'Operações com foco em segurança em cada etapa.',
    icon: 'ShieldCheck',
  },
  {
    id: 'cargas-pesadas',
    index: '03',
    title: 'CARGAS PESADAS',
    description: 'Estrutura voltada à movimentação de cargas.',
    icon: 'Anchor',
  },
  {
    id: 'equipe-tecnica',
    index: '04',
    title: 'EQUIPE TÉCNICA',
    description: 'Equipe preparada para operações especializadas.',
    icon: 'HardHat',
  },
];
