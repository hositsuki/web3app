// components/CommentForm.tsx
import React, { useState } from 'react';
import axios from 'axios';
import { Comment } from '@/types';

interface CommentFormProps {
    articleId: number;
    onAddComment: (comment: Comment) => void;
}

const CommentForm: React.FC<CommentFormProps> = ({ articleId, onAddComment }) => {
    const [content, setContent] = useState<string>('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        axios.post<Comment>(`/api/comments`, { articleId, content })
            .then(response => {
                onAddComment(response.data);
                setContent('');
            })
            .catch(error => console.error("Error adding comment:", error));
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Add a comment"
            />
            <button type="submit">Submit</button>
        </form>
    );
};

export default CommentForm;
