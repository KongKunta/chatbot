import { LMStudioClient } from "@lmstudio/sdk";
import chat from "../chat/page";
async function llama(userMessage: string) {
  // Create a client to connect to LM Studio, then load a model
  const client = new LMStudioClient();
  const model = await client.llm.load(
    "lmstudio-community/Meta-Llama-3-8B-Instruct-GGUF"
  );

  // Predict!
  const prediction = model.respond([
    { role: "system", content: "You are a helpful AI assistant." },
    { role: "user", content: userMessage },
  ]);

  const response = await prediction;
  return response.content;
}

export default llama;
