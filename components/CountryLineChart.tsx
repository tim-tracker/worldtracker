'use client';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, TooltipProps
} from 'recharts';
import { COUNTRIES, CountryCode } from '@/lib/config';

interface Props {
  data: Array<{ year: number; [key: string]: number }>;
  selectedCountry: CountryCode;
}

function CustomTooltip({ active, payload, label }: TooltipProps<number, string>) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-3 text-sm">
      <p className="font-semibold text-gray-700 mb-1.5">{label}</p>
      {payload
        .slice()
        .sort((a, b) => (b.value ?? 0) - (a.value ?? 0))
        .map(entry => (
          <div key={entry.name} className="flex items-center gap-2 py-0.5">
            <div
              className="w-3 h-0.5 rounded"
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-gray-600">{entry.name}</span>
            <span className="font-medium text-gray-900 ml-auto pl-4">
              {typeof entry.value === 'number' ? entry.value.toFixed(1) : entry.value}
            </span>
          </div>
        ))}
    </div>
  );
}

export function CountryLineChart({ data, selectedCountry }: Props) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data} margin={{ top: 8, right: 8, bottom: 8, left: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" vertical={false} />
        <XAxis
          dataKey="year"
          tick={{ fontSize: 12, fill: '#9ca3af' }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          domain={[40, 100]}
          tick={{ fontSize: 12, fill: '#9ca3af' }}
          axisLine={false}
          tickLine={false}
          width={32}
        />
        <Tooltip content={<CustomTooltip />} />
        {COUNTRIES.map(country => (
          <Line
            key={country.code}
            type="monotone"
            dataKey={country.code}
            name={country.name}
            stroke={
              country.code === selectedCountry
                ? '#000000'
                : '#d1d5db'
            }
            strokeWidth={country.code === selectedCountry ? 2.5 : 1}
            dot={false}
            activeDot={
              country.code === selectedCountry
                ? { r: 4, fill: '#000', strokeWidth: 0 }
                : { r: 3, fill: '#d1d5db', strokeWidth: 0 }
            }
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
}
