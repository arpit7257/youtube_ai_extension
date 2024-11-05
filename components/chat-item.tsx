import { type Message } from "@/libs/constants"
import Markdown from "./markdown"

interface ChatItemProps {
  message: Message
}

export default function ChatItem({ message }: ChatItemProps) {
  return (
    <div className="group relative flex items-start px-8 py-5">
      <div
        className="flex h-10 w-10 shrink-0 select-none items-center justify-center rounded-md border border-zinc-200 -mt-1"
      >
        {message.role === "user" ? (
          // User icon (replace IconUser)
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-blue-500"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 12c2.485 0 4.5-2.015 4.5-4.5S14.485 3 12 3 7.5 5.015 7.5 7.5 9.515 12 12 12z" />
            <path d="M21 21a8.5 8.5 0 0 0-17 0" />
          </svg>
        ) : (
          // Assistant icon (replace IconOpenAI)
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-green-500"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 18a8 8 0 1 1 0-16 8 8 0 0 1 0 16z" />
            <path d="M12 6v6l4 2" />
          </svg>
        )}
      </div>
      <div className="ml-4 flex-1 space-y-2 overflow-hidden px-1">
        {message.role === "assistant" && !message.content ? (
          <span>{spinner}</span>
        ) : (
          <Markdown markdown={message.content} />
        )}
      </div>
    </div>
  )
}

export const spinner = (
  <svg
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    viewBox="0 0 24 24"
    strokeLinecap="round"
    strokeLinejoin="round"
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5 animate-spin stroke-zinc-400"
  >
    <path d="M12 3v3m6.366-.366-2.12 2.12M21 12h-3m.366 6.366-2.12-2.12M12 21v-3m-6.366.366 2.12-2.12M3 12h3m-.366-6.366 2.12 2.12"></path>
  </svg>
)
