"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Utils = void 0;
require("@shin-chan/kypes");
class Utils {
    static unique_properties(props, with_record_number = false) {
        const results = [];
        for (const fieldcode of Object.keys(props)) {
            const prop = props[fieldcode];
            if (prop.unique == true) {
                results.push(prop);
            }
            else if (with_record_number && prop['type'] == 'RECORD_NUMBER') {
                results.push(prop);
            }
        }
        return results;
    }
    static is_not_empty_string(test_str) {
        return !Utils.is_empty_string(test_str);
    }
    static is_empty_string(test_str) {
        if (test_str == null || test_str == undefined) {
            return true;
        }
        if (test_str.length > 0) {
            return false;
        }
        return true;
    }
    static get_from = (dic, conf_key, defaults) => {
        if (dic.hasOwnProperty(conf_key)) {
            return dic[conf_key];
        }
        return defaults;
    };
    static buildElement = (params) => {
        const tag = params['tagName'];
        const cl = params['className'] ? params['className'] : "";
        const ce = params['childElements'] ? params['childElements'] : [];
        const tc = params['textContent'] ? params['textContent'] : undefined;
        const ih = params['innerHTML'] ? params['innerHTML'] : undefined;
        const at = params['attrs'] ? params['attrs'] : {};
        return Utils.createElement(tag, cl, ce, tc, at, ih);
    };
    static createElement = (tagName, className = "", childElements = [], textContent = undefined, attrs = undefined, innerHTML = undefined) => {
        const el = document.createElement(tagName);
        el.className = className;
        if (textContent != undefined) {
            el.textContent = textContent;
        }
        if (innerHTML != undefined) {
            el.innerHTML = innerHTML;
        }
        if (childElements.length > 0) {
            childElements.forEach((child) => {
                el.appendChild(child);
            });
        }
        if (attrs) {
            Object.entries(attrs).forEach(([key, value]) => {
                el.setAttribute(key, value);
            });
        }
        return el;
    };
    static ce = (t, c = "", ce = [], tc = "", at = undefined) => {
        return this.createElement(t, c, ce, tc, at);
    };
    static decorate_menu_icon(el) {
        el.style.height = '48px';
        el.style.backgroundColor = '#f7f9fa';
        el.style.fontSize = '28px';
        el.style.border = '1px solid #e3e7e8';
        el.style.display = 'inline';
        el.style.marginLeft = '2px';
        el.style.marginRight = '2px';
        el.style.verticalAlign = 'middle';
        return el;
    }
    static decorate_menu_button(button) {
        const decorated = Utils.decorate_menu_icon(button);
        decorated.style.color = 'dodgerblue';
        if (decorated == null) {
            throw new Error(`装飾対象アイコンがnullです。`);
        }
        if (decorated.textContent == null) {
            return decorated;
        }
        if (decorated.textContent.length > 2) {
            decorated.style.fontSize = '16px';
        }
        return decorated;
    }
    static simpleDiv = (msg) => {
        return Utils.createElement('div', '', [], msg);
    };
    static is_overlapped = (list) => {
        const overlapped = Utils.overlapped(list);
        if (overlapped.length > 0) {
            return true;
        }
        return false;
    };
    static overlapped = (list) => {
        const overlapped = list.filter((x, _i, self) => {
            return self.indexOf(x) !== self.lastIndexOf(x);
        });
        return Array.from(new Set(overlapped));
    };
    static get_application_url(appid) {
        return `${location.protocol}//${location.host}/k/${appid}`;
    }
    static retrieve_errors(error, max_msgs = -1) {
        const errors = error?.error?.errors;
        if (errors == undefined) {
            return undefined;
        }
        let whole_errors = [];
        Object.keys(errors).forEach((field) => {
            const msgs = errors[field].messages;
            const comments = msgs.map((msg) => {
                return `[${field}] ${msg}`;
            });
            whole_errors = whole_errors.concat(comments);
        });
        whole_errors.sort();
        if (max_msgs >= 0 && max_msgs < whole_errors.length) {
            const remain_msgs = whole_errors.length - max_msgs;
            whole_errors = whole_errors.splice(0, max_msgs);
            whole_errors.push(`以下${remain_msgs}件のエラーメッセージを省略しました。`);
        }
        return whole_errors;
    }
    static getHeaderMenuSpace = () => {
        const hms_index = kintone.app.getHeaderMenuSpaceElement();
        if (hms_index != null) {
            return hms_index;
        }
        const hms_detail = kintone.app.record.getHeaderMenuSpaceElement();
        if (hms_detail != null) {
            return hms_detail;
        }
        throw new Error('HeaderSpaceElementが取得できませんでした。');
    };
}
exports.Utils = Utils;
