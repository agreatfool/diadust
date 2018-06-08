export interface GalleryImage {
    id: number;             // imageId in db
    uuid: string;           // reformatted filename
    originalName: string;   // original filename
    originalType: string;   // original file type mime
    path: string;           // relative file path
    tags: Array<number>;    // tag ids: [2,5,12]
    created: number;        // record created timestamp
}

export interface GalleryImageHash {
    id: number;     // mapping to "GalleryImage.id"
    hash: string;   // uses truncated Haar wavelet transforms to create visual hash of the image
}

export interface ImageSearchFilter {
    includeNames?: Array<string>;   // search by names
    excludeNames?: Array<string>;   // search result shall not include names
    includeTags?: Array<number>;    // search by tags
    excludeTags?: Array<number>;    // search result shall not include tags
    orderType: FilterOrderType;     // order type
    order: FilterOrder;             // order
}

export enum FilterOrderType {
    CREATED = 'CREATED',        // record created
    SIZE = 'SIZE',              // file size
    RESOLUTION = 'RESOLUTION',  // image resolution
}

export enum FilterOrder {
    DESC = 'DESC',
    ASC = 'ASC',
}