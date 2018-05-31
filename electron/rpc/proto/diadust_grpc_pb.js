// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('grpc');
var diadust_pb = require('./diadust_pb.js');

function serialize_diadust_Filter(arg) {
  if (!(arg instanceof diadust_pb.Filter)) {
    throw new Error('Expected argument of type diadust.Filter');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_diadust_Filter(buffer_arg) {
  return diadust_pb.Filter.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_diadust_Image(arg) {
  if (!(arg instanceof diadust_pb.Image)) {
    throw new Error('Expected argument of type diadust.Image');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_diadust_Image(buffer_arg) {
  return diadust_pb.Image.deserializeBinary(new Uint8Array(buffer_arg));
}


// -*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-
// Rpcs
// -*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-
var ImageServiceService = exports.ImageServiceService = {
  fetchImages: {
    path: '/diadust.ImageService/fetchImages',
    requestStream: false,
    responseStream: true,
    requestType: diadust_pb.Filter,
    responseType: diadust_pb.Image,
    requestSerialize: serialize_diadust_Filter,
    requestDeserialize: deserialize_diadust_Filter,
    responseSerialize: serialize_diadust_Image,
    responseDeserialize: deserialize_diadust_Image,
  },
};

exports.ImageServiceClient = grpc.makeGenericClientConstructor(ImageServiceService);
