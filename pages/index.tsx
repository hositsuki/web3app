// pages/index.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Article } from '../types';
import Link from 'next/link';

const Home: React.FC = () => {
    const [articles, setArticles] = useState<Article[]>([]);

    useEffect(() => {
        axios.get<Article[]>('/api/articles')
            .then(response => setArticles(response.data))
            .catch(error => console.error("Error fetching articles:", error));
    }, []);

    return (
        <div>
            <header>
                <h1>My Personal Blog</h1>
            </header>
            {articles.map(article => (
                <div key={article.id}>
                    <Link href={`/article/${article.id}`}>
                        <h2>{article.title}</h2>
                    </Link>
                    <p>{article.content.substring(0, 100)}...</p>
                </div>
            ))}
        </div>
    );
};

export default Home;
