import {Combo, Listener as KeypressListener} from 'keypress.js';

export interface MultiKeyCombo {
    mutliKey: Array<string>;
    event: (event?: KeyboardEvent) => any;
    this?: Element;
    prevent_default?: boolean;
    prevent_repeat?: boolean;
    is_unordered?: boolean;
    is_counting?: boolean;
    is_exclusive?: boolean;
    is_sequence?: boolean;
    is_solitary?: boolean;
}

export const registerMultiKeyCombo = function (keypressInstance: KeypressListener, combos: Array<MultiKeyCombo>) {
    combos.forEach((combo: MultiKeyCombo) => {
        combo.mutliKey.forEach((key: string) => {
            let originalCombo = {
                keys: key,
                on_keyup: combo.event,
                ...combo,
            } as Combo;

            keypressInstance.register_combo(originalCombo);
        });
    });
};