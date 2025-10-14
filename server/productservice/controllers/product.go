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

type ProductService struct {
	pb.UnimplementedProductServiceServer
}

func (svc *ProductService) CreateProduct(ctx context.Context, req *pb.CreateProductRequest) (*pb.CreateProductResponse, error) {

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

func (svc *ProductService) GetProducts(ctx context.Context, req *pb.GetProductsRequest) (*pb.GetProductsResponse, error) {

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

func (svc *ProductService) GetProductById(ctx context.Context, req *pb.GetProductByIdRequest) (*pb.GetProductByIdResponse, error) {

	var product models.Product

	_, err := db.NewSelect().Model((*models.Product)(nil)).Where("name LIKE '%foo%'").Exists(ctx)

	if err != nil {
		log.Printf("Error getting product by ID %s: %v", req.Id, err)
        return nil, err
	}

	erro := db.NewSelect().
		Model(&product).
		Where("id = ?", req.Id).
		Scan(ctx)

	if erro != nil {
		return nil, erro
	}

	pbProduct := &pb.Product{
		Id:          product.ID,
		Name:        product.Name,
		Description: product.Description,
		Price:      product.Price,
		ImageUrl:   product.ImageUrl,
	}

	response := &pb.GetProductByIdResponse{
		Product: pbProduct,
	}

	return response, nil
}

func (svc *ProductService) UpdateProduct(ctx context.Context, req *pb.UpdateProductRequest) (*pb.UpdateProductResponse, error) {

	product := &models.Product{
		ID:          req.Id,
		Name:        req.Name,
		Description: req.Description,
		Price:       req.Price,
		ImageUrl:    req.ImageUrl,
	}

	_, err := db.NewUpdate().
		Model(product).
		Where("id = ?", req.Id).
		Exec(ctx)

	if err != nil {
		return nil, err
	}

	log.Println("Product updated successfully: " + product.ID)
	pbProduct := &pb.Product{
		Id:          product.ID,
		Name:        product.Name,
		Description: product.Description,
		Price:      product.Price,
		ImageUrl:   product.ImageUrl,
	}

	response := &pb.UpdateProductResponse{
		Product: pbProduct,
	}

	return response, nil
}

func (svc *ProductService) DeleteProduct(ctx context.Context, req *pb.DeleteProductRequest) (*pb.DeleteProductResponse, error) {

	_, err := db.NewDelete().
		Model((*models.Product)(nil)).
		Where("id = ?", req.Id).
		Exec(ctx)

	if err != nil {
		return nil, err
	}

	log.Printf("Product deleted successfully: %s", req.Id)

	response := &pb.DeleteProductResponse{
		Success: true,
	}

	return response, nil
}
