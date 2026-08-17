export default function Loading() {
  return (
    <main className="max-w-2xl mx-auto px-6 py-12">
      <div className="flex items-center justify-between mb-8">
        <div className="h-9 w-48 bg-black/5 rounded-md animate-pulse" />
        <div className="h-9 w-20 bg-black/5 rounded-md animate-pulse" />
      </div>
      <ul className="space-y-2">
        {[1, 2, 3].map((i) => (
          <li
            key={i}
            className="h-14 bg-surface border-l-4 border-l-black/5 rounded-r-md animate-pulse"
          />
        ))}
      </ul>
    </main>
  );
}
