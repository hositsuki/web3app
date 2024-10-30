import { NextApiRequest, NextApiResponse } from 'next';

let comments: any[] = [];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        const { articleId } = req.query;
        const filteredComments = comments.filter(comment => comment.articleId === Number(articleId));
        res.status(200).json(filteredComments);
    } else if (req.method === 'POST') {
        const { articleId, content } = req.body;
        const newComment = { id: Date.now(), articleId, content, createdAt: new Date().toISOString() };
        comments.push(newComment);
        res.status(201).json(newComment);
    }
}
