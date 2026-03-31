import { COUNTRIES, CountryCode, SECTORS, SectorSlug, YEARS } from './config';
import { SECTOR_DATA } from './data';

export function calculateHouseIndex(
  sectorScores: Record<SectorSlug, number>,
  weightings: Record<SectorSlug, number>
): number {
  const totalWeight = Object.values(weightings).reduce((a, b) => a + b, 0);
  if (totalWeight === 0) return 0;
  return SECTORS.reduce((sum, sector) => {
    return sum + (sectorScores[sector.slug] * weightings[sector.slug]) / totalWeight;
  }, 0);
}

export interface ChartDataPoint {
  year: number;
  [countryCode: string]: number;
}

export function getHouseIndexChartData(
  weightings: Record<SectorSlug, number>
): ChartDataPoint[] {
  return YEARS.map((year, i) => {
    const point: ChartDataPoint = { year };
    for (const country of COUNTRIES) {
      const sectorScores = Object.fromEntries(
        SECTORS.map(s => [s.slug, SECTOR_DATA[s.slug].yearlyScores[country.code][i]])
      ) as Record<SectorSlug, number>;
      point[country.code] = parseFloat(calculateHouseIndex(sectorScores, weightings).toFixed(1));
    }
    return point;
  });
}

export function getSectorChartData(slug: SectorSlug): ChartDataPoint[] {
  return YEARS.map((year, i) => {
    const point: ChartDataPoint = { year };
    for (const country of COUNTRIES) {
      point[country.code] = SECTOR_DATA[slug].yearlyScores[country.code][i];
    }
    return point;
  });
}

export function getLatestSectorScores(country: CountryCode): Record<SectorSlug, number> {
  return Object.fromEntries(
    SECTORS.map(s => [s.slug, SECTOR_DATA[s.slug].yearlyScores[country][10]])
  ) as Record<SectorSlug, number>;
}
