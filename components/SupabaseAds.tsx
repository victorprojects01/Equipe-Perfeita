import React, { useEffect, useState } from 'react';
import { AdConfig } from '../src/constants/ads';
import { supabase } from '../src/lib/supabase';
import { LocalAd } from './LocalAd';

export const SupabaseAds: React.FC = () => {
  const [ads, setAds] = useState<AdConfig[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAds() {
      if (!supabase) {
        setLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from('ads')
          .select('*')
          .eq('is_active', true)
          .order('display_order', { ascending: true });

        if (error) throw error;

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
        console.error('Erro ao buscar anúncios do Supabase:', err);
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
