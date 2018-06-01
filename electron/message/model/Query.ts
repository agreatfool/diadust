export interface ImageSearchFilter {
    includeNames?: Array<string>;   // search by names
    excludeNames?: Array<string>;   // search result shall not include names
    includeTags?: Array<number>;    // search by tags
    excludeTags?: Array<number>;    // search result shall not include tags
    orderType: FilterOrderType;     // order type
    order: FilterOrder;             // order
}

enum FilterOrderType {
    CREATED,    // record created
    SIZE,       // file size
    RESOLUTION, // image resolution
}

enum FilterOrder {
    DESC,
    ASC,
}