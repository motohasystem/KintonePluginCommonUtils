import "@shin-chan/kypes";
export declare type KintoneRecordItem = {
    'code': string;
    'label': string;
    'type': string;
};
export declare type KintoneFieldValue = {
    'value': string;
    'type': string;
};
export declare type KintoneAppInfo = {
    'appId': string;
    'name': string;
    'description': string;
};
export declare type DropdownData = {
    'code': string;
    'label': string;
    'option': string;
};
export declare class Utils {
    static unique_properties(props: {
        [code: string]: object;
    }, with_record_number?: boolean): any[];
    static is_not_empty_string(test_str: string | string[] | undefined | null): boolean;
    static is_empty_string(test_str: string | string[] | undefined | null): boolean;
    static get_from: (dic: {
        [key: string]: string;
    }, conf_key: string, defaults: string) => string;
    static buildElement: (params: {
        tagName: string;
        className?: string | undefined;
        childElements?: HTMLElement[] | undefined;
        textContent?: string | undefined;
        innerHTML?: string | undefined;
        attrs?: {
            [key: string]: string;
        } | undefined;
    }) => HTMLElement;
    static createElement: (tagName: string, className?: string, childElements?: HTMLElement[], textContent?: string | undefined, attrs?: {
        [key: string]: string;
    } | undefined, innerHTML?: string | undefined) => HTMLElement;
    static ce: (t: string, c?: string, ce?: HTMLElement[], tc?: string, at?: {
        [key: string]: string;
    } | undefined) => HTMLElement;
    static decorate_menu_icon(el: HTMLElement): HTMLElement;
    static decorate_menu_button(button: HTMLButtonElement): HTMLButtonElement;
    static simpleDiv: (msg: string) => HTMLDivElement;
    static is_overlapped: (list: any[]) => boolean;
    static overlapped: (list: any[]) => any[];
    static get_application_url(appid: string): string;
    static retrieve_errors(error: any, max_msgs?: number): string[] | undefined;
    static getHeaderMenuSpace: () => HTMLElement;
}
