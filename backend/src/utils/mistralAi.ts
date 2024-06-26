import { Ollama } from 'ollama';

export const ollama = new Ollama({ host: process.env.OLLAMA_API });

export const generateAlertByMistral = async (
  prompts: string,
): Promise<{
  score: number;
  reasons: string[];
  summary: string;
}> => {
  const response = await ollama.chat({
    model: 'mistral',
    format: 'json',
    messages: [
      {
        role: 'system',
        content:
          "Réponds toujours en français, et seulement en français. Ton but est d'analyser une conversation entre un utilisateur (user) et un chatbot (system), un docteur (doctor) peut aussi intervenir durant la conversation, et de mesurer l'urgence médicale de la situation du patient. Le score peut etre de 0 à 600. Un score de 0 correpond soit a aucun problème, soit a un problème qui n'est pas de type médicale. Le score 600 correpond à un danger de mort imminent. Tu renvoies un JSON  en respectant cet interface { score: number, reasons: string[], summary: string }. reasons sont les 3 raisons qui ont déclanché l'alert. score est le score de l'alert. summary est un résumé le plus court possible le ou les problemes au docteur",
      },
      {
        role: 'user',
        content: prompts,
      },
    ],
    stream: false,
  });

  return JSON.parse(response.message.content);
};
