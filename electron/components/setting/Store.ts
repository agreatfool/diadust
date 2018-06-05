import {Module} from "vuex";

// State
export interface State {

}

export interface Options extends State {
} // alias

// Store
export const Store: Module<State, {}> = {
    state: {} as Options,
    mutations: {},
    actions: {}
};