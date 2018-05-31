#!/usr/bin/env bash

BASEDIR=$(dirname "$0")
cd ${BASEDIR}/../

protoc \
--go_out=plugins=grpc:./golang/src/diadust/diadust \
-I ./proto \
./proto/*.proto