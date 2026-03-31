'use client';
import { useState, useMemo } from 'react';
import { useCountry } from '@/context/CountryContext';
import { getHouseIndexChartData } from '@/lib/calculations';
import { COUNTRIES, SECTORS, DEFAULT_WEIGHTINGS, SectorSlug, CountryCode } from '@/lib/config';
import { CountryLineChart } from './CountryLineChart';

export function CustomIndexClient() {
  const { selectedCountry, setSelectedCountry } = useCountry();
  const [weightings, setWeightings] = useState<Record<SectorSlug, number>>({ ...DEFAULT_WEIGHTINGS });

  const total = Object.values(weightings).reduce((a, b) => a + b, 0);
  const isValid = total === 100;

  const chartData = useMemo(
    () => getHouseIndexChartData(weightings),
    [weightings]
  );

  const handleSliderChange = (slug: SectorSlug, value: number) => {
    setWeightings(prev => ({ ...prev, [slug]: value }));
  };

  const handleReset = () => {
    setWeightings({ ...DEFAULT_WEIGHTINGS });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-start justify-between mb-2">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Custom Index</h1>
          <p className="text-sm text-gray-500 mt-0.5">
            Adjust sector weightings to build your own House Index
          </p>
        </div>
        <div className="flex items-center gap-3">
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
      </div>

      {/* Sliders */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 mb-6">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-sm font-semibold text-gray-700">Sector Weightings</h2>
          <div className="flex items-center gap-4">
            <div className={`flex items-center gap-1.5 text-sm font-medium ${
              isValid ? 'text-emerald-600' : total > 100 ? 'text-red-600' : 'text-amber-600'
            }`}>
              <span>Total: {total}%</span>
              {!isValid && (
                <span className="text-xs">
                  ({total > 100 ? `+${total - 100}` : `\u2212${100 - total}`} from 100%)
                </span>
              )}
            </div>
            <button
              onClick={handleReset}
              className="text-sm text-gray-500 hover:text-gray-900 border border-gray-200 rounded-lg px-3 py-1.5 transition-colors hover:border-gray-300"
            >
              Reset to defaults
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {SECTORS.map(sector => (
            <div key={sector.slug}>
              <div className="flex justify-between items-baseline mb-2">
                <label className="text-sm font-medium text-gray-700">
                  {sector.name}
                </label>
                <span className="text-sm font-bold text-gray-900 tabular-nums w-10 text-right">
                  {weightings[sector.slug]}%
                </span>
              </div>
              <input
                type="range"
                min={0}
                max={60}
                value={weightings[sector.slug]}
                onChange={e => handleSliderChange(sector.slug, Number(e.target.value))}
                className="w-full h-1.5 bg-gray-200 rounded-full appearance-none cursor-pointer accent-gray-900"
              />
              <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>0%</span>
                <span>Default: {DEFAULT_WEIGHTINGS[sector.slug]}%</span>
                <span>60%</span>
              </div>
            </div>
          ))}
        </div>

        {!isValid && (
          <div className={`mt-4 text-sm p-3 rounded-lg ${
            total > 100
              ? 'bg-red-50 text-red-700 border border-red-200'
              : 'bg-amber-50 text-amber-700 border border-amber-200'
          }`}>
            {total > 100
              ? `Weightings exceed 100% by ${total - 100}%. The chart still updates proportionally.`
              : `Weightings are ${100 - total}% below 100%. The chart still updates proportionally.`}
          </div>
        )}
      </div>

      {/* Chart */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-semibold text-gray-700">
          House Index with Custom Weightings
        </h2>
      </div>
      <div className="w-full" style={{ height: '60vh' }}>
        <CountryLineChart data={chartData} selectedCountry={selectedCountry} />
      </div>
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
    </div>
  );
}
