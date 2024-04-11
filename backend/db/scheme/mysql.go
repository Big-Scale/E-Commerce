package scheme

import (
	"fmt"

	"github.com/Big-Scale/Commerce/graph"
	"github.com/jinzhu/gorm"
)

// a vriable to store database connection
var DBInstance *gorm.DB

// Var for error handling
var err error

// the db connection string
var CONNECTION_STRING string = "root:@tcp(localhost:3306)/?charset=utf8&parseTime=True&loc=Local"

// connectiong to the db
func ConnectDB() {
	// pass the db connection string
	ConnectionURI := CONNECTION_STRING
	// check for db connection
	DBInstance, err = gorm.Open("mysql", ConnectionURI)
	if err != nil {
		fmt.Println(err)
	} else {
		fmt.Println("Database Connected successfully.....")
	}
	// log all dabase operations perfomed by this connection
	DBInstance.LogMode(true)
}

// Create a database
func CreateDB() {
	DBInstance.Exec("CREATE DATABASE IF NOT EXISTS test_commerce")
	DBInstance.Exec("USE test_commerce")
}

// migrate and sync the model to create a db table
func MigrateDB() {
	
	DBInstance.AutoMigrate(&graph.Category{}, &graph.Product{})
	fmt.Println("Database migration completed....")
}

func FetchConnection() (*gorm.DB, error){
    db,err := gorm.Open("mysql","root:@/test_commerce?parseTime=true")
    if err != nil{
        panic(err)
    }
    return db, err
}