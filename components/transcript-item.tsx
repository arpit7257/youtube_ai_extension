import { useCopyToClipboard } from "@/libs/hooks/use-copy-to-clipboard";
import { CheckIcon, ClipboardCopyIcon, ClockIcon } from "@radix-ui/react-icons";
import { memo } from "react";

type Transcript = {
  text: string;
  startTime: number;
  endTime: number;
};

interface TranscriptItemProps {
  item: Transcript;
  searchInput: string;
}

function TranscriptItem({ item, searchInput }: TranscriptItemProps) {
  const player = document.querySelector("video");

  const { isCopied, copyToClipboard } = useCopyToClipboard({ timeout: 2000 });

  function JumpToTime() {
    player.currentTime = item.startTime / 1000;
  }

  function CopySection() {
    if (isCopied) return;
    copyToClipboard(item.text);
  }

  const highlightText = (text: string, search: string): JSX.Element => {
    if (!search) return <>{text}</>;
    const parts = text.split(new RegExp(`(${search})`, "gi"));
    return (
      <>
        {parts.map((part, index) =>
          part.toLowerCase() === search.toLowerCase() ? (
            <mark key={index} className="bg-yellow-300">
              {part}
            </mark>
          ) : (
            part
          )
        )}
      </>
    );
  };

  const startTime = new Date(item.startTime).toISOString().substr(14, 5);
  const endTime = new Date(item.endTime).toISOString().substr(14, 5);

  return (
    <div
      data-start-time={item.startTime}
      data-end-time={item.endTime}
      className="flex flex-col w-full justify-between items-center p-3 border-[0.5px] rounded-md border-zinc-200 space-y-4 group"
    >
      <div className="w-full flex flex-row items-center justify-between">
        {/* Jump to Time Button */}
        <button
          onClick={JumpToTime}
          className="flex items-center space-x-2 border-[0.5px] rounded-md px-2 py-1 text-xs text-blue-500 hover:underline focus:outline-none"
        >
          <ClockIcon className="h-4 w-4 opacity-60" />
          <span>
            {startTime} - {endTime}
          </span>
        </button>

        {/* Copy Section Button with Tooltip */}
        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 relative">
          <button
            onClick={CopySection}
            className="flex items-center justify-center w-6 h-6 border-[0.5px] rounded-md p-1 focus:outline-none"
          >
            {isCopied ? (
              <CheckIcon className="h-4 w-4 text-green-500" />
            ) : (
              <ClipboardCopyIcon className="h-4 w-4 opacity-60" />
            )}
          </button>
          {/* Tooltip */}
          <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-xs bg-gray-800 text-white rounded-md px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            Copy Section
          </div>
        </div>
      </div>

      {/* Transcript Text with Highlighting */}
      <p className="text-[10.5px] capitalize leading-7">
        {highlightText(item.text, searchInput)}
      </p>
    </div>
  );
}

export default memo(TranscriptItem);
