import { cn } from "@/libs/utils"
import { ArrowRightIcon } from "@radix-ui/react-icons" // Using Radix UI icons, but you can switch to a different library if needed.

interface EmptyScreenProps {
  className?: string
  setPromptInput: (value: any) => void
}

const exampleMessages = [
  {
    heading: "What is the video about?",
    message: "Can you tell me about the video?"
  },
  {
    heading: "What are the key points?",
    message: "What are the key points of the video?"
  },
  {
    heading: "What are the main takeaways?",
    message: "What are the main takeaways of the video?"
  },
  {
    heading: "What are the main topics?",
    message: "What are the main topics discussed in the video?"
  }
]

export default function EmptyScreen({
  className,
  setPromptInput
}: EmptyScreenProps) {
  return (
    <div className={cn("mx-auto px-8", className)}>
      <div className="rounded-md bg-background p-8 w-full flex flex-col items-center -mt-10">
        <span className="text-2xl flex items-center mb-8">
          Youtube
          <span className="ml-1 w-4 h-4 sm:w-5 sm:h-5 text-yellow-400">✨</span> {/* Replacing IconSparkles with an emoji */}
          AI
        </span>
        <p className="text-center text-muted-foreground leading-normal mb-4 opacity-70">
          A conversational AI extension for Youtube videos that allows users to
          interact directly with content. Ask specific questions or seek
          detailed information about any part of the video.
        </p>

        <p className="leading-normal text-muted-foreground mb-8 opacity-70">
          Try an example:
        </p>

        <div className="flex flex-col items-start space-y-3 w-full">
          {exampleMessages.map((message, index) => (
            <button
              key={index}
              onClick={() => setPromptInput(message.message)}
              className="flex items-center w-full px-4 py-3 text-left border border-gray-300 rounded-md hover:bg-gray-100 transition-opacity opacity-80"
            >
              <ArrowRightIcon className="mr-2 text-gray-500" />
              {message.heading}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
