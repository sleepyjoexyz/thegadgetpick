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

const baseUrl = 'https://www.thegadgetpick.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const urls: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    // Category pages
    {
      url: `${baseUrl}/headphones`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/speakers`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/turntables`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/microphones`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/monitors`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/keyboards`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/mice`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/webcams`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/luggage`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/power-banks`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/travel-adapters`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/noise-canceling-headphones`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    // Deals pages
    {
      url: `${baseUrl}/deals`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/deals/headphones`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/deals/speakers`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/deals/monitors`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/deals/keyboards`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/deals/mice`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/deals/webcams`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/deals/power-banks`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/deals/travel-adapters`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.85,
    },
  ];

  // Article pages
  const headphoneSlugs = getAllHeadphoneArticleSlugs();
  headphoneSlugs.forEach((slug) => {
    urls.push({
      url: `${baseUrl}/headphones/${slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    });
  });

  const speakerSlugs = getAllSpeakerArticleSlugs();
  speakerSlugs.forEach((slug) => {
    urls.push({
      url: `${baseUrl}/speakers/${slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    });
  });

  const turntableSlugs = getTurntableArticleSlugs();
  turntableSlugs.forEach((slug) => {
    urls.push({
      url: `${baseUrl}/turntables/${slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    });
  });

  const microphoneSlugs = getAllMicrophoneArticleSlugs();
  microphoneSlugs.forEach((slug) => {
    urls.push({
      url: `${baseUrl}/microphones/${slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    });
  });

  const monitorSlugs = getAllMonitorArticleSlugs();
  monitorSlugs.forEach((slug) => {
    urls.push({
      url: `${baseUrl}/monitors/${slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    });
  });

  const keyboardSlugs = getKeyboardArticleSlugs();
  keyboardSlugs.forEach((slug) => {
    urls.push({
      url: `${baseUrl}/keyboards/${slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    });
  });

  const mouseSlugs = getMouseArticleSlugs();
  mouseSlugs.forEach((slug) => {
    urls.push({
      url: `${baseUrl}/mice/${slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    });
  });

  const webcamSlugs = getWebcamArticleSlugs();
  webcamSlugs.forEach((slug) => {
    urls.push({
      url: `${baseUrl}/webcams/${slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    });
  });

  const luggageSlugs = getLuggageArticleSlugs();
  luggageSlugs.forEach((slug) => {
    urls.push({
      url: `${baseUrl}/luggage/${slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    });
  });

  const powerBankSlugs = getPowerBankArticleSlugs();
  powerBankSlugs.forEach((slug) => {
    urls.push({
      url: `${baseUrl}/power-banks/${slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    });
  });

  const travelAdapterSlugs = getTravelAdapterArticleSlugs();
  travelAdapterSlugs.forEach((slug) => {
    urls.push({
      url: `${baseUrl}/travel-adapters/${slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    });
  });

  const ncHeadphoneSlugs = getNCHeadphoneArticleSlugs();
  ncHeadphoneSlugs.forEach((slug) => {
    urls.push({
      url: `${baseUrl}/noise-canceling-headphones/${slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    });
  });

  return urls;
}
