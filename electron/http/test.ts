import {post} from './Http';
import {FilterOrder, FilterOrderType, ImageSearchFilter} from "../model/Query";

post('/image/fetch', {
    includeNames: ['anime', 'movie'],
    includeTags: [1, 2, 3],
    orderType: FilterOrderType.SIZE,
    order: FilterOrder.DESC,
} as ImageSearchFilter).then(_ => console.log(_));