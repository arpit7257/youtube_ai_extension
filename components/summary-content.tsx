import { useSummary } from "contexts/summary-context"
import Markdown from "./markdown"
import SummarySkeleton from "./summary-skeleton"

export default function SummaryContent() {
  const { summaryIsGenerating, summaryContent, generateSummary } = useSummary()

  if (!summaryContent && summaryIsGenerating) {
    return (
      <div className="flex justify-center items-center w-full p-3 bg-white dark:bg-[#0f0f0f]">
        <SummarySkeleton />
      </div>
    )
  }

  if (!summaryContent && !summaryIsGenerating) {
    return (
      <div className="flex justify-center items-center w-full p-3 bg-white dark:bg-[#0f0f0f]">
        <button
          className="w-full h-12 border border-gray-300 rounded-md text-sm flex justify-center items-center hover:bg-gray-100 dark:hover:bg-gray-800"
          onClick={generateSummary}
        >
          <span className="text-sm">Generate Summary</span>
        </button>
      </div>
    )
  }

  return (
    <div className="flex justify-center items-center w-full p-3 bg-white dark:bg-[#b89292]">
      <div className="h-[600px] w-full px-3 opacity-80">
        <Markdown markdown={summaryContent} className="pb-6" />
        
      </div>
    </div>
  )
}
