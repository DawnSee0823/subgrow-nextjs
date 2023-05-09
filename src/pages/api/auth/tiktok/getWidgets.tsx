// import fetch from 'node-fetch';

export default async function handler(req, res) {
  try {
    // Fetch TikTok videos from trending endpoint
    const response = await fetch('https://www.tiktok.com/node/share/discover?noUser=1&count=30');

    if (!response.ok) {
      throw new Error('Failed to fetch TikTok videos');
    }

    const data = await response.json();

    const video = data.body[Math.floor(Math.random() * data.body.length)];
    const author = video.author.uniqueId.replace(/\s/g, '');
    const videoId = video.id;

    // Construct TikTok widget URL
    const url = `https://www.tiktok.com/@${author}/video/${videoId}`;

    res.status(200).json({ response });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch TikTok widget' });
  }
}