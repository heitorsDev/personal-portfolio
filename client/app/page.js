import { Suspense } from 'react';
import HomeContent from './HomeContent';

export const dynamic = 'force-dynamic';

export default function Home() {
  return (
    <Suspense fallback={<main><p>Loading...</p></main>}>
      <HomeContent />
    </Suspense>
  );
}
