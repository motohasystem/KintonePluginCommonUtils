"use strict";
/*!
 * Copyright 2023 Daisuke Motohashi
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.PluginCanvas = void 0;
const utils_1 = require("./utils");
require("@shin-chan/kypes");
class PluginCanvas {
    static CLASS_DISMISS = 'offcanvas-dismiss';
    id_island;
    id_offcanvas;
    title_offcanvas;
    island;
    enable_offcanvas;
    constructor(title, id_island, default_element = null, icon_element = undefined) {
        this.title_offcanvas = title;
        this.id_island = `plugin_island_id_${id_island}`;
        this.id_offcanvas = `offcanvas_${this.id_island}`;
        if (id_island == "") {
            console.log(`[${this.constructor.name}] オフキャンバスを使いません。`);
            if (default_element == null) {
                default_element = kintone.app.getHeaderMenuSpaceElement();
            }
            if (default_element == null) {
                throw new Error('kintone.app.HeaderMenuSpaceElement() を取得できませんでした。');
            }
            this.island = default_element;
            this.enable_offcanvas = false;
            return;
        }
        this.enable_offcanvas = true;
        const already = document.getElementById(this.id_island);
        if (already) {
            console.log(`[${this.constructor.name}] 既存のオフキャンバスを使用します。`);
            this.island = already;
        }
        else {
            console.log(`[${this.constructor.name}] オフキャンバスをID[${this.id_island}]で作成します。`);
            const icon_balloon = ((icon) => {
                if (icon) {
                    return icon;
                }
                else {
                    const baloon = utils_1.Utils.ce('span', '', [], '🎈');
                    baloon.style.cursor = 'pointer';
                    return baloon;
                }
            })(icon_element);
            icon_balloon.style.color = 'dodgerblue';
            let island = utils_1.Utils.ce('div', 'bbk-tool-icon-box', [icon_balloon], '', {
                'id': this.id_island,
                'data-bs-toggle': 'offcanvas',
                'aria-controls': this.id_offcanvas,
                'data-bs-target': `#${this.id_offcanvas}`
            });
            island = utils_1.Utils.decorate_menu_icon(island);
            this.island = island;
            this.init_offcanvas();
        }
    }
    init_offcanvas() {
        const headerSpace = kintone.app.getHeaderMenuSpaceElement();
        if (headerSpace) {
            headerSpace.appendChild(this.get_node());
            headerSpace.appendChild(this.build_node_offcanvas());
        }
    }
    get_node() {
        return this.island;
    }
    build_node_offcanvas() {
        return utils_1.Utils.ce('div', 'offcanvas offcanvas-start', [
            utils_1.Utils.ce('div', 'offcanvas-header', [
                utils_1.Utils.ce('h5', 'offcanvas-title', [], this.title_offcanvas, {
                    'id': `${this.id_offcanvas}Label`
                }),
                utils_1.Utils.ce('button', 'btn-close text-reset', [], '', {
                    'data-bs-dismiss': 'offcanvas',
                    'aria-label': 'Close'
                })
            ]),
            utils_1.Utils.ce('div', 'offcanvas-body', [
                utils_1.Utils.ce('div', 'mb-4', [], 'ここから各種プラグインを呼び出せます。')
            ], '', {
                'id': `${this.id_offcanvas}-body`
            })
        ], '', {
            'tabindex': '-1',
            'id': `${this.id_offcanvas}`,
            'aria-labelledby': `${this.id_offcanvas}Label`,
            'data-bs-backdrop': 'false'
        });
    }
    append(node) {
        if (this.enable_offcanvas) {
            const offcanvas = document.getElementById(`${this.id_offcanvas}-body`);
            this.deal_dismiss_attribute(node);
            offcanvas?.appendChild(node);
        }
        else {
            this.island.append(node);
        }
    }
    deal_dismiss_attribute(node) {
        const dismissElements = Array.from(node.querySelectorAll(`.${PluginCanvas.CLASS_DISMISS}`));
        console.log(dismissElements);
        if (dismissElements.length > 0) {
            dismissElements.map((element) => {
                element.setAttribute('data-bs-dismiss', "offcanvas");
            });
        }
        else {
            node.setAttribute('data-bs-dismiss', "offcanvas");
        }
    }
}
exports.PluginCanvas = PluginCanvas;
