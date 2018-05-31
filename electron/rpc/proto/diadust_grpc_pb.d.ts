// package: diadust
// file: diadust.proto

/* tslint:disable */

import * as grpc from "grpc";
import * as diadust_pb from "./diadust_pb";

interface IImageServiceService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
    fetchImages: IImageServiceService_IfetchImages;
}

interface IImageServiceService_IfetchImages extends grpc.MethodDefinition<diadust_pb.Filter, diadust_pb.Image> {
    path: string; // "/diadust.ImageService/fetchImages"
    requestStream: boolean; // false
    responseStream: boolean; // true
    requestSerialize: grpc.serialize<diadust_pb.Filter>;
    requestDeserialize: grpc.deserialize<diadust_pb.Filter>;
    responseSerialize: grpc.serialize<diadust_pb.Image>;
    responseDeserialize: grpc.deserialize<diadust_pb.Image>;
}

export const ImageServiceService: IImageServiceService;

export interface IImageServiceServer {
    fetchImages: grpc.handleServerStreamingCall<diadust_pb.Filter, diadust_pb.Image>;
}

export interface IImageServiceClient {
    fetchImages(request: diadust_pb.Filter, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<diadust_pb.Filter>;
    fetchImages(request: diadust_pb.Filter, metadata?: grpc.Metadata, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<diadust_pb.Filter>;
}

export class ImageServiceClient extends grpc.Client implements IImageServiceClient {
    constructor(address: string, credentials: grpc.ChannelCredentials, options?: object);
    public fetchImages(request: diadust_pb.Filter, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<diadust_pb.Filter>;
    public fetchImages(request: diadust_pb.Filter, metadata?: grpc.Metadata, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<diadust_pb.Filter>;
}
