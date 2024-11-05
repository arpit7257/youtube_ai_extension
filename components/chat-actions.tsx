import { useChat } from "@/contexts/chat-context"
import { useExtension } from "@/contexts/extension-context"
import { models, type Model } from "@/libs/constants"
import { cn } from "@/libs/utils"
import { PlusIcon } from "@radix-ui/react-icons"
import { useState } from "react"

interface ChatActionProps {
  className?: string
}

export default function ChatAction({ className }: ChatActionProps) {
  const {
    chatModel,
    chatIsGenerating,
    setChatMessages,
    setChatIsGenerating,
    setChatIsError,
    setChatModel
  } = useChat()

  const { extensionLoading } = useExtension()
  const [showTooltip, setShowTooltip] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  function resetChat() {
    setChatMessages([])
    setChatIsGenerating(false)
    setChatIsError(false)
  }

  return (
    <div
      className={cn(
        "flex flex-row w-full justify-between items-center sticky top-0 z-20 bg-white pt-3.5 pb-2 px-3",
        className
      )}
    >
      <div className="relative">
        <button
          className="flex items-center w-fit space-x-3 px-3 py-2 border border-gray-300 rounded-md bg-white text-gray-700"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        >
          <span>{chatModel.label || "Model"}</span>
        </button>
        {isDropdownOpen && (
          <div className="absolute mt-2 w-full bg-white border border-gray-300 rounded-md shadow-lg">
            {models.map((model: Model) => (
              <button
                key={model.value}
                className="w-full px-3 py-2 text-left hover:bg-gray-100 flex items-center"
                onClick={() => {
                  setChatModel(model)
                  setIsDropdownOpen(false)
                }}
              >
                <span className="mr-2">{model.icon}</span>
                {model.label}
              </button>
            ))}
          </div>
        )}
      </div>

      <div
        className="relative"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        <button
          className="flex flex-row space-x-2 px-3 py-2 border border-gray-300 rounded-md bg-white text-gray-700 disabled:opacity-50"
          onClick={resetChat}
          disabled={chatIsGenerating || extensionLoading}
        >
          <PlusIcon className="h-4 w-4 opacity-60" />
          <span>New Chat</span>
        </button>
        {showTooltip && (
          <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs rounded py-1 px-2">
            New Chat
          </div>
        )}
      </div>
    </div>
  )
}
