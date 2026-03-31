'use client';
import { useCountry } from '@/context/CountryContext';
import { getSectorChartData } from '@/lib/calculations';
import { COUNTRIES, CountryCode, Sector } from '@/lib/config';
import { SECTOR_DATA } from '@/lib/data';
import { CountryLineChart } from './CountryLineChart';
import Link from 'next/link';
import { useMemo } from 'react';

interface Props {
  sector: Sector;
}

export function SectorDetailClient({ sector }: Props) {
  const { selectedCountry, setSelectedCountry } = useCountry();

  const chartData = useMemo(() => getSectorChartData(sector.slug), [sector.slug]);

  const sectorData = SECTOR_DATA[sector.slug];
  const selectedName = COUNTRIES.find(c => c.code === selectedCountry)?.name ?? '';
  const selectedFlag = COUNTRIES.find(c => c.code === selectedCountry)?.flag ?? '';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Back button */}
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-900 transition-colors mb-6"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        Back to House Index
      </Link>

      <div className="flex items-start justify-between mb-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{sector.name}</h1>
          <p className="text-sm text-gray-500 mt-0.5">{sector.description}, 2014–2024</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500">Country:</span>
          <select
            value={selectedCountry}
            onChange={e => setSelectedCountry(e.target.value as CountryCode)}
            className="text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-gray-900 cursor-pointer"
          >
            {COUNTRIES.map(c => (
              <option key={c.code} value={c.code}>
                {c.flag} {c.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Chart */}
      <div className="w-full" style={{ minHeight: '60vh' }}>
        <CountryLineChart data={chartData} selectedCountry={selectedCountry} />
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-4 mt-3 justify-center">
        {COUNTRIES.map(c => (
          <button
            key={c.code}
            onClick={() => setSelectedCountry(c.code)}
            className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-gray-900 transition-colors"
          >
            <span
              className="inline-block rounded"
              style={{
                width: '24px',
                height: c.code === selectedCountry ? '2.5px' : '1px',
                backgroundColor: c.code === selectedCountry ? '#000' : '#d1d5db',
              }}
            />
            <span className={c.code === selectedCountry ? 'font-semibold text-gray-900' : ''}>
              {c.flag} {c.name}
            </span>
          </button>
        ))}
      </div>

      {/* Sub-indicators */}
      <div className="mt-10">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
          {selectedFlag} {selectedName} — Key Indicators (2024)
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {sector.subIndicators.map(indicator => {
            const value = sectorData.subIndicators[indicator.key]?.[selectedCountry];
            return (
              <div
                key={indicator.key}
                className="border border-gray-200 rounded-xl p-5 bg-white"
              >
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                  {indicator.name}
                </p>
                <p className="text-3xl font-bold text-gray-900 mt-2">
                  {value != null ? value.toLocaleString() : '—'}
                </p>
                <p className="text-xs text-gray-400 mt-1">{indicator.unit}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
