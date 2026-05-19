export default function Loading() {
  return (
    <div className="min-h-screen bg-slate-50 animate-pulse">
      {/* Navbar skeleton */}
      <div className="h-16 bg-white border-b border-slate-200 flex items-center px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3 w-full max-w-7xl mx-auto">
          <div className="h-10 w-10 rounded-xl bg-slate-200" />
          <div className="h-4 w-20 rounded bg-slate-200" />
          <div className="ml-auto flex gap-2">
            <div className="h-8 w-16 rounded bg-slate-200" />
            <div className="h-8 w-8 rounded bg-slate-200" />
          </div>
        </div>
      </div>
      {/* Content skeleton */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-8">
        <div className="h-48 bg-slate-200 rounded-2xl" />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-24 bg-slate-200 rounded-xl" />
          ))}
        </div>
        <div className="grid sm:grid-cols-2 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-48 bg-slate-200 rounded-2xl" />
          ))}
        </div>
      </div>
    </div>
  );
}
