import { MessageArraySchema } from "@/lib/validators/message";
import { ChatGPTMessage, OpenAIStream } from "@/lib/openai-stream";
import { chatbotPrompt } from "@/helpers/constants/chatbot-prompt";
import { OpenAIStreamPayload } from "@/lib/openai-stream";

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

    const payload: OpenAIStreamPayload = {
        model: "gpt-3.5-turbo",
        messages: outBoundMessages,
        temperature: 0.4,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
        max_tokens: 150,
        stream: true,
        n: 1
    }

    const stream = await OpenAIStream(payload)

    return new Response(stream)
}