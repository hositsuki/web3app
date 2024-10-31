package main

import (
	"github.com/gorilla/mux"
	"log"
	"net/http"
	"web3app/backend/handlers"
)

func main() {
	r := mux.NewRouter()

	r.HandleFunc("/api/articles", handlers.GetArticles).Methods("GET")
	r.HandleFunc("/api/comments", handlers.GetComments).Methods("GET")
	r.HandleFunc("/api/comments", handlers.AddComment).Methods("POST")
	r.HandleFunc("/api/generate-comment", handlers.GenerateComment).Methods("POST")

	log.Println("Server running on port 8080")
	log.Fatal(http.ListenAndServe(":8080", r))
}
