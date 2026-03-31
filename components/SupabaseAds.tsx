import React, { useEffect, useState } from 'react';
import { AdConfig } from '../src/constants/ads';
import { supabase } from '../src/lib/supabase';
import { LocalAd } from './LocalAd';

export const SupabaseAds: React.FC = () => {
  const [ads, setAds] = useState<AdConfig[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAds() {
      console.log('Iniciando busca de anúncios no Supabase...');
      if (!supabase) {
        console.error('Cliente Supabase não inicializado. Verifique as chaves VITE_SUPABASE_URL e VITE_SUPABASE_ANON_KEY.');
        setLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from('ads')
          .select('*')
          .eq('is_active', true)
          .order('display_order', { ascending: true });

        if (error) {
          console.error('Erro retornado pelo Supabase:', error.message, error.details);
          throw error;
        }

        console.log('Dados recebidos do Supabase:', data);

        if (data) {
          const formattedAds: AdConfig[] = data.map(item => ({
            imageName: item.image_url,
            link: item.link,
            label: item.label,
            isExternal: item.image_url?.startsWith('http')
          }));
          setAds(formattedAds);
        }
      } catch (err) {
        console.error('Erro catastrófico na busca:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchAds();
  }, []);

  if (loading) return null;
  if (ads.length === 0) return null;

  return (
    <>
      {ads.map((ad, index) => (
        <LocalAd key={index} ad={ad} />
      ))}
    </>
  );
};
