import { useExtension } from "contexts/extension-context";
import { useCopyToClipboard } from "libs/hooks/use-copy-to-clipboard";
import {
  ActivityLogIcon,
  CardStackPlusIcon,
  CaretSortIcon,
  ChatBubbleIcon,
  CheckIcon,
  Link2Icon,
  Pencil2Icon
} from "@radix-ui/react-icons";

export default function ExtensionActions() {
  const { setExtensionPanel, extensionIsOpen, setExtensionIsOpen } = useExtension();
  const { isCopied, copyToClipboard } = useCopyToClipboard({ timeout: 2000 });

  function CopyVideoURL() {
    if (isCopied) return;
    copyToClipboard(window.location.href);
  }

  return (
    <div className="border border-zinc-200 rounded-md flex items-center justify-between p-2.5 px-3 dark:bg-[#0f0f0f] dark:text-white dark:border-zinc-800">
      <CardStackPlusIcon className="h-6 w-6 opacity-50 ml-2" />
      <div className="flex justify-center items-center space-x-2">
        <div className="flex -space-x-px">
          <button
            onClick={() => {
              setExtensionPanel("Summary");
              if (!extensionIsOpen) setExtensionIsOpen(true);
            }}
            className="rounded-r-none focus:z-10 bg-transparent border border-zinc-300 hover:bg-zinc-100 flex items-center space-x-2 px-4 py-2 text-sm text-gray-700"
          >
            <Pencil2Icon className="h-4 w-4 opacity-60" />
            <span className="opacity-90">Summary</span>
          </button>
          <button
            onClick={() => {
              setExtensionPanel("Transcript");
              if (!extensionIsOpen) setExtensionIsOpen(true);
            }}
            className="rounded-r-none focus:z-10 bg-transparent border border-zinc-300 hover:bg-zinc-100 flex items-center space-x-2 px-4 py-2 text-sm text-gray-700"
          >
            <ActivityLogIcon className="h-4 w-4 opacity-60" />
            <span className="opacity-90">Transcript</span>
          </button>
          <button
            onClick={() => {
              setExtensionPanel("Chat");
              if (!extensionIsOpen) setExtensionIsOpen(true);
            }}
            className="rounded-r-none focus:z-10 bg-transparent border border-zinc-300 hover:bg-zinc-100 flex items-center space-x-2 px-4 py-2 text-sm text-gray-700"
          >
            <ChatBubbleIcon className="h-4 w-4 opacity-60" />
            <span className="opacity-90">Chat</span>
          </button>
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <button
          onClick={CopyVideoURL}
          className="border border-zinc-300 hover:bg-zinc-100 p-2 rounded-full"
          title="Copy Video URL"
        >
          {isCopied ? (
            <CheckIcon className="h-4.5 w-4.5 opacity-60" />
          ) : (
            <Link2Icon className="h-4.5 w-4.5 opacity-60" />
          )}
        </button>

        <button
          className="border border-zinc-300 hover:bg-zinc-100 p-2 rounded-full"
          onClick={() => { /* Trigger collapsible logic here */ }}
        >
          <CaretSortIcon className="h-4.5 w-4.5 opacity-60" />
        </button>
      </div>
    </div>
  );
}
