import { MessageArraySchema } from "@/lib/validators/message";
import { ChatGPTMessage } from "@/lib/openai-stream";
import { chatbotPrompt } from "@/helpers/constants/chatbot-prompt";

export async function POST(req: Request){
    const {messages} = await req.json();

    const parsedMessages = MessageArraySchema.parse(messages);

    const outBoundMessages: ChatGPTMessage[] = parsedMessages.map((msg) => ({
        role: msg.isUserMessage? "user" : "system",
        content: msg.text
    }))

    outBoundMessages.unshift({
        role: "system",
        content: chatbotPrompt
    })
}