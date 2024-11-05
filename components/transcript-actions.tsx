import { useExtension } from "@/contexts/extension-context";
import { useTranscript } from "@/contexts/transcript-context";
import { useCopyToClipboard } from "@/libs/hooks/use-copy-to-clipboard";
import { cleanTextTranscript } from "@/utils/functions";
import {
  CheckIcon,
  ClipboardCopyIcon,
  Crosshair1Icon,
  MagnifyingGlassIcon,
} from "@radix-ui/react-icons";
import { useEnterSubmit } from "@/libs/hooks/use-enter-submit"; // Import the useEnterSubmit hook
import { useRef } from "react";

interface TranscriptActionsProps {
  jumpCurrentTime: () => void;
}

export default function TranscriptActions({ jumpCurrentTime }: TranscriptActionsProps) {
  const { transcriptSearch, setTranscriptSearch, transcriptJson } = useTranscript();
  const { isCopied, copyToClipboard } = useCopyToClipboard({ timeout: 2000 });
  const { extensionLoading, extensionData } = useExtension();

  const { formRef, onKeyDown, onKeyUp } = useEnterSubmit(); // Use the hook

  function CopyTranscript() {
    if (isCopied || !extensionData.transcript) return;
    const processed = cleanTextTranscript(extensionData.transcript);
    copyToClipboard(processed);
  }

  return (
    <div className="flex flex-row w-full justify-between items-center sticky top-0 z-10 bg-white pt-3.5 pb-3 px-3 space-x-4 dark:bg-[#0f0f0f]">
      {/* Search Form with Textarea */}
      <form
        ref={formRef}
        onSubmit={(e) => e.preventDefault()} // Prevent form submission
        className="relative w-full"
      >
        <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 opacity-60" />
        <textarea
          placeholder="Search Transcript"
          className="w-full pl-8 pr-2 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 dark:bg-gray-800 dark:border-gray-600"
          onChange={(e) => {
            e.preventDefault();
            setTranscriptSearch(e.currentTarget.value);
          }}
          onKeyDown={onKeyDown} // Add onKeyDown
          onKeyUp={onKeyUp} // Add onKeyUp
          disabled={extensionLoading || transcriptJson.length === 0}
          rows={1} // Set the initial height of the textarea
          style={{ resize: 'none' }} // Disable resizing if desired
        />
      </form>

      {/* Action Buttons with Tooltip */}
      <div className="flex flex-row space-x-2">
        {/* Jump to Current Time Button */}
        <div className="relative group">
          <button
            onClick={jumpCurrentTime}
            disabled={extensionLoading || transcriptJson.length === 0}
            className="flex items-center justify-center w-8 h-8 border border-gray-300 rounded-md hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-700 disabled:opacity-50 focus:outline-none"
          >
            <Crosshair1Icon className="h-4 w-4 opacity-60" />
          </button>
          <div className="absolute bottom-full mb-1 hidden group-hover:block text-xs bg-gray-800 text-white rounded-md px-2 py-1">
            Jump to Current Time
          </div>
        </div>

        {/* Copy Transcript Button */}
        <div className="relative group">
          <button
            onClick={CopyTranscript}
            disabled={extensionLoading || transcriptJson.length === 0}
            className="flex items-center justify-center w-8 h-8 border border-gray-300 rounded-md hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-700 disabled:opacity-50 focus:outline-none"
          >
            {isCopied ? (
              <CheckIcon className="h-4 w-4 text-green-500" />
            ) : (
              <ClipboardCopyIcon className="h-4 w-4 opacity-60" />
            )}
          </button>
          <div className="absolute bottom-full mb-1 hidden group-hover:block text-xs bg-gray-800 text-white rounded-md px-2 py-1">
            Copy Transcript
          </div>
        </div>
      </div>
    </div>
  );
}
