package handlers

import (
	"encoding/json"
	"net/http"
)

type GPTRequest struct {
	Prompt string `json:"prompt"`
}

type GPTResponse struct {
	Content string `json:"content"`
}

func GenerateComment(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	var req GPTRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, "Invalid request payload", http.StatusBadRequest)
		return
	}

	generatedContent := "Here's a GPT-generated comment based on: " + req.Prompt
	json.NewEncoder(w).Encode(GPTResponse{Content: generatedContent})
}
