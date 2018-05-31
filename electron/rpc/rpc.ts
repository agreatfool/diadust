import * as grpc from "grpc";
import {Filter, Image} from "./proto/diadust_pb";
import {ImageServiceClient} from "./proto/diadust_grpc_pb";

export const client = new ImageServiceClient("127.0.0.1:50051", grpc.credentials.createInsecure());

export const fetchImages = (filter: Filter) => {
    return new Promise((resolve) => {
        console.log(`[fetchImages] Filter: ${JSON.stringify(filter.toObject())}`);
        const stream: grpc.ClientReadableStream<Filter> = client.fetchImages(filter);
        stream.on("data", (data: Image) => {
            console.log(`[fetchImages] Image: ${JSON.stringify(data.toObject())}`);
        });
        stream.on("end", () => {
            console.log("[fetchImages] Done.");
            resolve();
        });
    });
};