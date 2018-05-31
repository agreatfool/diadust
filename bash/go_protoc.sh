#!/usr/bin/env bash

BASEDIR=$(dirname "$0")
cd ${BASEDIR}/../

protoc \
--go_out=plugins=grpc:./golang/src/diadust/rpc \
-I ./proto \
./proto/*.proto