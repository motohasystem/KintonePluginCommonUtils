/*!
 * Copyright 2023 Daisuke Motohashi
 */

// import { Utils } from 'utils'
import { PluginCanvas } from './plugin_canvas'
import { Utils } from './utils'

import "@shin-chan/kypes";  // kintone types


export interface Shortcut {
    icon: string
    , link: string
    , tooltip: string
}
export interface ShortcutDefinitions {
    buttons: Shortcut[]
}


// ボタンを設置するライブラリ、イベントはset_button()する前にボタンに付与しておく前提
// create_button(): ボタンノードを構築して取得する
// add_button(): 取得したボタンノードを追加する
// install(): 格納しているボタンをhmsに設置する
export class ButtonInstaller {
    class_hms_button: string = 'button-hms-items'

    buttons: HTMLElement[] = [] // 設置するボタン配列

    // labelling_column: string | undefined    // 昇順・降順を付与したいカラムのヘッダ文字列
    // definitions: ShortcutDefinitions        // ショートカットの定義
    canvas: PluginCanvas | HTMLElement | undefined        // プラグインキャンバス

    constructor(classname: string = '') {
        if (classname != '') {
            this.class_hms_button = classname
        }
    }

    /**
     * ボタンを構築する
     * @param icon_label ボタンの表記
     * @param tooltip ツールチップ表示
     * @returns 
     */
    create_button(icon_label: string, tooltip: string = ''): HTMLButtonElement {
        const icon = Utils.ce('span', '', [], icon_label)
        icon.style.color = 'dodgerblue'

        let button = Utils.ce('button', this.class_hms_button, [icon], '', {
            'title': tooltip
        })
        button = Utils.decorate_menu_icon(button)

        console.log(icon_label.length)
        if (icon_label.length > 2) {    // 2⃣文字までは28px、🐈など絵文字は2文字カウント
            button.style.fontSize = '16px'
        }

        return button as HTMLButtonElement
    }

    add_button(button: HTMLElement) {
        this.buttons.push(button)
    }

    install() {
        if (this.already_installed()) {
            console.info('ボタンはすでに設置済みです。')
            return
        }

        // const buttons = this.create_buttons()
        if (this.buttons.length == 0) {
            console.info('ボタンが設定されていません。何もせずに終了します。')
            return
        }
        this.put_buttons(this.buttons)
    }

    set_canvas(canvas: PluginCanvas | HTMLElement) {
        this.canvas = canvas
    }

    get_hms(): HTMLElement {
        const hms = kintone.app.getHeaderMenuSpaceElement()
        if (hms == undefined) {
            const msg = 'ボタン配置スペースが取得できませんでした。'
            console.error(msg)
            throw new Error(msg)
        }
        return hms
    }

    already_installed(): boolean {
        const hms_buttons = document.getElementsByClassName(this.class_hms_button)
        if (hms_buttons.length > 0) {
            return true
        }
        return false
    }

    put_buttons(buttons: HTMLElement[]) {
        const hms = this.canvas === undefined ? this.get_hms() : this.canvas
        buttons.forEach((btn) => {
            console.log(hms)
            hms.append(btn)
        })
    }

    // create_shortcut_button(shortcut: Shortcut): HTMLElement {
    //     const icon_label = shortcut.icon
    //     const url = shortcut.link
    //     const tip = shortcut.tooltip

    //     const icon = Utils.ce('span', '', [], icon_label)
    //     icon.style.color = 'dodgerblue'

    //     let button = Utils.ce('button', this.class_hms_button, [icon], '', {
    //         'title': tip
    //     })
    //     button = Utils.decorate_menu_icon(button)

    //     console.log(icon_label.length)
    //     if (icon_label.length > 2) {    // 2⃣文字までは28px、🐈など絵文字は2文字カウント
    //         button.style.fontSize = '16px'
    //     }

    //     if (url != "") {
    //         console.log({ url })
    //         button.addEventListener('click', (_event) => {
    //             location.href = url
    //         })
    //     }
    //     return button
    // }

    get_header_element(index_text: string) {
        const headers = document.querySelectorAll('.recordlist-header-label-gaia')
        return Array.from(headers).filter((header) => {
            return header.textContent == index_text
        })
    }



}
