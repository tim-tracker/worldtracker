import { CountryCode, SectorSlug } from './config';

export type YearlyScores = Record<CountryCode, number[]>;

export interface SectorDataEntry {
  yearlyScores: YearlyScores;
  subIndicators: Record<string, Record<CountryCode, number>>;
}

export const SECTOR_DATA: Record<SectorSlug, SectorDataEntry> = {
  healthcare: {
    yearlyScores: {
      GB: [73, 72, 71, 70, 69, 68, 64, 65, 66, 65, 64],
      DE: [83, 83, 82, 83, 82, 83, 78, 80, 81, 82, 82],
      FR: [81, 81, 80, 80, 80, 81, 76, 78, 79, 79, 79],
      IE: [75, 75, 74, 74, 73, 73, 70, 71, 72, 73, 73],
      ES: [78, 78, 77, 77, 77, 77, 72, 74, 75, 76, 76],
    },
    subIndicators: {
      lifeExpectancy: { GB: 81.3, DE: 81.1, FR: 82.3, IE: 82.6, ES: 83.4 },
      hospitalBeds: { GB: 2.5, DE: 8.0, FR: 5.9, IE: 2.9, ES: 3.0 },
      healthSpendGdp: { GB: 11.9, DE: 12.8, FR: 11.9, IE: 6.3, ES: 9.0 },
    },
  },
  education: {
    yearlyScores: {
      GB: [74, 74, 73, 73, 73, 72, 70, 71, 72, 72, 72],
      DE: [77, 78, 78, 78, 79, 79, 76, 77, 78, 78, 78],
      FR: [74, 74, 74, 74, 74, 74, 72, 73, 74, 74, 74],
      IE: [79, 79, 80, 80, 80, 81, 78, 79, 80, 81, 81],
      ES: [66, 67, 67, 68, 68, 69, 67, 68, 69, 70, 70],
    },
    subIndicators: {
      pisaScore: { GB: 503, DE: 475, FR: 490, IE: 516, ES: 473 },
      tertiaryEnrolment: { GB: 60, DE: 68, FR: 65, IE: 74, ES: 52 },
      educationSpendGdp: { GB: 5.1, DE: 5.0, FR: 5.5, IE: 3.1, ES: 4.3 },
    },
  },
  economy: {
    yearlyScores: {
      GB: [73, 74, 71, 70, 69, 68, 60, 64, 65, 63, 64],
      DE: [81, 81, 82, 83, 82, 80, 72, 77, 74, 71, 72],
      FR: [70, 70, 71, 72, 73, 73, 64, 69, 70, 70, 70],
      IE: [72, 76, 80, 82, 83, 84, 80, 83, 85, 85, 84],
      ES: [58, 62, 64, 66, 68, 69, 58, 63, 66, 68, 69],
    },
    subIndicators: {
      gdpPerCapita: { GB: 46, DE: 54, FR: 44, IE: 102, ES: 33 },
      unemployment: { GB: 4.2, DE: 3.0, FR: 7.3, IE: 4.3, ES: 11.5 },
      gini: { GB: 35, DE: 31, FR: 29, IE: 30, ES: 33 },
    },
  },
  safety: {
    yearlyScores: {
      GB: [76, 75, 74, 72, 71, 71, 72, 72, 71, 70, 70],
      DE: [83, 82, 81, 82, 82, 82, 83, 83, 82, 82, 82],
      FR: [73, 72, 71, 71, 71, 71, 72, 72, 71, 71, 71],
      IE: [84, 84, 84, 83, 83, 83, 84, 84, 83, 83, 82],
      ES: [80, 80, 80, 80, 80, 80, 81, 81, 80, 80, 80],
    },
    subIndicators: {
      homicideRate: { GB: 1.1, DE: 0.9, FR: 1.3, IE: 1.0, ES: 0.6 },
      safetyIndex: { GB: 68, DE: 77, FR: 64, IE: 81, ES: 74 },
      prisonPop: { GB: 142, DE: 77, FR: 98, IE: 85, ES: 123 },
    },
  },
  environment: {
    yearlyScores: {
      GB: [63, 65, 66, 67, 68, 70, 72, 72, 71, 73, 74],
      DE: [68, 69, 70, 70, 71, 72, 73, 73, 70, 72, 73],
      FR: [73, 73, 74, 74, 74, 75, 76, 75, 74, 75, 76],
      IE: [64, 65, 66, 67, 68, 69, 70, 71, 71, 72, 73],
      ES: [67, 68, 68, 69, 70, 71, 72, 73, 72, 74, 75],
    },
    subIndicators: {
      co2PerCapita: { GB: 5.1, DE: 8.1, FR: 4.5, IE: 8.4, ES: 5.7 },
      renewableShare: { GB: 43, DE: 62, FR: 27, IE: 45, ES: 57 },
      airQuality: { GB: 72, DE: 71, FR: 75, IE: 78, ES: 73 },
    },
  },
  infrastructure: {
    yearlyScores: {
      GB: [71, 71, 70, 70, 70, 69, 70, 70, 69, 68, 68],
      DE: [81, 81, 80, 80, 79, 78, 78, 77, 77, 76, 76],
      FR: [83, 83, 82, 82, 82, 82, 82, 81, 81, 81, 81],
      IE: [63, 64, 65, 66, 67, 67, 68, 68, 68, 69, 70],
      ES: [77, 78, 78, 78, 79, 79, 79, 80, 80, 80, 81],
    },
    subIndicators: {
      broadbandSpeed: { GB: 124, DE: 93, FR: 145, IE: 139, ES: 147 },
      railQuality: { GB: 64, DE: 67, FR: 83, IE: 58, ES: 78 },
      roadQuality: { GB: 72, DE: 79, FR: 80, IE: 74, ES: 82 },
    },
  },
};
