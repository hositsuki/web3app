// types.d.ts
export interface Article {
    id: number;
    title: string;
    content: string;
    createdAt: string;
}

export interface Comment {
    id: number;
    articleId: number;
    content: string;
    createdAt: string;
}
