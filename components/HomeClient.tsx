'use client';
import { useCountry } from '@/context/CountryContext';
import { getHouseIndexChartData, getLatestSectorScores } from '@/lib/calculations';
import { COUNTRIES, SECTORS, DEFAULT_WEIGHTINGS, CountryCode } from '@/lib/config';
import { CountryLineChart } from './CountryLineChart';
import Link from 'next/link';
import { useMemo } from 'react';

export function HomeClient() {
  const { selectedCountry, setSelectedCountry } = useCountry();

  const chartData = useMemo(
    () => getHouseIndexChartData(DEFAULT_WEIGHTINGS),
    []
  );

  const latestScores = useMemo(
    () => getLatestSectorScores(selectedCountry),
    [selectedCountry]
  );

  const selectedCountryName = COUNTRIES.find(c => c.code === selectedCountry)?.name ?? '';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Chart area */}
      <div className="relative">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">House Index</h1>
            <p className="text-sm text-gray-500 mt-0.5">
              Composite country performance score, 2014–2024
            </p>
          </div>
          {/* Country selector */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">Your country:</span>
            <select
              value={selectedCountry}
              onChange={e => setSelectedCountry(e.target.value as CountryCode)}
              className="text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent cursor-pointer"
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
                className="inline-block w-6 h-0.5 rounded"
                style={{
                  backgroundColor: c.code === selectedCountry ? '#000' : '#d1d5db',
                  height: c.code === selectedCountry ? '2.5px' : '1px',
                }}
              />
              <span className={c.code === selectedCountry ? 'font-semibold text-gray-900' : ''}>
                {c.flag} {c.name}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Sector cards */}
      <div className="mt-10">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
          {selectedCountryName} — Sector Breakdown (2024)
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {SECTORS.map(sector => (
            <Link
              key={sector.slug}
              href={`/sector/${sector.slug}`}
              className="group block border border-gray-200 rounded-xl p-4 hover:shadow-md hover:border-gray-300 transition-all bg-white"
            >
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                {sector.name}
              </p>
              <p className="text-2xl font-bold text-gray-900 mt-2">
                {latestScores[sector.slug].toFixed(0)}
              </p>
              <div className="flex items-center justify-between mt-2">
                <div className="h-1.5 flex-1 bg-gray-100 rounded-full overflow-hidden mr-2">
                  <div
                    className="h-full bg-gray-900 rounded-full"
                    style={{ width: `${latestScores[sector.slug]}%` }}
                  />
                </div>
                <span className="text-xs text-gray-400">{sector.weight}%</span>
              </div>
              <p className="text-xs text-gray-400 mt-2">
                Weight: {sector.weight}%
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
