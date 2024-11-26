import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.setHeader('Content-Type', 'text/plain');
  res.send(`
    User-agent: *
    Allow: /
    Sitemap: https://esenet-jobfair2024.vercel.app/sitemap.xml
  `);
}
