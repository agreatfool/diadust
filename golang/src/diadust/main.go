package main

import (
	"net"
	"log"
	"google.golang.org/grpc"
	pb "diadust/diadust"
	"fmt"
)

const (
	PORT = ":50051"
)

type server struct{}

func (s *server) FetchImages(filter *pb.Filter, stream pb.ImageService_FetchImagesServer) error {
	log.Printf("FetchImages, filter: %s", fmt.Sprintf("%+v\n", filter))

	images := []*pb.Image{
		{Id:1, Uuid:"uuid1", OriginalName:"originalname1", Path:"path1", Tag:[]int32{1,2,3}, Created:123},
		{Id:2, Uuid:"uuid2", OriginalName:"originalname2", Path:"path2", Tag:[]int32{1,2,3}, Created:123},
		{Id:3, Uuid:"uuid3", OriginalName:"originalname3", Path:"path3", Tag:[]int32{1,2,3}, Created:123},
		{Id:4, Uuid:"uuid4", OriginalName:"originalname4", Path:"path4", Tag:[]int32{1,2,3}, Created:123},
		{Id:5, Uuid:"uuid5", OriginalName:"originalname5", Path:"path5", Tag:[]int32{1,2,3}, Created:123},
	}

	for _, img := range images {
		log.Printf("FetchImages, sending: %s", fmt.Sprintf("%+v\n", img))
		if err := stream.Send(img); err != nil {
			log.Fatalf("FetchImages, failed to send: %v", err)
			return err
		}
	}
	return nil
}

func main() {
	lis, err := net.Listen("tcp", PORT)
	if err != nil {
		log.Fatalf("main, failed to listen: %v", err)
	}
	s := grpc.NewServer()
	pb.RegisterImageServiceServer(s, &server{})
	log.Printf("main, start listing on%s", PORT)
	if err := s.Serve(lis); err != nil {
		log.Fatalf("main, failed to serve: %v", err)
	}
}