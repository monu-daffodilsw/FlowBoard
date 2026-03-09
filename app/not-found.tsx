import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#0a0f1e] px-4">
      <div className="text-center">
        <div className="flex items-center justify-center gap-3 mb-6">
          {['4', '0', '4'].map((char, i) => (
            <span
              key={i}
              className="text-8xl font-bold text-white/10"
              style={{
                fontFamily: 'Space Mono, monospace',
                animation: `pulse ${1 + i * 0.2}s ease-in-out infinite alternate`,
                color: i === 1 ? '#6366f1' : undefined,
              }}
            >
              {char}
            </span>
          ))}
        </div>
        <h1 className="text-2xl font-bold text-white mb-2" style={{ fontFamily: 'Space Mono, monospace' }}>
          Page Not Found
        </h1>
        <p className="text-white/50 mb-8">The page you're looking for doesn't exist or has been moved.</p>
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-500 hover:bg-indigo-400 text-white rounded-xl font-medium transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          Go to Dashboard
        </Link>
      </div>
      <style>{`
        @keyframes pulse {
          from { opacity: 0.3; transform: scale(0.97); }
          to { opacity: 1; transform: scale(1.03); }
        }
      `}</style>
    </div>
  );
}
