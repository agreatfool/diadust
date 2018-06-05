export interface DropItems {
    items: Array<DropItem>;
}

export interface DropItem {
    lastModified: number; //
    lastModifiedDate: Date; // date
    name: string; // file name
    path: string; // file path
    size: number; // file size
    type: string; // file type, e.g: "image/jpeg"
}

export enum ValidDropType {
    JPEG = "image/jpeg",
    PNG = "image/png",
    WEBP = "image/webp",
    ZIP = "application/zip",
    RAR = "application/x-rar",
    ZIP7 = "application/x-7z-compressed",
}
