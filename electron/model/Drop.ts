// export interface DropItems {
//     items: Array<DropItem>;
// }
//
// export interface DropItem {
//     lastModified: number; //
//     lastModifiedDate: Date; // date
//     name: string; // file name
//     path: string; // file path
//     size: number; // file size
//     type: string; // file type, e.g: "image/jpeg"
// }

export const ValidDropType = [
    'image/jpg',
    'image/jpeg',
    'image/png',
    'image/webp',
    'application/zip',
    'application/x-rar',
    'application/x-rar-compressed',
    'application/x-7z',
    'application/x-7z-compressed'
];

export const ValidImageType = ValidDropType.slice(0, 4); // end not included
export const ValidArchiveType = ValidDropType.slice(4);

export interface LocalFile {
    name: string;
    path: string;
    size: number;
    type: string; // one of ValidDropType
    lastModified: number;
}