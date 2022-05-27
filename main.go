package main

import (
	"log"
	"net/http"
	"os"
	"time"
	"html/template"

	"github.com/gorilla/handlers"
	"github.com/gorilla/mux"
)

const service string = "wc"

func main() {
	r := mux.NewRouter()
	r.HandleFunc("/", defaultHandler)
	r.PathPrefix("/c/").Handler(http.StripPrefix("/c/", http.FileServer(http.Dir("c"))))
	
	c := handlers.AllowedOrigins([]string{"*"})

	port := os.Getenv("PORT")
	if port == "" {
		port = "8801"
	}

	srv := &http.Server{
		Addr: "0.0.0.0:" + port,
		WriteTimeout: time.Second * 15,
		ReadTimeout: time.Second * 15,
		IdleTimeout: time.Second * 15,
		Handler: handlers.CORS(c)(r),
	}
	
	log.Fatal(srv.ListenAndServe())
}

func defaultHandler(w http.ResponseWriter, r *http.Request) {
	tmpl := template.Must(template.ParseFiles("test/test.html"))

	tmpl.Execute(w, nil)
}

