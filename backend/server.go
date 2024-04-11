package main

import (
	"log"
	"net/http"
	"os"

	"github.com/99designs/gqlgen/graphql/handler"
	"github.com/99designs/gqlgen/graphql/playground"
	"github.com/Big-Scale/Commerce/db/scheme"
	"github.com/Big-Scale/Commerce/graph"
	"github.com/Big-Scale/Commerce/graph/resolvers"
	"github.com/gin-gonic/gin"
	_ "github.com/go-sql-driver/mysql"
)

const defaultPort = ":8080"

// CORSMiddleware configures the necessary CORS headers
func CORSMiddleware() gin.HandlerFunc {
    return func(c *gin.Context) {
        c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
        c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
        c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")
        c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS, GET, PUT, DELETE")

        if c.Request.Method == "OPTIONS" {
            c.AbortWithStatus(http.StatusNoContent)
            return
        }

        c.Next()
    }
}

// Defining the Graphql handler
func graphqlHandler() gin.HandlerFunc {
	// NewExecutableSchema and Config are in the generated.go file
	// Resolver is in the resolver.go file
	h := handler.NewDefaultServer(graph.NewExecutableSchema(graph.Config{Resolvers: &resolvers.Resolver{Database: scheme.DBInstance}}))

	return func(c *gin.Context) {
		h.ServeHTTP(c.Writer, c.Request)
	}
}

// Defining the Playground handler
func playgroundHandler() gin.HandlerFunc {
	h := playground.Handler("GraphQL", "/query")

	return func(c *gin.Context) {
		h.ServeHTTP(c.Writer, c.Request)
	}
}




func main() {
	port := os.Getenv("PORT")
	
	if port == "" {
		port = defaultPort
	}

	scheme.ConnectDB()
	scheme.CreateDB()
	scheme.MigrateDB()
	log.Print("SUCCESSFULL DB")
	router := gin.Default()
	router.Use(CORSMiddleware())
	router.POST("/query", graphqlHandler())
	router.GET("/", playgroundHandler())
	router.Run(port)
	log.Printf("%s", port)
	log.Printf("connect to http://localhost:%s/ for GraphQL playground", port)
	log.Fatal(http.ListenAndServe(":"+port, nil))
}
