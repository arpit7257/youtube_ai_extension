// import { useChat } from "@/contexts/chat-context";
// import { useExtension } from "@/contexts/extension-context";
// import { useEnterSubmit } from "@/libs/hooks/use-enter-submit";
// import { cn } from "@/libs/utils";
// import { PaperPlaneIcon } from "@radix-ui/react-icons";
// import { useEffect, useRef, useState } from "react";
// import Textarea from "react-textarea-autosize";

// interface PromptFormProps {
//   className?: string;
// }

// // Helper function to handle the chat generation
// async function generateChat(
//   model: string,
//   messages: any[],
//   extensionData: any,
//   setChatIsGenerating: (value: boolean) => void,
//   setChatIsError: (value: boolean) => void,
//   handleChatCompletion: (response: any) => void
// ) {
//   console.log("Generating chat with model:", model, "and messages:", messages);

//   setChatIsGenerating(true);
//   setChatIsError(false);

//   const contents = messages.map(msg => ({ text: msg.content })); // Map to expected structure

//   const payload = {
//       model: model,
//       contents: contents // Ensure correct structure
//   };

//   // Use the correct format for sending the message
//   chrome.runtime.sendMessage(
//       {
//           type: "CHAT_COMPLETION",
//           payload: payload,
//           context: extensionData,
//       },
//       (response) => {
//           if (chrome.runtime.lastError) {
//               console.error("Runtime error:", chrome.runtime.lastError.message);
//               setChatIsError(true);
//               setChatIsGenerating(false);
//           } else {
//               console.log("Received chat completion response:", response);
//               handleChatCompletion(response);
//           }
//       }
//   );
// }


// export default function PromptForm({ className }: PromptFormProps) {
//   const { extensionData } = useExtension();
//   const inputRef = useRef<HTMLTextAreaElement>(null);
//   const { chatMessages, chatPrompt, setChatPrompt, setChatMessages, setChatIsGenerating, chatModel } = useChat();
//   const { formRef, onKeyDown, onKeyUp } = useEnterSubmit();
//   const [chatIsError, setChatIsErrorLocal] = useState(false);

//   const handleChatCompletion = (response: any) => {
//     console.log("Received chat completion response:", response);
    
//     setChatIsGenerating(false);

//     if (response?.error) {
//       setChatIsErrorLocal(true);
//       console.error("Error during chat completion:", response.error || "Unknown error.");
//     } else {
//       const newMessages = [...chatMessages];
//       const latestMessage = response.message || response.response;

//       // Check if there are any messages before trying to access the last one
//       if (newMessages.length > 0) {
//         newMessages[newMessages.length - 1].content = latestMessage;
//         setChatMessages(newMessages);
//       } else {
//         console.error("No messages to update with the response:", response);
//         setChatIsErrorLocal(true);
//       }
//     }
//   };

//   useEffect(() => {
//     console.log("PromptForm mounted");
//     if (inputRef.current) {
//       inputRef.current.focus();
//     }
//   }, []);

//  // Update this part in PromptForm
// const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//   e.preventDefault();

//   const value = chatPrompt.trim();
//   setChatPrompt("");
//   if (!value) return;

//   const userMessage = {
//       role: "user",
//       content: value,
//   };

//   // Prepare updated messages
//   const updatedMessages = [...chatMessages, userMessage];

//   // Send message
//   console.log("Sending messages for generation:", updatedMessages);
//   await generateChat(
//       chatModel?.content || "defaultModel", // Accessing model content
//       updatedMessages,
//       extensionData,
//       setChatIsGenerating,
//       setChatIsErrorLocal,
//       handleChatCompletion
//   );
// };



//   return (
//     <form
//       ref={formRef}
//       onSubmit={handleSubmit}
//       className={cn("absolute bottom-0 z-10 p-4 w-full bg-white", className)}
//     >
//       <div className="relative flex max-h-60 w-full grow flex-col overflow-hidden rounded-md border border-gray-200">
//         <Textarea
//           ref={inputRef}
//           tabIndex={0}
//           onKeyDown={onKeyDown}
//           onKeyUp={onKeyUp}
//           placeholder="Send a message."
//           className="min-h-[50px] w-full resize-none bg-transparent px-4 py-4 focus:outline-none text-sm"
//           autoFocus
//           spellCheck={false}
//           autoComplete="off"
//           autoCorrect="off"
//           name="message"
//           rows={1}
//           value={chatPrompt}
//           onChange={(e) => setChatPrompt(e.target.value)}
//         />

//         <div className="absolute right-0 top-[10px] pr-3">
//           <button
//             type="submit"
//             disabled={!chatPrompt}
//             className="flex items-center justify-center w-8 h-8 border border-gray-200 rounded-md hover:bg-gray-100 disabled:opacity-50"
//           >
//             <PaperPlaneIcon className="w-5 h-5 text-gray-600" />
//           </button>
//         </div>
//       </div>
//       {chatIsError && <div style={{ color: "red" }}>An error occurred. Please try again.</div>}
//     </form>
//   );
// }






// import { useChat } from "@/contexts/chat-context";
// import { useExtension } from "@/contexts/extension-context";
// import { useEnterSubmit } from "@/libs/hooks/use-enter-submit";
// import { cn } from "@/libs/utils";
// import { PaperPlaneIcon } from "@radix-ui/react-icons";
// import { useEffect, useRef, useState } from "react";
// import Textarea from "react-textarea-autosize";

// interface PromptFormProps {
//   className?: string;
// }

// const {
//   chatMessages,
//   chatPrompt,
//   setChatPrompt,
//   setChatMessages,
//   setChatIsGenerating,
//   setChatIsError,
//   chatModel
// } = useChat()

// async function generateChat(
//   model,
//   messages,
//   extensionData,
//   setChatIsGenerating,
//   setChatIsError,
//   setChatMessages
// ) {
//   console.log("Generating chat with model:", model, "and messages:", messages);

//   setChatIsGenerating(true);
//   setChatIsError(false);

//   chrome.runtime.sendMessage(
//     {
//       type: "CHAT_COMPLETION",
//       model: model,
//       messages: messages,
//       context: extensionData,
//     },
//     async (responseStream) => {
//       if (chrome.runtime.lastError) {
//         console.error("Runtime error:", chrome.runtime.lastError.message);
//         setChatIsError(true);
//       } else {
//         console.log("Receiving streaming chat completion response...");

//         let finalResponse = "";

//         try {
//           // Use for await loop to process each chunk in the response stream
//           for await (const chunk of responseStream) {
//             finalResponse += chunk.text || ""; // Concatenate each chunk's text
//           }

//           console.log("Final chat completion response:", finalResponse);

//           // Update chat messages after streaming completes
//           if (finalResponse) {
//             setChatMessages((prevMessages) => [
//               ...prevMessages,
//               { role: "system", content: finalResponse },
//             ]);
//           }
//         } catch (error) {
//           console.error("Error processing response stream:", error);
//           setChatIsError(true);
//         }
//       }

//       setChatIsGenerating(false);
//     }
//   );
// }





// export default function PromptForm({ className }: PromptFormProps) {
//   const { extensionData } = useExtension();
//   const inputRef = useRef<HTMLTextAreaElement>(null);
//   const { chatMessages, chatPrompt, setChatPrompt, setChatMessages, setChatIsGenerating, chatModel } = useChat();
//   const { formRef, onKeyDown, onKeyUp } = useEnterSubmit();
//   const [chatIsError, setChatIsErrorLocal] = useState(false);

 

//   const handleSubmit = async (e) => {
//     e.preventDefault();
  
//     const value = chatPrompt.trim();
//     setChatPrompt(""); // Clear the input field
//     if (!value) return;
  
//     // Prepare the user's message and update the chat messages
//     const userMessage = { role: "user", content: value };
//     const updatedMessages = [...chatMessages, userMessage];
  
//     // Update the chat message state with the new user message
//     setChatMessages(updatedMessages);
  
//     console.log("Sending messages for generation:", updatedMessages);
  
//     // Call generateChat to get the assistant's response
//     await generateChat(
//       chatModel?.content || "defaultModel",
//       updatedMessages,
//       extensionData,
//       setChatIsGenerating,
//       setChatIsError,
//       setChatMessages
//     );
//   };
  
  

//   useEffect(() => {
//     console.log("PromptForm mounted");
//     if (inputRef.current) {
//       inputRef.current.focus();
//     }
//   }, []);

//   return (
//     <form
//       ref={formRef}
//       onSubmit={handleSubmit}
//       className={cn("absolute bottom-0 z-10 p-4 w-full bg-white", className)}
//     >
//       <div className="relative flex max-h-60 w-full grow flex-col overflow-hidden rounded-md border border-gray-200">
//         <Textarea
//           ref={inputRef}
//           tabIndex={0}
//           onKeyDown={onKeyDown}
//           onKeyUp={onKeyUp}
//           placeholder="Send a message."
//           className="min-h-[50px] w-full resize-none bg-transparent px-4 py-4 focus:outline-none text-sm"
//           autoFocus
//           spellCheck={false}
//           autoComplete="off"
//           autoCorrect="off"
//           name="message"
//           rows={1}
//           value={chatPrompt}
//           onChange={(e) => setChatPrompt(e.target.value)}
//         />

//         <div className="absolute right-0 top-[10px] pr-3">
//           <button
//             type="submit"
//             disabled={!chatPrompt}
//             className="flex items-center justify-center w-8 h-8 border border-gray-200 rounded-md hover:bg-gray-100 disabled:opacity-50"
//           >
//             <PaperPlaneIcon className="w-5 h-5 text-gray-600" />
//           </button>
//         </div>
//       </div>
//       {chatIsError && <div style={{ color: "red" }}>An error occurred. Please try again.</div>}
//     </form>
//   );
// }





import { useChat } from "@/contexts/chat-context";
import { useExtension } from "@/contexts/extension-context";
import { useEnterSubmit } from "@/libs/hooks/use-enter-submit";
import { cn } from "@/libs/utils";
import { PaperPlaneIcon } from "@radix-ui/react-icons";
import { useEffect, useRef, useState } from "react";
import Textarea from "react-textarea-autosize";

interface PromptFormProps {
  className?: string;
}



// async function generateChat(
//   model: string,
//   messages: any,
//   extensionData: any,
//   setChatIsGenerating: React.Dispatch<React.SetStateAction<boolean>>,
//   setChatIsError: React.Dispatch<React.SetStateAction<boolean>>,
//   setChatMessages: React.Dispatch<React.SetStateAction<any[]>>
// ) {
//   console.log("Generating chat with model:", model, "and messages:", messages);

//   setChatIsGenerating(true);
//   setChatIsError(false);

//   chrome.runtime.sendMessage(
//     {
//       type: "CHAT_COMPLETION",
//       model: model,
//       messages: messages,
//       context: extensionData,
//     },
//     async (response) => {
//       if (chrome.runtime.lastError) {
//         console.error("Runtime error:", chrome.runtime.lastError.message);
//         setChatIsError(true);
//         return;
//       }

//       console.log("Receiving chat completion response...");

//       let finalResponse = "";

//       try {
//         // Process the entire response if not streaming
//         if (response && response.message) {
//           finalResponse = response.message;
//         }

//         console.log("Final chat completion response:", finalResponse);

//         // Update chat messages after the response
//         if (finalResponse) {
//           setChatMessages((prevMessages) => [
//             ...prevMessages,
//             { role: "assistant", content: finalResponse },
//           ]);
//         }
//       } catch (error) {
//         console.error("Error processing response:", error);
//         setChatIsError(true);
//       } finally {
//         setChatIsGenerating(false);
//       }
//     }
//   );
// }


async function generateChat(
  model: string,
  messages: any,
  extensionData: any,
  setChatIsGenerating,
  setChatIsError,
  setChatMessages
) {
  console.log("Generating chat with model:", model, "and messages:", messages, "and context:", extensionData);

  setChatIsGenerating(true);
  setChatIsError(false);

  chrome.runtime.sendMessage(
    {
      type: "CHAT_COMPLETION",
      model: model,
      messages: messages,
      context: extensionData,
    },
    async (response) => {
      if (chrome.runtime.lastError) {
        console.error("Runtime error:", chrome.runtime.lastError.message);
        setChatIsError(true);
        setChatIsGenerating(false);
        return;
      }

      console.log("Receiving chat completion response...");

      let finalResponse = "";

      try {
        // Verify the response structure before processing it
        if (response && response.message) {
          finalResponse = response.message;
        } else {
          console.error("Unexpected response format:", response);
          throw new Error("Invalid response format from chat completion.");
        }

        console.log("Final chat completion response:", finalResponse);

        // Update chat messages after the response
        if (finalResponse) {
          setChatMessages((prevMessages) => [
            ...prevMessages,
            { role: "assistant", content: finalResponse },
          ]);
        }
      } catch (error) {
        console.error("Error processing response:", error);
        setChatIsError(true);
      } finally {
        setChatIsGenerating(false);
      }
    }
  );
}



export default function PromptForm({ className }: PromptFormProps) {
  const { extensionData } = useExtension();
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const { chatMessages, chatPrompt, setChatPrompt, setChatMessages, setChatIsGenerating, chatModel } = useChat();
  const { formRef, onKeyDown, onKeyUp } = useEnterSubmit();
  const [chatIsError, setChatIsErrorLocal] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const value = chatPrompt.trim();
    setChatPrompt(""); // Clear the input field
    if (!value) return;

    // Prepare the user's message and update the chat messages
    const userMessage = { role: "user", content: value };
    const updatedMessages = [...chatMessages, userMessage];

    // Update the chat message state with the new user message
    setChatMessages(updatedMessages);

    console.log("Sending messages for generation:", updatedMessages);

    // Call generateChat to get the assistant's response
    await generateChat(
      chatModel?.content || "defaultModel",
      updatedMessages,
      extensionData,
      setChatIsGenerating,
      setChatIsErrorLocal,
      setChatMessages
    );
  };

  useEffect(() => {
    console.log("PromptForm mounted");
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className={cn("absolute bottom-0 z-10 p-4 w-full bg-white", className)}
    >
      <div className="relative flex max-h-60 w-full grow flex-col overflow-hidden rounded-md border border-gray-200">
        <Textarea
          ref={inputRef}
          tabIndex={0}
          onKeyDown={onKeyDown}
          onKeyUp={onKeyUp}
          placeholder="Send a message."
          className="min-h-[50px] w-full resize-none bg-transparent px-4 py-4 focus:outline-none text-sm"
          autoFocus
          spellCheck={false}
          autoComplete="off"
          autoCorrect="off"
          name="message"
          rows={1}
          value={chatPrompt}
          onChange={(e) => setChatPrompt(e.target.value)}
        />

        <div className="absolute right-0 top-[10px] pr-3">
          <button
            type="submit"
            disabled={!chatPrompt}
            className="flex items-center justify-center w-8 h-8 border border-gray-200 rounded-md hover:bg-gray-100 disabled:opacity-50"
          >
            <PaperPlaneIcon className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>
      {chatIsError && <div style={{ color: "red" }}>An error occurred. Please try again.</div>}
    </form>
  );
}
