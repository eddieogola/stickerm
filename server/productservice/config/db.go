package config

import (
	"context"
	"database/sql"
	"log"
	"os"
	"sync"

	"github.com/uptrace/bun"
	"github.com/uptrace/bun/dialect/pgdialect"
	"github.com/uptrace/bun/driver/pgdriver"

	models "github.com/eddieogola/stickerm/server/productservice/models"
)

var (
    db   *bun.DB
    once sync.Once
)

func ConnectDB() *bun.DB {
    once.Do(func() {
        connString := os.Getenv("DB_CONNECTION_STRING")

        if connString == "" {
            log.Fatal("DB_CONNECTION_STRING environment variable is not set")
        }

        sqldb := sql.OpenDB(pgdriver.NewConnector(pgdriver.WithDSN(connString)))
        db = bun.NewDB(sqldb, pgdialect.New())
        
        // Test the connection
        ctx := context.Background()
        if err := db.PingContext(ctx); err != nil {
            log.Fatalf("Failed to connect to database: %v", err)
        }
        
        log.Println("Database connected successfully")

        // Auto-migrate the Product model
        _, err := db.NewCreateTable().
            Model((*models.Product)(nil)).
            IfNotExists().
            Exec(ctx)

        if err != nil {
            log.Fatalf("Failed to create Product table: %v", err)
        }
    })
    
    return db
}

func GetDB() *bun.DB {
    if db == nil {
        return ConnectDB()
    }
    return db
}

func CloseDB() error {
    if db != nil {
        return db.Close()
    }
    return nil
}
