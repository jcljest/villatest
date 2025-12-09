import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || '';

// Initialize client
const ai = new GoogleGenAI({ apiKey });

export const streamGeminiResponse = async (
  userMessage: string,
  onChunk: (text: string) => void
) => {
  try {
    const chat = ai.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: `You are GitMaster AI, a helpful and expert assistant for Git and GitHub. 
        Your goal is to help users learn version control.
        - Keep answers concise and practical.
        - Always provide code snippets in bash/git format when relevant.
        - If the user asks about something unrelated to programming/git, politely steer them back to the topic.
        - Use Markdown for formatting.`,
      }
    });

    const result = await chat.sendMessageStream({ message: userMessage });

    for await (const chunk of result) {
      if (chunk.text) {
        onChunk(chunk.text);
      }
    }
  } catch (error) {
    console.error("Gemini API Error:", error);
    onChunk("\n\n*Error: Could not connect to the AI assistant. Please check your API key or try again later.*");
  }
};
