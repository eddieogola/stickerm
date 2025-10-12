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

