/*!
 * Copyright 2023 Daisuke Motohashi
 */
import "@shin-chan/kypes";
export declare class PluginCanvas {
    static CLASS_DISMISS: string;
    id_island: string;
    id_offcanvas: string;
    title_offcanvas: string;
    island: HTMLElement;
    enable_offcanvas: boolean;
    constructor(title: string, id_island: string, default_element?: HTMLElement | null, icon_element?: HTMLElement | undefined);
    init_offcanvas(): void;
    get_node(): HTMLElement;
    build_node_offcanvas(): HTMLElement;
    append(node: HTMLElement): void;
    deal_dismiss_attribute(node: HTMLElement): void;
}
