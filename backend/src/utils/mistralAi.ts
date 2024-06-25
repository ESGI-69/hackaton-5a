import { Ollama } from 'ollama';

export const ollama = new Ollama({ host: process.env.OLLAMA_API });

export default async (prompt: string) => {
  const response = await ollama.chat({
    model: 'mistral',
    messages: [{ role: 'user', content: prompt }],
    stream: false,
  });
  return response.message.content;
};
