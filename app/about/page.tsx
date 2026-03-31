import { SECTORS } from '@/lib/config';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About — WorldTracker',
};

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-4">About WorldTracker</h1>
      <p className="text-gray-600 leading-relaxed mb-8">
        WorldTracker is an interactive country comparison platform that answers the question:
        <em> &ldquo;How has my country been doing vs others — and why?&rdquo;</em> We do this through
        the <strong>House Index</strong>, a composite score that weights performance across
        six key sectors of national life.
      </p>

      <h2 className="text-xl font-bold text-gray-900 mb-4">The House Index</h2>
      <p className="text-gray-600 leading-relaxed mb-6">
        The House Index is a weighted average of six sector scores, each normalised to a
        0–100 scale. A higher score is better. The default weightings reflect a balanced
        view of what makes a country a good place to live, with the economy given the
        highest weight due to its broad influence on other outcomes.
      </p>

      <div className="space-y-3 mb-10">
        {SECTORS.map(sector => (
          <div
            key={sector.slug}
            className="flex items-center justify-between border border-gray-200 rounded-xl p-4"
          >
            <div>
              <p className="font-medium text-gray-900">{sector.name}</p>
              <p className="text-sm text-gray-500">{sector.description}</p>
            </div>
            <div className="text-right ml-4 shrink-0">
              <span className="text-lg font-bold text-gray-900">{sector.weight}%</span>
              <p className="text-xs text-gray-400">weighting</p>
            </div>
          </div>
        ))}
      </div>

      <h2 className="text-xl font-bold text-gray-900 mb-4">Data</h2>
      <p className="text-gray-600 leading-relaxed mb-4">
        Phase 1 data is illustrative and based on publicly available indicators from sources
        including the OECD, World Bank, Eurostat, and national statistics agencies. All sector
        scores are normalised to the 0–100 range to enable fair cross-country comparison.
      </p>
      <p className="text-gray-600 leading-relaxed mb-8">
        Countries covered in Phase 1: United Kingdom, Germany, France, Ireland, and Spain.
        Data spans 2014–2024.
      </p>

      <h2 className="text-xl font-bold text-gray-900 mb-4">Custom Index</h2>
      <p className="text-gray-600 leading-relaxed">
        Not happy with the default weightings? Use the{' '}
        <a href="/custom" className="underline text-gray-900 hover:text-gray-600">
          Custom Index
        </a>{' '}
        page to set your own weights for each sector. The chart recalculates live, so you
        can see immediately how prioritising different areas changes the rankings.
      </p>
    </div>
  );
}
