import { BarChartIcon } from "@radix-ui/react-icons"

export type Model = {
  value: string
  label: string
  content?: string
  icon?: any
}

export type Prompt = {
  value: string
  label: string
  content: string
}

export const models: Model[] = [
  {
    value: "gemini-1.5",
    label: "Gemini 1.5",
    content: "gemini-1.5-flash", // Updated model name
    icon: <BarChartIcon className="h-4 w-4 opacity-70" />
  }
]

export const prompts: Prompt[] = [
  {
    value: "default",
    label: "Default Summary Prompt",
    content: `Here is the prompt for Gemini model:

    "Your output should use the following template:
    
    ## Summary
    
    ## Analogy
    
    ## Notes
    
    - [Emoji] Bulletpoint
    
    ### Keywords
    
    - Explanation
    
    You have been tasked with creating a concise summary of a YouTube video using its transcription to supply college student notes to use himself. You are to act like an expert in the subject the transcription is written about.
    
    Make a summary of the transcript. Use keywords from the transcript. Don't explain them. Keywords will be explained later.
    
    Additionally make a short complex analogy to give context and/or analogy from day-to-day life from the transcript.
    
    Create 10 bullet points (each with an appropriate emoji) that summarize the key points or important moments from the video's transcription.
    
    In addition to the bullet points, extract the most important keywords and any complex words not known to the average reader as well as any acronyms mentioned. For each keyword and complex word, provide an explanation and definition based on its occurrence in the transcription.
    
    Please ensure that the summary, bullet points, and explanations fit within the 330-word limit, while still offering a comprehensive and clear understanding of the video's content."`
  },
  {
    value: "simple-summary",
    label: "Simple Summary",
    content: "Summarize the key points of this video."
  }
]

export type Transcript = {
  text: string
  startTime: number
  endTime: number
}

export type Message = {
  role: string
  content: string
}

type Part = {
  text: string;
  role: "user" | "system" | "model"; // Assuming these are the valid roles
};
