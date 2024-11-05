//@plasmohq/permission storage
import { GoogleGenerativeAI } from "@google/generative-ai";
const googleApiKey = process.env.PLASMO_PUBLIC_GOOGLE_API_KEY;


const genAI = new GoogleGenerativeAI(googleApiKey);

// Summary functionality
async function createCompletion(modelId, prompt, context) {
    try {
        console.log("Creating summary completion with modelId:", modelId);
        const model = await genAI.getGenerativeModel({ model: modelId });
        console.log("Model retrieved for summary:", model);

        const parsedTranscript = context.transcript.events
            .filter((x) => x.segs)
            .map((x) => x.segs.map((y) => y.utf8).join(" "))
            .join(" ")
            .replace(/[\u200B-\u200D\uFEFF]/g, "")
            .replace(/\s+/g, " ");
        console.log("Parsed transcript for summary:", parsedTranscript);

        const userInput = `${prompt}\n\nVideo Title: ${context.metadata.title}\nVideo Transcript: ${parsedTranscript}`;
        console.log("User input for summary generation:", userInput);

        const result = await model.generateContent(userInput)
    .catch((error) => {
        console.error("Error during summary generation:", error.message);
        if (error.response) {
            console.error("Response data:", error.response.data);
            console.error("Response status:", error.response.status);
        } else {
            console.error("Error message:", error.message);
        }
        throw new Error("Failed to generate summary.");
    });


        console.log("Generated summary result:", result);
        return result;
    } catch (error) {
        console.error("Error during summary completion:", error);
        if (error.response) {
            console.error("API error response:", error.response);
            throw new Error(`API Error: ${error.response.data.error}`);
        } else if (error.request) {
            console.error("Network error, request not completed:", error.request);
            throw new Error("Network Error: Request was not completed.");
        } else {
            console.error("Unexpected error in createCompletion:", error.message);
            throw new Error(`Unexpected Error: ${error.message}`);
        }
    }
}

const SYSTEM = `
You are a helpful assistant. Given the metadata and transcript of a YouTube video, your primary task is to provide accurate and relevant answers to any questions based on this information. Use the available details effectively to assist users with their inquiries about the video's content, context, or any other related aspects.

START OF METADATA
Video Title: {title}
END OF METADATA

START OF TRANSCRIPT
{transcript}
END OF TRANSCRIPT
`;

async function createChatCompletionRequest(modelId, messages, context) {
    try {
        console.log("Model ID:", modelId);
        console.log("Messages:", messages);
        console.log("Context:", context);

        // Validate inputs
        if (!messages || messages.length === 0 || !context) {
            throw new Error("Messages and context are required for chat completion.");
        }

        // Parse the transcript
        const parsedTranscript = context.transcript.events
            .filter(event => event.segs)
            .map(event => event.segs.map(seg => seg.utf8).join(" "))
            .join(" ")
            .replace(/[\u200B-\u200D\uFEFF]/g, "")
            .replace(/\s+/g, " ");

        // Prepare the system message
        const SYSTEM_WITH_CONTEXT = SYSTEM.replace("{title}", context.metadata.title)
            .replace("{transcript}", parsedTranscript);

        // Initialize the model
        const model = await genAI.getGenerativeModel({ model: modelId });
        const chat = model.startChat({
            history: [
                {
                    role: "user",
                    parts: [{ text: "Please provide assistance based on the following context." }],
                },
                {
                    role: "model",
                    parts: [{ text: SYSTEM_WITH_CONTEXT }],
                },
            ],
        });

        let finalResponse = ""; // Accumulates final response for all messages

        // Send messages and process the streaming response
        for (const msg of messages) {
            let tempResponse = ""; // Temporary response for the current message

            // Await the result stream promise
            const resultStream = await chat.sendMessageStream(msg.content);
            console.log("Result Stream:", resultStream); // Inspect the result stream structure
            
            if (resultStream && resultStream.stream) {
                // Access the stream directly
                for await (const chunk of resultStream.stream) {
                    console.log("Chunk received:", chunk); // Inspect each chunk
                    // Call the text function if it exists and append the returned text
                    if (typeof chunk.text === "function") {
                        const textResponse = await chunk.text(); // Call the function to get the text
                        tempResponse += textResponse || ""; // Collect current message response
                    } else {
                        console.warn("Chunk does not contain a valid text function:", chunk);
                    }
                }
            } else {
                console.error("Invalid or missing result stream");
                throw new Error("Invalid result stream.");
            }

            finalResponse += tempResponse; // Append current message response to finalResponse
        }

        console.log("Final accumulated response:", finalResponse);
        return finalResponse;

    } catch (error) {
        console.error("Error during chat completion:", error);
        throw new Error("An error occurred while creating chat completion.");
    }
}

chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
    console.log("Received message:", request);

    try {
        if (request.type === "GENERATE_SUMMARY") {
            const completion = await createCompletion(request.model, request.prompt, request.context);
            console.log("Sending summary response with completion:", completion);
            sendResponse({ message: completion, error: null });
        } else if (request.type === "CHAT_COMPLETION") {
            const completion = await createChatCompletionRequest(request.model, request.messages, request.context);
            console.log("Sending chat response with completion:", completion);
            sendResponse({ message: completion, error: null });
        } else {
            console.log("Unknown request type:", request.type);
            sendResponse({ error: "Invalid request type." });
        }
    } catch (error) {
        console.error("Error processing request:", error.message);
        sendResponse({ error: error.message });
    }

    // Required to indicate that sendResponse will be asynchronous
    return true;
});
