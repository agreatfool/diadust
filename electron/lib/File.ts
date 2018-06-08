import * as LibFs from 'fs';

interface ReadDirSortedOptions extends Intl.CollatorOptions {
    locales?: Array<string> | string; // options just provided to "String.localeCompare"
    // usage?: string; // fixed 'sort'
    // localeMatcher?: 'lookup' | 'best fit';
    // numeric?: boolean;
    // caseFirst?: 'upper' | 'lower' | boolean;
    // sensitivity?: 'base' | 'accent' | 'case' | 'variant';
    // ignorePunctuation?: boolean;
}

export const readDirSortedSync = function (path: string, options?: ReadDirSortedOptions): Array<string> {
    const sortOptions = {usage: 'sort', ...options};
    const sort = options && options.hasOwnProperty('locales') ?
        (a: string, b: string) => a.localeCompare(b, options.locales, sortOptions) :
        (a: string, b: string) => a.localeCompare(b, undefined, sortOptions);

    return LibFs.readdirSync(path).sort(sort);
};