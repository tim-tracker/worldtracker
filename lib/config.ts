export type CountryCode = 'GB' | 'DE' | 'FR' | 'IE' | 'ES';

export interface Country {
  code: CountryCode;
  name: string;
  flag: string;
}

export type SectorSlug = 'healthcare' | 'education' | 'economy' | 'safety' | 'environment' | 'infrastructure';

export interface SubIndicatorDef {
  key: string;
  name: string;
  unit: string;
}

export interface Sector {
  slug: SectorSlug;
  name: string;
  weight: number;
  description: string;
  subIndicators: SubIndicatorDef[];
}

export const COUNTRIES: Country[] = [
  { code: 'GB', name: 'United Kingdom', flag: '🇬🇧' },
  { code: 'DE', name: 'Germany', flag: '🇩🇪' },
  { code: 'FR', name: 'France', flag: '🇫🇷' },
  { code: 'IE', name: 'Ireland', flag: '🇮🇪' },
  { code: 'ES', name: 'Spain', flag: '🇪🇸' },
];

export const DEFAULT_COUNTRY: CountryCode = 'GB';

export const YEARS: number[] = Array.from({ length: 11 }, (_, i) => 2014 + i);

export const SECTORS: Sector[] = [
  {
    slug: 'healthcare',
    name: 'Healthcare',
    weight: 20,
    description: 'Quality and accessibility of healthcare systems',
    subIndicators: [
      { key: 'lifeExpectancy', name: 'Life Expectancy', unit: 'years' },
      { key: 'hospitalBeds', name: 'Hospital Beds per 1,000', unit: 'beds' },
      { key: 'healthSpendGdp', name: 'Health Spend % GDP', unit: '%' },
    ],
  },
  {
    slug: 'education',
    name: 'Education',
    weight: 15,
    description: 'Educational attainment and system quality',
    subIndicators: [
      { key: 'pisaScore', name: 'PISA Score (avg)', unit: 'points' },
      { key: 'tertiaryEnrolment', name: 'Tertiary Enrolment', unit: '%' },
      { key: 'educationSpendGdp', name: 'Education Spend % GDP', unit: '%' },
    ],
  },
  {
    slug: 'economy',
    name: 'Economy',
    weight: 25,
    description: 'Economic performance, stability and opportunity',
    subIndicators: [
      { key: 'gdpPerCapita', name: 'GDP per Capita', unit: '$k' },
      { key: 'unemployment', name: 'Unemployment Rate', unit: '%' },
      { key: 'gini', name: 'Gini Coefficient', unit: 'index' },
    ],
  },
  {
    slug: 'safety',
    name: 'Safety & Crime',
    weight: 15,
    description: 'Personal safety, crime rates and rule of law',
    subIndicators: [
      { key: 'homicideRate', name: 'Homicide Rate', unit: 'per 100k' },
      { key: 'safetyIndex', name: 'Safety Perception Index', unit: 'score' },
      { key: 'prisonPop', name: 'Prison Population', unit: 'per 100k' },
    ],
  },
  {
    slug: 'environment',
    name: 'Environment',
    weight: 10,
    description: 'Environmental quality, emissions and sustainability',
    subIndicators: [
      { key: 'co2PerCapita', name: 'CO₂ per Capita', unit: 'tonnes' },
      { key: 'renewableShare', name: 'Renewable Energy Share', unit: '%' },
      { key: 'airQuality', name: 'Air Quality Index', unit: 'score' },
    ],
  },
  {
    slug: 'infrastructure',
    name: 'Infrastructure & Transport',
    weight: 15,
    description: 'Transport networks, digital connectivity and public services',
    subIndicators: [
      { key: 'broadbandSpeed', name: 'Avg Broadband Speed', unit: 'Mbps' },
      { key: 'railQuality', name: 'Rail Network Quality', unit: 'score' },
      { key: 'roadQuality', name: 'Road Quality Index', unit: 'score' },
    ],
  },
];

export const DEFAULT_WEIGHTINGS: Record<SectorSlug, number> = {
  healthcare: 20,
  education: 15,
  economy: 25,
  safety: 15,
  environment: 10,
  infrastructure: 15,
};

export const COUNTRY_COLORS: Record<CountryCode, string> = {
  GB: '#3b82f6',
  DE: '#f59e0b',
  FR: '#8b5cf6',
  IE: '#10b981',
  ES: '#ef4444',
};
