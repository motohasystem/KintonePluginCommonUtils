/*!
 * Copyright 2023 Daisuke Motohashi
 */
import { PluginCanvas } from './plugin_canvas';
import "@shin-chan/kypes";
export interface Shortcut {
    icon: string;
    link: string;
    tooltip: string;
}
export interface ShortcutDefinitions {
    buttons: Shortcut[];
}
export declare class ButtonInstaller {
    class_hms_button: string;
    buttons: HTMLElement[];
    canvas: PluginCanvas | HTMLElement | undefined;
    constructor(classname?: string);
    create_button(icon_label: string, tooltip?: string): HTMLButtonElement;
    add_button(button: HTMLElement): void;
    install(): void;
    set_canvas(canvas: PluginCanvas | HTMLElement): void;
    get_hms(): HTMLElement;
    already_installed(): boolean;
    put_buttons(buttons: HTMLElement[]): void;
    get_header_element(index_text: string): Element[];
}
