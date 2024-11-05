export default function SummarySkeleton() {
    return (
      <div className="h-[600px] w-full px-3">
        <div className="w-full rounded-md space-y-4">
          <div className="flex flex-col space-y-5">
            {Array.from({ length: 16 }).map((_, index) => (
              <div
                key={index}
                className="h-4 w-full bg-gray-200 rounded-md animate-pulse"
              />
            ))}
          </div>
        </div>
      </div>
    )
  }
  