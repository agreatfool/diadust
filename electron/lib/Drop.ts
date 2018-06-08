import * as LibFs from 'fs';
import * as LibPath from 'path';

import * as readChunk from 'read-chunk';
import * as fileType from 'file-type';

import {readDirSortedSync} from './File';
import {LocalFile, ValidDropType, ValidImageType} from "../model/Drop";

export type DropFiles = { [key: string]: Array<LocalFile> };

export const handleDropEvent = function (event: DragEvent): DropFiles {
    let dirs = {} as { [key: string]: Array<LocalFile> };

    if (!event.dataTransfer.items) {
        return dirs;
    }

    let files = [] as Array<File>;

    for (let i = 0; i < event.dataTransfer.items.length; i++) {
        const item = event.dataTransfer.items[i] as DataTransferItem;
        if (item.kind !== 'file') {
            continue; // not file kind
        }

        let file = item.getAsFile();
        if (!file) {
            continue; // file is null
        }

        // if drop item is directory
        if (checkDropFileIsDir(file)) {
            // read files & format to type LocalImage
            const dirFiles: Array<string> = readDirSortedSync((file as any).path, {
                locales: 'en',
                numeric: true
            });

            let converted = [] as Array<LocalFile>;

            dirFiles.forEach((filename: string) => {
                const fullPath = LibPath.join((file as any).path, filename);
                const status = LibFs.statSync(fullPath);
                if (!status.isFile()) {
                    return; // not a file
                }
                const type = fileType(readChunk.sync(fullPath, 0, 4100));
                if (!type) {
                    return; // type parsing failed
                }
                if (ValidDropType.indexOf(type.mime) === -1) {
                    return; // skip invalid type
                }
                if (type.mime === 'application/zip' && LibPath.extname(filename) !== '.zip') {
                    return; // many software using zip to pack their files
                }

                converted.push({
                    name: filename,
                    path: fullPath,
                    size: status.size,
                    type: type.mime,
                    lastModified: Math.floor(status.mtimeMs / 1000)
                } as LocalFile);
            });

            dirs[(file as any).path] = converted;
        } else {
            files.push(file); // add single files into collection, and handle them later
        }
    }

    // if there are pieces of single files
    if (files.length > 0) {
        // convert to type LocalImage & set into key 'root'
        let converted = [] as Array<LocalFile>;

        files.forEach((file: File) => {
            const filename = file.name;
            const fullPath = (file as any).path;
            const status = LibFs.statSync(fullPath);
            if (!status.isFile()) {
                return; // not a file
            }
            const type = fileType(readChunk.sync(fullPath, 0, 4100));
            if (!type) {
                return; // type parsing failed
            }
            if (ValidDropType.indexOf(type.mime) === -1) {
                return; // skip invalid type
            }
            if (type.mime === 'application/zip' && LibPath.extname(filename) !== '.zip') {
                return; // many software using zip to pack their files
            }

            const localFile = {
                name: filename,
                path: fullPath,
                size: status.size,
                type: type.mime,
                lastModified: Math.floor(status.mtimeMs / 1000)
            } as LocalFile;

            if (ValidImageType.indexOf(type.mime) !== -1) {
                // image, store it in 'root'
                converted.push(localFile);
            } else {
                // not image, store in filename
                dirs[fullPath] = [localFile];
            }
        });

        if (converted.length > 0) {
            dirs['root'] = converted;
        }
    }

    return dirs;
};

const checkDropFileIsDir = function (file: File) {
    return file && file.type === '' && LibFs.statSync((file as any).path).isDirectory();
};