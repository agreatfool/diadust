package main

import (
	"log"
	"net"
	"google.golang.org/grpc"
	pb "./rpc"
)

type server struct{}

func (s *server) FetchImages(rect *pb.Filter, stream pb.ImageService_FetchImagesServer) error {
	images := [...]*pb.Image{
		{Id:1, Uuid:"uuid1", OriginalName:"originalname1", Path:"path1", Tag:[]int32{1,2,3}, Created:123},
		{Id:2, Uuid:"uuid2", OriginalName:"originalname2", Path:"path2", Tag:[]int32{1,2,3}, Created:123},
		{Id:3, Uuid:"uuid3", OriginalName:"originalname3", Path:"path3", Tag:[]int32{1,2,3}, Created:123},
		{Id:4, Uuid:"uuid4", OriginalName:"originalname4", Path:"path4", Tag:[]int32{1,2,3}, Created:123},
		{Id:5, Uuid:"uuid5", OriginalName:"originalname5", Path:"path5", Tag:[]int32{1,2,3}, Created:123},
	}

	for _, img := range images {
		if err := stream.Send(img); err != nil {
			return err
		}
	}
	return nil
}

func main() {
	lis, err := net.Listen("tcp", ":50051")
	if err != nil {
		log.Fatalf("failed to listen: %v", err)
	}
	s := grpc.NewServer()
	pb.RegisterImageServiceServer(s, &server{})
	if err := s.Serve(lis); err != nil {
		log.Fatalf("failed to serve: %v", err)
	}
}