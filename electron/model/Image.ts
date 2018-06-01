export interface Image {
    id: number;             // imageId in db
    uuid: string;           // reformatted filename
    originalName: string;   // original filename
    path: string;           // relative file path
    tags: Array<number>;    // tag ids: [2,5,12]
    created: number;        // record created timestamp
}

export interface ImageHash {
    id: number;     // mapping to "Image.id"
    hash: string;   // uses truncated Haar wavelet transforms to create visual hash of the image
}