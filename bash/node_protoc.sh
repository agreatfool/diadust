#!/usr/bin/env bash

BASEDIR=$(dirname "$0")
cd ${BASEDIR}/../

CMD=`which protoc-gen-ts`

grpc_tools_node_protoc \
--js_out=import_style=commonjs,binary:./electron/rpc/proto \
--grpc_out=./electron/rpc/proto \
--plugin=protoc-gen-grpc=`which grpc_tools_node_protoc_plugin` \
-I ./proto \
./proto/*.proto &&
protoc \
--plugin=protoc-gen-ts=${CMD} \
--ts_out=./electron/rpc/proto \
-I ./proto \
./proto/*.proto

exit 0