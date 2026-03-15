import Link from "next/link";

// Import getters for all categories
import { getKeyboardArticle, getKeyboardArticleSlugs } from "@/data/keyboard-articles";
import { getMonitorArticle, getAllMonitorArticleSlugs } from "@/data/monitor-articles";
import { getMouseArticle, getMouseArticleSlugs } from "@/data/mouse-articles";
import { getHeadphoneArticle, getAllHeadphoneArticleSlugs } from "@/data/headphone-articles";
import { getNCHeadphoneArticle, getNCHeadphoneArticleSlugs } from "@/data/nc-headphone-articles";
import { getMicrophoneArticle, getAllMicrophoneArticleSlugs } from "@/data/microphone-articles";
import { getWebcamArticle, getWebcamArticleSlugs } from "@/data/webcam-articles";
import { getSpeakerArticle, getAllSpeakerArticleSlugs } from "@/data/speaker-articles";
import { getTurntableArticle, getTurntableArticleSlugs } from "@/data/turntable-articles";
import { travelAdapterArticles, getTravelAdapterArticleSlugs } from "@/data/travel-adapter-articles";
import { getLuggageArticle, getLuggageArticleSlugs } from "@/data/luggage-articles";
import { getPowerBankArticle, getPowerBankArticleSlugs } from "@/data/power-bank-articles";
import { getPetCameraArticle, getAllPetCameraArticleSlugs } from "@/data/pet-camera-articles";
import { getSecurityCameraArticle, getAllSecurityCameraArticleSlugs } from "@/data/security-camera-articles";
import { getRobotVacuumArticle, getAllRobotVacuumArticleSlugs } from "@/data/robot-vacuum-articles";
import { getAirFryerArticle, getAllAirFryerArticleSlugs } from "@/data/air-fryer-articles";
import { getAirPurifierArticle, getAllAirPurifierArticleSlugs } from "@/data/air-purifier-articles";
import { getClimateControlArticle, getAllClimateControlArticleSlugs } from "@/data/climate-control-articles";
import { getMassageGunArticle, getAllMassageGunArticleSlugs } from "@/data/massage-gun-articles";
import { getElectricToothbrushArticle, getAllElectricToothbrushArticleSlugs } from "@/data/electric-toothbrush-articles";

interface CrossCategoryLinksProps {
  currentCategory: string;
}

interface CategoryConfig {
  name: string;
  path: string;
  getSlugs: () => string[];
  getArticle: (slug: string) => any;
}

const categoryMap: Record<string, CategoryConfig> = {
  "keyboards": {
    name: "Keyboards",
    path: "/keyboards",
    getSlugs: getKeyboardArticleSlugs,
    getArticle: getKeyboardArticle,
  },
  "monitors": {
    name: "Monitors",
    path: "/monitors",
    getSlugs: getAllMonitorArticleSlugs,
    getArticle: getMonitorArticle,
  },
  "mouse": {
    name: "Mouse",
    path: "/mouse",
    getSlugs: getMouseArticleSlugs,
    getArticle: getMouseArticle,
  },
  "headphones": {
    name: "Headphones",
    path: "/headphones",
    getSlugs: getAllHeadphoneArticleSlugs,
    getArticle: getHeadphoneArticle,
  },
  "nc-headphones": {
    name: "Noise Cancelling Headphones",
    path: "/nc-headphones",
    getSlugs: getNCHeadphoneArticleSlugs,
    getArticle: getNCHeadphoneArticle,
  },
  "microphones": {
    name: "Microphones",
    path: "/microphones",
    getSlugs: getAllMicrophoneArticleSlugs,
    getArticle: getMicrophoneArticle,
  },
  "webcams": {
    name: "Webcams",
    path: "/webcams",
    getSlugs: getWebcamArticleSlugs,
    getArticle: getWebcamArticle,
  },
  "speakers": {
    name: "Speakers",
    path: "/speakers",
    getSlugs: getAllSpeakerArticleSlugs,
    getArticle: getSpeakerArticle,
  },
  "turntables": {
    name: "Turntables",
    path: "/turntables",
    getSlugs: getTurntableArticleSlugs,
    getArticle: getTurntableArticle,
  },
  "travel-adapters": {
    name: "Travel Adapters",
    path: "/travel-adapters",
    getSlugs: getTravelAdapterArticleSlugs,
    getArticle: (slug: string) => travelAdapterArticles.find((a) => a.slug === slug) || null,
  },
  "luggage": {
    name: "Luggage",
    path: "/luggage",
    getSlugs: getLuggageArticleSlugs,
    getArticle: getLuggageArticle,
  },
  "power-banks": {
    name: "Power Banks",
    path: "/power-banks",
    getSlugs: getPowerBankArticleSlugs,
    getArticle: getPowerBankArticle,
  },
  "pet-cameras": {
    name: "Pet Cameras",
    path: "/pet-cameras",
    getSlugs: getAllPetCameraArticleSlugs,
    getArticle: getPetCameraArticle,
  },
  "security-cameras": {
    name: "Security Cameras",
    path: "/security-cameras",
    getSlugs: getAllSecurityCameraArticleSlugs,
    getArticle: getSecurityCameraArticle,
  },
  "robot-vacuums": {
    name: "Robot Vacuums",
    path: "/robot-vacuums",
    getSlugs: getAllRobotVacuumArticleSlugs,
    getArticle: getRobotVacuumArticle,
  },
  "air-fryers": {
    name: "Air Fryers",
    path: "/air-fryers",
    getSlugs: getAllAirFryerArticleSlugs,
    getArticle: getAirFryerArticle,
  },
  "air-purifiers": {
    name: "Air Purifiers",
    path: "/air-purifiers",
    getSlugs: getAllAirPurifierArticleSlugs,
    getArticle: getAirPurifierArticle,
  },
  "climate-control": {
    name: "Climate Control",
    path: "/climate-control",
    getSlugs: getAllClimateControlArticleSlugs,
    getArticle: getClimateControlArticle,
  },
  "massage-guns": {
    name: "Massage Guns",
    path: "/massage-guns",
    getSlugs: getAllMassageGunArticleSlugs,
    getArticle: getMassageGunArticle,
  },
  "electric-toothbrushes": {
    name: "Electric Toothbrushes",
    path: "/electric-toothbrushes",
    getSlugs: getAllElectricToothbrushArticleSlugs,
    getArticle: getElectricToothbrushArticle,
  },
};

const relatedCategories: Record<string, string[]> = {
  "keyboards": ["monitors", "mouse", "headphones"],
  "monitors": ["keyboards", "mouse", "webcams"],
  "mouse": ["keyboards", "monitors", "headphones"],
  "headphones": ["nc-headphones", "speakers", "microphones"],
  "nc-headphones": ["headphones", "speakers", "turntables"],
  "microphones": ["headphones", "webcams", "speakers"],
  "webcams": ["monitors", "microphones", "keyboards"],
  "speakers": ["headphones", "turntables", "nc-headphones"],
  "turntables": ["speakers", "headphones", "nc-headphones"],
  "travel-adapters": ["luggage", "power-banks", "pet-cameras"],
  "luggage": ["travel-adapters", "power-banks", "pet-cameras"],
  "power-banks": ["travel-adapters", "luggage", "keyboards"],
  "pet-cameras": ["security-cameras", "webcams", "monitors"],
  "security-cameras": ["pet-cameras", "robot-vacuums", "webcams"],
  "robot-vacuums": ["air-purifiers", "security-cameras", "air-fryers"],
  "air-fryers": ["robot-vacuums", "air-purifiers", "climate-control"],
  "air-purifiers": ["robot-vacuums", "air-fryers", "climate-control"],
  "climate-control": ["air-purifiers", "air-fryers", "massage-guns"],
  "massage-guns": ["electric-toothbrushes", "climate-control", "air-purifiers"],
  "electric-toothbrushes": ["massage-guns", "air-purifiers", "climate-control"],
};

export default function CrossCategoryLinks({ currentCategory }: CrossCategoryLinksProps) {
  const related = relatedCategories[currentCategory] || [];

  const links = related
    .map((catKey) => {
      const cat = categoryMap[catKey];
      if (!cat) return null;
      const slugs = cat.getSlugs();
      if (slugs.length === 0) return null;
      const firstSlug = slugs[0];
      const article = cat.getArticle(firstSlug);
      if (!article) return null;
      return {
        catKey,
        cat,
        slug: firstSlug,
        article,
      };
    })
    .filter((item): item is NonNullable<typeof item> => item !== null);

  if (links.length === 0) {
    return null;
  }

  return (
    <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-gray-200">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Explore More</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {links.map(({ catKey, cat, slug, article }) => (
          <Link
            key={catKey}
            href={`${cat.path}/${slug}`}
            className="p-4 bg-gray-50 rounded-lg hover:bg-blue-50 hover:border-blue-200 border border-gray-200 transition"
          >
            <p className="text-xs font-medium text-blue-600 uppercase tracking-wide mb-1">
              {cat.name}
            </p>
            <h3 className="font-semibold text-gray-900 text-sm">{article.title}</h3>
            <p className="text-xs text-gray-500 mt-1 line-clamp-2">
              {article.description || article.excerpt}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}
