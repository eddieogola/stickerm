package controllers

import (
	"context"

	pb "github.com/eddieogola/stickerm/server/productservice/genproto"
)


type ProductService struct {
	pb.UnimplementedProductServiceServer
}

func (svc *ProductService) CreateProduct(_ context.Context, req *pb.CreateProductRequest) (*pb.CreateProductResponse, error) {

	product := &pb.Product{
		Id:          "1",
		Name:        req.Name,
		Description: req.Description,
		Price:      req.Price,
		ImageUrl:   req.ImageUrl,
	}

	response := &pb.CreateProductResponse{
		Product: product,
	}

	return response, nil

}

func (svc *ProductService) GetProducts(_ context.Context, req *pb.GetProductsRequest) (*pb.GetProductsResponse, error) {

	products := []*pb.Product{
		{
			Id:          "1",
			Name:        "Sample Product 1",
			Description: "This is a sample product description.",
			Price:      19.99,
			ImageUrl:   "http://example.com/image1.png",
		},
		{
			Id:          "2",
			Name:        "Sample Product 2",
			Description: "This is another sample product description.",
			Price:      29.99,
			ImageUrl:   "http://example.com/image2.png",
		},
	}

	response := &pb.GetProductsResponse{
		Products: products,
	}

	return response, nil
}
