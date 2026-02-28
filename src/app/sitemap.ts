import { MetadataRoute } from 'next';
import { getAllHeadphoneArticleSlugs } from '@/data/headphone-articles';
import { getAllSpeakerArticleSlugs } from '@/data/speaker-articles';
import { getTurntableArticleSlugs } from '@/data/turntable-articles';
import { getAllMicrophoneArticleSlugs } from '@/data/microphone-articles';
import { getAllMonitorArticleSlugs } from '@/data/monitor-articles';
import { getKeyboardArticleSlugs } from '@/data/keyboard-articles';
import { getMouseArticleSlugs } from '@/data/mouse-articles';
import { getWebcamArticleSlugs } from '@/data/webcam-articles';
import { getLuggageArticleSlugs } from '@/data/luggage-articles';
import { getPowerBankArticleSlugs } from '@/data/power-bank-articles';
import { getTravelAdapterArticleSlugs } from '@/data/travel-adapter-articles';
import { getNCHeadphoneArticleSlugs } from '@/data/nc-headphone-articles';

const baseUrl = 'https://thegadgetpick.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const urls: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    // Category pages
    {
      url: `${baseUrl}/headphones`,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/speakers`,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/turntables`,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/microphones`,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/monitors`,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/keyboards`,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/mice`,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/webcams`,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/luggage`,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/power-banks`,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/travel-adapters`,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/nc-headphones`,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
  ];

  // Article pages
  const headphoneSlugs = getAllHeadphoneArticleSlugs();
  headphoneSlugs.forEach((slug) => {
    urls.push({
      url: `${baseUrl}/headphones/${slug}`,
      changeFrequency: 'monthly',
      priority: 0.8,
    });
  });

  const speakerSlugs = getAllSpeakerArticleSlugs();
  speakerSlugs.forEach((slug) => {
    urls.push({
      url: `${baseUrl}/speakers/${slug}`,
      changeFrequency: 'monthly',
      priority: 0.8,
    });
  });

  const turntableSlugs = getTurntableArticleSlugs();
  turntableSlugs.forEach((slug) => {
    urls.push({
      url: `${baseUrl}/turntables/${slug}`,
      changeFrequency: 'monthly',
      priority: 0.8,
    });
  });

  const microphoneSlugs = getAllMicrophoneArticleSlugs();
  microphoneSlugs.forEach((slug) => {
    urls.push({
      url: `${baseUrl}/microphones/${slug}`,
      changeFrequency: 'monthly',
      priority: 0.8,
    });
  });

  const monitorSlugs = getAllMonitorArticleSlugs();
  monitorSlugs.forEach((slug) => {
    urls.push({
      url: `${baseUrl}/monitors/${slug}`,
      changeFrequency: 'monthly',
      priority: 0.8,
    });
  });

  const keyboardSlugs = getKeyboardArticleSlugs();
  keyboardSlugs.forEach((slug) => {
    urls.push({
      url: `${baseUrl}/keyboards/${slug}`,
      changeFrequency: 'monthly',
      priority: 0.8,
    });
  });

  const mouseSlugs = getMouseArticleSlugs();
  mouseSlugs.forEach((slug) => {
    urls.push({
      url: `${baseUrl}/mice/${slug}`,
      changeFrequency: 'monthly',
      priority: 0.8,
    });
  });

  const webcamSlugs = getWebcamArticleSlugs();
  webcamSlugs.forEach((slug) => {
    urls.push({
      url: `${baseUrl}/webcams/${slug}`,
      changeFrequency: 'monthly',
      priority: 0.8,
    });
  });

  const luggageSlugs = getLuggageArticleSlugs();
  luggageSlugs.forEach((slug) => {
    urls.push({
      url: `${baseUrl}/luggage/${slug}`,
      changeFrequency: 'monthly',
      priority: 0.8,
    });
  });

  const powerBankSlugs = getPowerBankArticleSlugs();
  powerBankSlugs.forEach((slug) => {
    urls.push({
      url: `${baseUrl}/power-banks/${slug}`,
      changeFrequency: 'monthly',
      priority: 0.8,
    });
  });

  const travelAdapterSlugs = getTravelAdapterArticleSlugs();
  travelAdapterSlugs.forEach((slug) => {
    urls.push({
      url: `${baseUrl}/travel-adapters/${slug}`,
      changeFrequency: 'monthly',
      priority: 0.8,
    });
  });

  const ncHeadphoneSlugs = getNCHeadphoneArticleSlugs();
  ncHeadphoneSlugs.forEach((slug) => {
    urls.push({
      url: `${baseUrl}/nc-headphones/${slug}`,
      changeFrequency: 'monthly',
      priority: 0.8,
    });
  });

  return urls;
}
