
import Page from './components/Page';
import { Suspense } from 'react';

export default function Home() {
  return (
    <main className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">Product Search</h1>
        
        <Suspense fallback={<div className="text-center py-8">Loading products...</div>}>
          <Page />
        </Suspense>
      </div>
    </main>
  );
}