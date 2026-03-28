import { Suspense } from 'react';
import AuthContent from './AuthContent';

export const dynamic = 'force-dynamic';

export default function Auth() {
  return (
    <Suspense fallback={<main><p>Loading...</p></main>}>
      <AuthContent />
    </Suspense>
  );
}
