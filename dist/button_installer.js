"use strict";
/*!
 * Copyright 2023 Daisuke Motohashi
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ButtonInstaller = void 0;
const utils_1 = require("./utils");
require("@shin-chan/kypes");
class ButtonInstaller {
    class_hms_button = 'button-hms-items';
    buttons = [];
    canvas;
    constructor(classname = '') {
        if (classname != '') {
            this.class_hms_button = classname;
        }
    }
    create_button(icon_label, tooltip = '') {
        const icon = utils_1.Utils.ce('span', '', [], icon_label);
        icon.style.color = 'dodgerblue';
        let button = utils_1.Utils.ce('button', this.class_hms_button, [icon], '', {
            'title': tooltip
        });
        button = utils_1.Utils.decorate_menu_icon(button);
        console.log(icon_label.length);
        if (icon_label.length > 2) {
            button.style.fontSize = '16px';
        }
        return button;
    }
    add_button(button) {
        this.buttons.push(button);
    }
    install() {
        if (this.already_installed()) {
            console.info('ボタンはすでに設置済みです。');
            return;
        }
        if (this.buttons.length == 0) {
            console.info('ボタンが設定されていません。何もせずに終了します。');
            return;
        }
        this.put_buttons(this.buttons);
    }
    set_canvas(canvas) {
        this.canvas = canvas;
    }
    get_hms() {
        const hms = kintone.app.getHeaderMenuSpaceElement();
        if (hms == undefined) {
            const msg = 'ボタン配置スペースが取得できませんでした。';
            console.error(msg);
            throw new Error(msg);
        }
        return hms;
    }
    already_installed() {
        const hms_buttons = document.getElementsByClassName(this.class_hms_button);
        if (hms_buttons.length > 0) {
            return true;
        }
        return false;
    }
    put_buttons(buttons) {
        const hms = this.canvas === undefined ? this.get_hms() : this.canvas;
        buttons.forEach((btn) => {
            console.log(hms);
            hms.append(btn);
        });
    }
    get_header_element(index_text) {
        const headers = document.querySelectorAll('.recordlist-header-label-gaia');
        return Array.from(headers).filter((header) => {
            return header.textContent == index_text;
        });
    }
}
exports.ButtonInstaller = ButtonInstaller;
