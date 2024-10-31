import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    const { prompt } = req.body;
    const mockGPTResponse = `GPT suggestion for: ${prompt}`;
    res.status(200).json({ content: mockGPTResponse });
}
