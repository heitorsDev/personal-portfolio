import { Suspense } from 'react';
import ManageProjectContent from './ManageProjectContent';

export const dynamic = 'force-dynamic';

export default function ManageProject() {
  return (
    <Suspense fallback={<main><p>Loading...</p></main>}>
      <ManageProjectContent />
    </Suspense>
  );
}

