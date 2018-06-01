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