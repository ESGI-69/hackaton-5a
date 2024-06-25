import ollama from 'ollama';

export default async (prompt: string) => {
  const response = await ollama.chat({
    model: 'mistral',
    messages: [{ role: 'user', content: prompt }],
    stream: false,
  });
  return response.message.content;
};
