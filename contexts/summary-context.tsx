import { models, prompts, type Model, type Prompt } from "libs/constants";
import { createContext, useContext, useEffect, useState } from "react";
import { useExtension } from "./extension-context";

interface SummaryContext {
  summaryModel: Model;
  setSummaryModel: (model: Model) => void;
  summaryPrompt: Prompt;
  setSummaryPrompt: (prompt: Prompt) => void;
  summaryContent: string | null;
  setSummaryContent: (content: string | null) => void;
  summaryIsError: boolean;
  setSummaryIsError: (isError: boolean) => void;
  summaryIsGenerating: boolean;
  setSummaryIsGenerating: (isGenerating: boolean) => void;
  generateSummary: (e: React.FormEvent) => void;
}

const SummaryContext = createContext<SummaryContext | undefined>(undefined);

export function useSummary() {
  const context = useContext(SummaryContext);
  if (!context) {
    throw new Error("useSummary must be used within a SummaryProvider");
  }
  return context;
}

interface SummaryProviderProps {
  children: React.ReactNode;
}

export function SummaryProvider({ children }: SummaryProviderProps) {
  const [summaryModel, setSummaryModel] = useState<Model>(models[0]);
  const [summaryPrompt, setSummaryPrompt] = useState<Prompt>(prompts[0]);
  const [summaryContent, setSummaryContent] = useState<string | null>(null);
  const [summaryIsError, setSummaryIsError] = useState<boolean>(false);
  const [summaryIsGenerating, setSummaryIsGenerating] = useState<boolean>(false);

  const { extensionData } = useExtension();

  const generateSummary = async (e: React.FormEvent) => {
    e.preventDefault();
    setSummaryContent(null);
    setSummaryIsError(false);
    setSummaryIsGenerating(true);
  
    console.log("generateSummary called");
    console.log("Sending message with:", {
      type: "GENERATE_SUMMARY",
      prompt: summaryPrompt.content,
      model: summaryModel.content,
      context: extensionData,
    });
  
    chrome.runtime.sendMessage(
      {
        type: "GENERATE_SUMMARY",
        prompt: summaryPrompt.content,
        model: summaryModel.content,
        context: extensionData,
      },
      (response) => {
        console.log("Received response:", response);
        if (response?.error) {
          setSummaryIsError(true);
          setSummaryContent(null);
          setSummaryIsGenerating(false);
          console.error("Error generating summary:", response.error);
        } else if (response?.message?.response?.candidates?.[0]?.content?.parts?.[0]?.text) {
          // Accessing the nested content text field
          setSummaryContent(response.message.response.candidates[0].content.parts[0].text);
          setSummaryIsGenerating(false);
        } else {
          setSummaryIsError(true);
          setSummaryContent(null);
          setSummaryIsGenerating(false);
          console.error("Unexpected response format", response);
        }
      }
    );
  };
  

  useEffect(() => {
    console.log("Summary content or error state changed:", {
      summaryContent,
      summaryIsError,
    });
  }, [summaryContent, summaryIsError]);

  const value = {
    summaryModel,
    setSummaryModel,
    summaryPrompt,
    setSummaryPrompt,
    summaryContent,
    setSummaryContent,
    summaryIsError,
    setSummaryIsError,
    summaryIsGenerating,
    setSummaryIsGenerating,
    generateSummary,
  };

  return <SummaryContext.Provider value={value}>{children}</SummaryContext.Provider>;
}
