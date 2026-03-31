export interface AdConfig {
  imageName: string;
  link: string;
  label?: string;
  isExternal?: boolean;
}

export const LOCAL_ADS: AdConfig[] = [
  {
    imageName: 'nexumprom.png',
    link: 'https://www.instagram.com/nexummrconsultoria?igsh=bTFlY2YwdWhydTJu',
    label: 'Patrocinador Master'
  },
  /* 
  CÓDIGO PADRÃO PARA NOVOS ANÚNCIOS:
  {
    imageName: 'nome-da-imagem.png',
    link: 'https://link-do-site.com',
    label: 'ESCOLHA UMA LABEL ABAIXO'
  },

  LABELS POSSÍVEIS (EXEMPLOS):
  - 'Patrocinador Master'
  - 'Patrocinador Oficial'
  - 'Apoio'
  - 'Parceiro'
  - 'Publicidade'
  - 'Anuncie Aqui'
  - 'Promoção'
  - 'Oferta Especial'
  - 'Destaque'
  */
];
