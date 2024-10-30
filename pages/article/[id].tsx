// pages/article/[id].tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { GetServerSideProps } from 'next';
import { Article, Comment } from '../../types';
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

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { id } = context.params!;
    const response = await axios.get<Article>(`http://localhost:3000/api/articles/${id}`);
    return {
        props: {
            article: response.data
        }
    };
};

export default ArticleDetail;
