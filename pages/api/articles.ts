import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    // Mock 数据
    const articles = [
        { id: 1, title: "First Article", content: "This is the first article.", createdAt: new Date().toISOString() },
        { id: 2, title: "Second Article", content: "This is the second article.", createdAt: new Date().toISOString() },
    ];
    res.status(200).json(articles);
}
