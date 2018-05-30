import {Image} from '../../rpc/diadust_pb';

export interface State {
    images: Array<Image.AsObject>;
}

export const Store = {
    state: {
        images: []
    } as State,
    mutations: {

    },
    actions: {

    }
};