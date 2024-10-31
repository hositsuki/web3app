package handlers

import (
	"encoding/json"
	"net/http"
	"time"
)

type Article struct {
	ID        int       `json:"id"`
	Title     string    `json:"title"`
	Content   string    `json:"content"`
	CreatedAt time.Time `json:"createdAt"`
}

var articles = []Article{
	{ID: 1, Title: "Introduction to Web3", Content: "Web3 is the next...", CreatedAt: time.Now()},
	{ID: 2, Title: "React Tips and Tricks", Content: "React is a powerful UI library...", CreatedAt: time.Now()},
}

func GetArticles(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(articles)
}
