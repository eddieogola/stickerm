package controllers

import (
	"context"
	"log"

	"github.com/google/uuid"

	config "github.com/eddieogola/stickerm/server/productservice/config"
	pb "github.com/eddieogola/stickerm/server/productservice/genproto"
	models "github.com/eddieogola/stickerm/server/productservice/models"
)

var db = config.GetDB()
var ctx = context.Background()

type ProductService struct {
	pb.UnimplementedProductServiceServer
}

func (svc *ProductService) CreateProduct(_ context.Context, req *pb.CreateProductRequest) (*pb.CreateProductResponse, error) {

	uuid := uuid.New()

	product := &models.Product{
		ID:          uuid.String(),
		Name:        req.Name,
		Description: req.Description,
		Price:       req.Price,
		ImageUrl:    req.ImageUrl,
	}

	_, err := db.NewInsert().
		Model(product).
		Exec(ctx)
	if err != nil {
		return nil, err
	}

	log.Println("Product created successfully:", product)

	pbProduct := &pb.Product{
		Id:          product.ID,
		Name:        product.Name,
		Description: product.Description,
		Price:      product.Price,
		ImageUrl:   product.ImageUrl,
	}

	log.Println("Product created successfully:", *product)

	response := &pb.CreateProductResponse{
		Product: pbProduct,
	}

	return response, nil

}

func (svc *ProductService) GetProducts(_ context.Context, req *pb.GetProductsRequest) (*pb.GetProductsResponse, error) {
	
	var products []models.Product
	

	err := db.NewSelect().
		Model(&products).
		Scan(ctx)

	if err != nil {
		return nil, err
	}

	var pbProducts []*pb.Product = make([]*pb.Product, 0, len(products))
	
	for _, product := range products {
		pbProduct := &pb.Product{
			Id:          product.ID,
			Name:        product.Name,
			Description: product.Description,
			Price:      product.Price,
			ImageUrl:   product.ImageUrl,
		}
		pbProducts = append(pbProducts, pbProduct)
	}

	response := &pb.GetProductsResponse{
		Products: pbProducts,
	}

	return response, nil
}
