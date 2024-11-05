import { useSummary } from "contexts/summary-context"
import { models, prompts, type Model, type Prompt } from "libs/constants"
import { useCopyToClipboard } from "libs/hooks/use-copy-to-clipboard"
import { CheckIcon, ClipboardCopyIcon, ReloadIcon } from "@radix-ui/react-icons"

export default function SummaryActions() {
  const {
    summaryPrompt,
    summaryIsGenerating,
    summaryModel,
    summaryContent,
    setSummaryPrompt,
    setSummaryModel,
    generateSummary
  } = useSummary()

  const { isCopied, copyToClipboard } = useCopyToClipboard({
    timeout: 2000
  })

  function CopySummary() {
    if (isCopied || !summaryContent || summaryIsGenerating) return
    copyToClipboard(summaryContent)
  }

  return (
    <div className="flex flex-row w-full justify-between items-center sticky top-0 z-20 bg-white pt-3.5 pb-2 px-3">
      {/* Select for models */}
      <div className="relative inline-block">
        <select
          value={summaryModel.value}
          onChange={(e) =>
            setSummaryModel(models.find((model) => model.value === e.target.value))
          }
          className="border border-gray-300 rounded-md px-2 py-1 focus:ring-2 focus:ring-blue-500 focus:outline-none"
        >
          {models.map((model: Model) => (
            <option key={model.value} value={model.value}>
              {model.label}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-row space-x-2">
        {/* Regenerate Summary Button */}
        <button
          onClick={generateSummary}
          disabled={summaryIsGenerating}
          className={`border border-gray-300 rounded-md p-2 ${
            summaryIsGenerating ? "opacity-50 cursor-not-allowed" : ""
          }`}
          title="Regenerate Summary"
        >
          <ReloadIcon className="h-4 w-4 opacity-60" />
        </button>

        {/* Copy Summary Button */}
        <button
          onClick={CopySummary}
          disabled={summaryIsGenerating}
          className={`border border-gray-300 rounded-md p-2 ${
            summaryIsGenerating ? "opacity-50 cursor-not-allowed" : ""
          }`}
          title="Copy Summary"
        >
          {isCopied ? (
            <CheckIcon className="h-4.5 w-4.5 opacity-60" />
          ) : (
            <ClipboardCopyIcon className="h-4.5 w-4.5 opacity-60" />
          )}
        </button>

        {/* Select for prompts */}
        <div className="relative inline-block">
          <select
            value={summaryPrompt.value}
            onChange={(e) =>
              setSummaryPrompt(prompts.find((prompt) => prompt.value === e.target.value))
            }
            className="border border-gray-300 rounded-md px-2 py-1 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          >
            {prompts.map((prompt: Prompt) => (
              <option key={prompt.value} value={prompt.value}>
                {prompt.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  )
}
