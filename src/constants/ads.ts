export interface AdConfig {
  imageName: string;
  link: string;
  label?: string;
  isExternal?: boolean;
}

export const LOCAL_ADS: AdConfig[] = [
  // Lista vazia ou com anúncios que usem URLs externas (http...)
  // Exemplo: { imageName: 'https://via.placeholder.com/300x150', link: '#', label: 'Anuncie Aqui', isExternal: true }
];
