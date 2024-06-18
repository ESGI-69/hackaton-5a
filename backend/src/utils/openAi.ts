import OpenAI, { ClientOptions } from 'openai';

class OpenAIQueryBuilder {
  private static instance: OpenAIQueryBuilder;
  private client: OpenAI;
  private chatbotSystemMessage = 'Tu est un chatbot d\'un hackathon, répond à mes questions.';
  private model = 'gpt-3.5-turbo';

  private constructor() {
    const apiKey = process.env.OPENAI_API_KEY || '';
    const clientOptions: ClientOptions = { apiKey };
    this.client = new OpenAI(clientOptions);
  }

  public static getInstance(): OpenAIQueryBuilder {
    if (!OpenAIQueryBuilder.instance) {
      OpenAIQueryBuilder.instance = new OpenAIQueryBuilder();
    }
    return OpenAIQueryBuilder.instance;
  }

  public async chatbot(prompts: Array<OpenAI.Chat.Completions.ChatCompletionMessageParam>): Promise<OpenAI.Chat.Completions.ChatCompletion> {
    const messages: OpenAI.Chat.Completions.ChatCompletionMessageParam[] = [
      {
        role: 'system',
        content: this.chatbotSystemMessage,
      },
      ...prompts,
    ];

    const response = await this.client.chat.completions.create({
      messages,
      model: this.model,
    });
    return response;
  }

}

export default OpenAIQueryBuilder;
