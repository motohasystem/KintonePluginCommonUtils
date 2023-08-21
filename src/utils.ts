/*!
 * Copyright 2023 Daisuke Motohashi
 */
import "@shin-chan/kypes";  // kintone types

export type KintoneRecordItem = {
    'code': string
    , 'label': string
    , 'type': string
}

export type KintoneFieldValue = {
    'value': string
    , 'type': string
}

export type KintoneAppInfo = {
    'appId': string         // アプリID
    , 'name': string        // アプリ名
    , 'description': string // アプリの説明
}

// プルダウン１個分の情報を持つ
export type DropdownData = {
    'code': string
    , 'label': string
    , 'option': string
}


export class Utils {
    /**
     * 重複禁止フィールドだけをピックアップする
     * @param properties fields.jsonのレスポンスのproperties
     * @param with_record_number RECORD_NUMBERフィールドを返すフラグ
     */
    static unique_properties(props: { [code: string]: object }, with_record_number: boolean = false) {
        const results = []

        for (const fieldcode of Object.keys(props)) {
            const prop = props[fieldcode] as any
            if (prop.unique == true) {
                results.push(prop)
            }
            else if (with_record_number && prop['type'] == 'RECORD_NUMBER') {
                results.push(prop)
            }
        }
        return results
    }

    // 空文字列ではないことをチェックする
    static is_not_empty_string(test_str: string | string[] | undefined | null) {
        return !Utils.is_empty_string(test_str)
    }

    // 空文字列であることをチェックする
    static is_empty_string(test_str: string | string[] | undefined | null) {
        if (test_str == null || test_str == undefined) {
            return true
        }

        if (test_str.length > 0) {
            return false
        }

        return true
    }

    // 設定値またはデフォルト値を取得
    static get_from = (dic: { [key: string]: string }, conf_key: string, defaults: string): string => {
        if (dic.hasOwnProperty(conf_key)) {
            return dic[conf_key]
        }
        return defaults
    }

    static buildElement = (params:
        {
            'tagName': string
            , 'className'?: string
            , 'childElements'?: HTMLElement[]
            , 'textContent'?: string
            , 'innerHTML'?: string
            , 'attrs'?: { [key: string]: string }
        }
    ): HTMLElement => {
        const tag = params['tagName']
        const cl = params['className'] ? params['className'] : ""
        const ce = params['childElements'] ? params['childElements'] : []
        const tc = params['textContent'] ? params['textContent'] : undefined
        const ih = params['innerHTML'] ? params['innerHTML'] : undefined
        const at = params['attrs'] ? params['attrs'] : {}

        return Utils.createElement(tag, cl, ce, tc, at, ih)
    }

    // ノードを構築して返す
    static createElement = (
        tagName: string,
        className: string = "",
        childElements: HTMLElement[] = [],
        textContent: string | undefined = undefined,
        attrs: { [key: string]: string } | undefined = undefined,
        innerHTML: string | undefined = undefined,
    ): HTMLElement => {
        const el = document.createElement(tagName)
        el.className = className

        if (textContent != undefined) {
            el.textContent = textContent
        }

        if (innerHTML != undefined) {
            el.innerHTML = innerHTML
        }

        if (childElements.length > 0) {
            childElements.forEach((child) => {
                el.appendChild(child)
            })
        }

        // 属性値をセット
        if (attrs) {
            Object.entries(attrs).forEach(([key, value]) => {
                el.setAttribute(key, value)
            })
        }
        return el
    }

    // shotcut for createElement
    static ce = (
        t: string,
        c: string = "",
        ce: HTMLElement[] = [],
        tc: string = "",
        at: { [key: string]: string } | undefined = undefined
    ): HTMLElement => {
        return this.createElement(t, c, ce, tc, at)
    }

    /**
     * kintoneのメニューアイコン風にスタイルを付与する
     * @param el 装飾対象のノード
     */
    static decorate_menu_icon(el: HTMLElement): HTMLElement {
        el.style.height = '48px'
        el.style.backgroundColor = '#f7f9fa'
        el.style.fontSize = '28px'
        el.style.border = '1px solid #e3e7e8'
        el.style.display = 'inline'
        el.style.marginLeft = '2px'
        el.style.marginRight = '2px'
        el.style.verticalAlign = 'middle'

        return el
    }


    /**
     * テキストだけを持ったDIV要素を構築して返す
     * @param msg innerText
     * @returns 
     */
    static simpleDiv = (msg: string): HTMLDivElement => {
        return Utils.createElement('div', '', [], msg) as HTMLDivElement
    }

    // 配列のうち、重複したものがあればTrueを返す
    static is_overlapped = (list: any[]) => {
        const overlapped = Utils.overlapped(list)

        if (overlapped.length > 0) {
            return true
        }
        return false
    }

    // 配列のうち、重複したものをUniqして返す
    static overlapped = (list: any[]) => {
        const overlapped = list.filter((x, _i, self) => {
            return self.indexOf(x) !== self.lastIndexOf(x)
        })

        return Array.from(new Set(overlapped))

    }

    // 現在開いているkintoneドメインのうち指定した番号のアプリのURLを構築して返す
    static get_application_url(appid: string): string {
        return `${location.protocol}//${location.host}/k/${appid}`
    }


    // kintone clientのエラーを受け取ってメッセージを抽出し、文字列配列の形で返す
    static retrieve_errors(error: any, max_msgs: number = -1): string[] | undefined {
        const errors = error?.error?.errors
        if (errors == undefined) {
            return undefined
        }

        // メッセージの構築
        let whole_errors: string[] = []
        Object.keys(errors).forEach((field) => {
            const msgs = errors[field].messages
            const comments = msgs.map((msg: string) => {
                return `[${field}] ${msg}`
            })
            whole_errors = whole_errors.concat(comments)
        })

        // ソート
        whole_errors.sort()

        // エラーレコードの件数が多い場合に省略
        if (max_msgs >= 0 && max_msgs < whole_errors.length) {
            const remain_msgs = whole_errors.length - max_msgs
            whole_errors = whole_errors.splice(0, max_msgs)
            whole_errors.push(`以下${remain_msgs}件のエラーメッセージを省略しました。`)
        }

        return whole_errors
    }

    // HeaderMenuSpaceElementを表示している画面にあわせて取得する。
    static getHeaderMenuSpace = () => {
        const hms_index = kintone.app.getHeaderMenuSpaceElement()   // 一覧画面

        if (hms_index != null) {
            return hms_index
        }

        const hms_detail = kintone.app.record.getHeaderMenuSpaceElement()   // 詳細画面

        if (hms_detail != null) {
            return hms_detail
        }

        throw new Error('HeaderSpaceElementが取得できませんでした。')
    }


}
