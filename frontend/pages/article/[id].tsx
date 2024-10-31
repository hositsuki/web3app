
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Article, Comment } from '@/types';
import CommentForm from '../../components/CommentForm';
import GPTCommentSuggestion from '../../components/GPTCommentSuggestion';

interface ArticleDetailProps {
    article: Article;
}

const ArticleDetail: React.FC<ArticleDetailProps> = ({ article }) => {
    const [comments, setComments] = useState<Comment[]>([]);

    useEffect(() => {
        axios.get<Comment[]>(`/api/comments?articleId=${article.id}`)
            .then(response => setComments(response.data))
            .catch(error => console.error("Error fetching comments:", error));
    }, [article.id]);

    const handleAddComment = (newComment: Comment) => {
        setComments([...comments, newComment]);
    };

    return (
        <div>
            <h2>{article.title}</h2>
            <p>{article.content}</p>
            <h3>Comments</h3>
            {comments.map(comment => (
                <p key={comment.id}>{comment.content}</p>
            ))}
            <CommentForm articleId={article.id} onAddComment={handleAddComment} />
            <GPTCommentSuggestion articleId={article.id} onAddComment={handleAddComment} />
        </div>
    );
};

export default ArticleDetail;
