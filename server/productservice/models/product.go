package models

type Product struct {
	ID          string   `bun:"id,pk,unique"`
	Name        string   `bun:"name,notnull"`
	Description string   `bun:"description,notnull"`
	Price       float64  `bun:"price,notnull"`
	ImageUrl    string   `bun:"image_url,notnull"`
}