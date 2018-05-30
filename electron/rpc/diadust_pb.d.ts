// package: diadust
// file: diadust.proto

/* tslint:disable */

import * as jspb from "google-protobuf";

export class Image extends jspb.Message { 
    getId(): number;
    setId(value: number): void;

    getUuid(): string;
    setUuid(value: string): void;

    getOriginalName(): string;
    setOriginalName(value: string): void;

    getPath(): string;
    setPath(value: string): void;

    clearTagsList(): void;
    getTagsList(): Array<number>;
    setTagsList(value: Array<number>): void;
    addTags(value: number, index?: number): number;

    getCreated(): number;
    setCreated(value: number): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Image.AsObject;
    static toObject(includeInstance: boolean, msg: Image): Image.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: Image, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Image;
    static deserializeBinaryFromReader(message: Image, reader: jspb.BinaryReader): Image;
}

export namespace Image {
    export type AsObject = {
        id: number,
        uuid: string,
        originalName: string,
        path: string,
        tagsList: Array<number>,
        created: number,
    }
}

export class ImageHash extends jspb.Message { 
    getId(): number;
    setId(value: number): void;

    getHash(): string;
    setHash(value: string): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): ImageHash.AsObject;
    static toObject(includeInstance: boolean, msg: ImageHash): ImageHash.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: ImageHash, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): ImageHash;
    static deserializeBinaryFromReader(message: ImageHash, reader: jspb.BinaryReader): ImageHash;
}

export namespace ImageHash {
    export type AsObject = {
        id: number,
        hash: string,
    }
}

export class Tag extends jspb.Message { 
    getId(): number;
    setId(value: number): void;

    getName(): string;
    setName(value: string): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Tag.AsObject;
    static toObject(includeInstance: boolean, msg: Tag): Tag.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: Tag, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Tag;
    static deserializeBinaryFromReader(message: Tag, reader: jspb.BinaryReader): Tag;
}

export namespace Tag {
    export type AsObject = {
        id: number,
        name: string,
    }
}
