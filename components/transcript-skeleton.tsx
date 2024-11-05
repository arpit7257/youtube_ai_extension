export default function TranscriptSkeleton() {
  return (
    <div className="space-y-4 w-full">
      {Array.from({ length: 16 }).map((_, index) => (
        <div
          key={index}
          className="flex flex-col w-full justify-between items-center p-3 border-[0.5px] rounded-md border-zinc-200 space-y-4 animate-pulse"
        >
          <div className="w-full flex flex-row items-center justify-between">
            <div className="h-8 w-32 bg-zinc-200 rounded-md" />
          </div>
          <div className="h-36 w-full bg-zinc-200 rounded-md" />
        </div>
      ))}
    </div>
  );
}
