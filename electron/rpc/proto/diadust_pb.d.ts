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

    clearTagList(): void;
    getTagList(): Array<number>;
    setTagList(value: Array<number>): void;
    addTag(value: number, index?: number): number;

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
        tagList: Array<number>,
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

export class Filter extends jspb.Message { 
    clearNameList(): void;
    getNameList(): Array<string>;
    setNameList(value: Array<string>): void;
    addName(value: string, index?: number): string;

    clearNoNameList(): void;
    getNoNameList(): Array<string>;
    setNoNameList(value: Array<string>): void;
    addNoName(value: string, index?: number): string;

    clearTagList(): void;
    getTagList(): Array<number>;
    setTagList(value: Array<number>): void;
    addTag(value: number, index?: number): number;

    clearNoTagList(): void;
    getNoTagList(): Array<number>;
    setNoTagList(value: Array<number>): void;
    addNoTag(value: number, index?: number): number;

    getOrderType(): FilterOrderType;
    setOrderType(value: FilterOrderType): void;

    getOrder(): FilterOrder;
    setOrder(value: FilterOrder): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Filter.AsObject;
    static toObject(includeInstance: boolean, msg: Filter): Filter.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: Filter, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Filter;
    static deserializeBinaryFromReader(message: Filter, reader: jspb.BinaryReader): Filter;
}

export namespace Filter {
    export type AsObject = {
        nameList: Array<string>,
        noNameList: Array<string>,
        tagList: Array<number>,
        noTagList: Array<number>,
        orderType: FilterOrderType,
        order: FilterOrder,
    }
}

export enum FilterOrderType {
    CREATED = 0,
    SIZE = 1,
    RESOLUTION = 2,
}

export enum FilterOrder {
    DESC = 0,
    ASC = 1,
}
