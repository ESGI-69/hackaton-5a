import { image_search } from 'duckduckgo-images-api';

export default async (query: string) => {
  const results = await image_search({
    query,
    moderate: true,
  });

  let choosedImage: string;

  for (const { thumbnail } of results) {
    const requestTimestamp = Date.now();
    const response = await fetch(thumbnail);
    const responseTimestamp = Date.now();
    const ping = responseTimestamp - requestTimestamp;
    if (response.ok && ping < 350) {
      choosedImage = thumbnail;
      return choosedImage;
    }
  }
};
