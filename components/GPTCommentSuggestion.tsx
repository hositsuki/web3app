// components/GPTCommentSuggestion.tsx
import React, { useState } from 'react';
import axios from 'axios';
import { Comment } from '../types';

interface GPTCommentSuggestionProps {
    articleId: number;
    onAddComment: (comment: Comment) => void;
}

const GPTCommentSuggestion: React.FC<GPTCommentSuggestionProps> = ({ articleId, onAddComment }) => {
    const [suggestion, setSuggestion] = useState<string>('');
    const [prompt, setPrompt] = useState<string>('');

    const handleGenerateSuggestion = () => {
        axios.post<{ content: string }>(`/api/generate-comment`, { prompt })
            .then(response => setSuggestion(response.data.content))
            .catch(error => console.error("Error generating suggestion:", error));
    };

    const handleAddSuggestion = () => {
        onAddComment({ id: Date.now(), articleId, content: suggestion, createdAt: new Date().toISOString() });
        setSuggestion('');
    };

    return (
        <div>
            <input
                type="text"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Generate a comment suggestion"
            />
            <button onClick={handleGenerateSuggestion}>Generate</button>
            {suggestion && (
                <div>
                    <p>Suggested Comment: {suggestion}</p>
                    <button onClick={handleAddSuggestion}>Add Suggestion</button>
                </div>
            )}
        </div>
    );
};

export default GPTCommentSuggestion;
