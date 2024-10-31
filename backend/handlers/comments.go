package handlers

import (
	"encoding/json"
	"net/http"
	"strconv"
	"time"
)

type Comment struct {
	ID        int       `json:"id"`
	ArticleID int       `json:"articleId"`
	Content   string    `json:"content"`
	CreatedAt time.Time `json:"createdAt"`
}

var comments = []Comment{}

func GetComments(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	articleID, err := strconv.Atoi(r.URL.Query().Get("articleId"))
	if err != nil {
		http.Error(w, "Invalid article ID", http.StatusBadRequest)
		return
	}

	var articleComments []Comment
	for _, comment := range comments {
		if comment.ArticleID == articleID {
			articleComments = append(articleComments, comment)
		}
	}

	err = json.NewEncoder(w).Encode(articleComments)
	if err != nil {
		return
	}
}

func AddComment(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	var comment Comment
	if err := json.NewDecoder(r.Body).Decode(&comment); err != nil {
		http.Error(w, "Invalid request payload", http.StatusBadRequest)
		return
	}

	comment.ID = len(comments) + 1
	comment.CreatedAt = time.Now()
	comments = append(comments, comment)
	err := json.NewEncoder(w).Encode(comment)
	if err != nil {
		return
	}
}
