import { CustomIndexClient } from '@/components/CustomIndexClient';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Custom Index — WorldTracker',
};

export default function CustomPage() {
  return <CustomIndexClient />;
}
