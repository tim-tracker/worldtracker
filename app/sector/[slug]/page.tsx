import { notFound } from 'next/navigation';
import { SECTORS } from '@/lib/config';
import { SectorDetailClient } from '@/components/SectorDetailClient';

interface Props {
  params: { slug: string };
}

export function generateStaticParams() {
  return SECTORS.map(s => ({ slug: s.slug }));
}

export function generateMetadata({ params }: Props) {
  const sector = SECTORS.find(s => s.slug === params.slug);
  if (!sector) return {};
  return {
    title: `${sector.name} — WorldTracker`,
    description: sector.description,
  };
}

export default function SectorPage({ params }: Props) {
  const sector = SECTORS.find(s => s.slug === params.slug);
  if (!sector) notFound();
  return <SectorDetailClient sector={sector} />;
}
