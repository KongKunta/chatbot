import { LMStudioClient } from "@lmstudio/sdk";
async function llama() {
  // Create a client to connect to LM Studio, then load a model
  const client = new LMStudioClient();
  const model = await client.llm.load(
    "lmstudio-community/Meta-Llama-3-8B-Instruct-GGUF"
  );

  // Predict!
  const prediction = model.respond([
    { role: "system", content: "You are a helpful AI assistant." },
    { role: "user", content: "can you just say hi?" },
  ]);

  const response = await prediction;
  console.log(response.content);
  return response.content;
}

export default llama;
