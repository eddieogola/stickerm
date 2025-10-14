package main

import (
	"flag"
	"fmt"
	"log"
	"net"

	"google.golang.org/grpc"

	controllers "github.com/eddieogola/stickerm/server/productservice/controllers"
	pb "github.com/eddieogola/stickerm/server/productservice/genproto"
)

var (
	port = flag.Int("port", 50051, "The server port")
)

func main() {
	flag.Parse()

	lis, err := net.Listen("tcp", fmt.Sprintf(":%d", *port))

	if err != nil {
		log.Fatalf("failed to listen: %v", err)
	}

	fmt.Printf("🚀 Product Service gRPC server listening at %v\n", lis.Addr())

	var opts []grpc.ServerOption
	grpcServer := grpc.NewServer(opts...)

	pb.RegisterProductServiceServer(grpcServer, &controllers.ProductService{})

	if err := grpcServer.Serve(lis); err != nil {
		log.Fatalf("failed to serve: %v", err)
	} 
}