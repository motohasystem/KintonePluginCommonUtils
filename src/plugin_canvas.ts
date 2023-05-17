/*!
 * Copyright 2023 Daisuke Motohashi
 */

import { Utils as ut, Utils } from "./utils"
// import 'bootstrap'
// import "../scss/style.scss";    // bootstrapのスタイル

import "@shin-chan/kypes";  // kintone types

export class PluginCanvas {
    static CLASS_DISMISS = 'offcanvas-dismiss'

    id_island: string
    id_offcanvas: string
    title_offcanvas: string
    island: HTMLElement // マウスホバーでプラグインアイコンを表示する島ノード
    enable_offcanvas: boolean

    constructor(title: string, id_island: string, default_element: HTMLElement | null = null, icon_element: HTMLElement | undefined = undefined) {
        this.title_offcanvas = title
        this.id_island = `plugin_island_id_${id_island}`
        this.id_offcanvas = `offcanvas_${this.id_island}`

        // 初期化またはオフキャンバスを使わない
        if (id_island == "") {
            console.log(`[${this.constructor.name}] オフキャンバスを使いません。`)
            if (default_element == null) {
                default_element = kintone.app.getHeaderMenuSpaceElement()
            }

            if (default_element == null) {
                throw new Error('kintone.app.HeaderMenuSpaceElement() を取得できませんでした。')
            }
            this.island = default_element
            this.enable_offcanvas = false

            return
        }

        // オフキャンバスを使用する
        this.enable_offcanvas = true
        const already = document.getElementById(this.id_island)
        if (already) {  // 同じIDで既存の島があればそれを使う
            console.log(`[${this.constructor.name}] 既存のオフキャンバスを使用します。`)
            this.island = already
        }
        else {
            console.log(`[${this.constructor.name}] オフキャンバスをID[${this.id_island}]で作成します。`)

            // オフキャンバスのアイコン
            const icon_balloon = ((icon) => {
                if (icon) {
                    return icon
                }
                else {
                    // return ut.ce('i', 'fa-solid fa-comment-dots ps-2')
                    const baloon = ut.ce('span', '', [], '🎈')
                    baloon.style.cursor = 'pointer'
                    return baloon
                }
            })(icon_element)
            icon_balloon.style.color = 'dodgerblue'

            let island = ut.ce('div', 'bbk-tool-icon-box'
                , [icon_balloon]
                , ''
                , {
                    'id': this.id_island
                    , 'data-bs-toggle': 'offcanvas'
                    , 'aria-controls': this.id_offcanvas
                    , 'data-bs-target': `#${this.id_offcanvas}`
                }
            )
            island = Utils.decorate_menu_icon(island)

            this.island = island
            this.init_offcanvas()
        }
    }

    init_offcanvas() {
        const headerSpace = kintone.app.getHeaderMenuSpaceElement()
        if (headerSpace) {
            headerSpace.appendChild(this.get_node())
            headerSpace.appendChild(this.build_node_offcanvas())
        }
    }

    get_node(): HTMLElement {
        return this.island
    }

    build_node_offcanvas() {

        return ut.ce('div', 'offcanvas offcanvas-start',
            [
                ut.ce('div', 'offcanvas-header', [
                    ut.ce('h5', 'offcanvas-title',
                        []
                        , this.title_offcanvas
                        , {
                            'id': `${this.id_offcanvas}Label`
                        }
                    )
                    , ut.ce('button', 'btn-close text-reset', [], '',
                        {
                            'data-bs-dismiss': 'offcanvas'
                            , 'aria-label': 'Close'
                        }
                    )

                ])
                , ut.ce('div', 'offcanvas-body',
                    [
                        ut.ce('div', 'mb-4', [], 'ここから各種プラグインを呼び出せます。')
                    ]
                    , ''
                    , {
                        'id': `${this.id_offcanvas}-body`
                    })
            ]
            , ''
            , {
                'tabindex': '-1'
                , 'id': `${this.id_offcanvas}`
                , 'aria-labelledby': `${this.id_offcanvas}Label`
                , 'data-bs-backdrop': 'false'
            }
        )
    }

    append(node: HTMLElement) {
        if (this.enable_offcanvas) {
            const offcanvas = document.getElementById(`${this.id_offcanvas}-body`)
            // node.setAttribute('data-bs-dismiss', "offcanvas")
            this.deal_dismiss_attribute(node)
            offcanvas?.appendChild(node)
        }
        else {
            this.island.append(node)
        }
    }

    deal_dismiss_attribute(node: HTMLElement) {
        const dismissElements = Array.from(node.querySelectorAll(`.${PluginCanvas.CLASS_DISMISS}`))
        console.log(dismissElements)
        if (dismissElements.length > 0) {
            dismissElements.map((element) => {
                element.setAttribute('data-bs-dismiss', "offcanvas")
            })
        }
        else {
            node.setAttribute('data-bs-dismiss', "offcanvas")
        }
    }
}
